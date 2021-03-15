import API from '@api';
import { mapKeys } from '@libs/arrays';
import * as sockets from '@api/socket';
import initialProcess from '@api/initialProcess';
import router from '@/router';
import connectionCheck from '@sdk/classes/connectionCheck';
import Logger from '@sdk/classes/logger';

const cnsl = new Logger('Initial', '#db580e');

export default {

  /**
   * Initialize store and app state
   * @param {object} context – store context
   * @returns {void}
   */
  async initial({ commit, dispatch, getters }) {
    if (initialProcess.getState()) {
      cnsl.log('ignore... initial in progress');

      return;
    } else {
      initialProcess.setState(true);
    }

    cnsl.log('start');
    connectionCheck.resetConnectionStatus();

    try {
      /** Wait until internet goes online */
      await connectionCheck.waitUntilOnline();

      /** Get authenticated user */
      cnsl.log('...wait for authenticated user');
      const authenticatedUser = await API.user.getAuthenticatedUser();

      /** Authenticated user id */
      const userId = authenticatedUser.id;

      if (userId) {
        commit('me/SET_USER_ID', userId);
        dispatch('me/update', authenticatedUser);

        /** Update workspace list */
        cnsl.log('...wait for workspace list');
        await dispatch('workspaces/updateList');

        /** Get specific workspace data */
        cnsl.log('...wait for current workspace');
        await dispatch('updateCurrentWorkspaceState');

        cnsl.log('...wait for sockets init');
        await sockets.init();
      } else {
        console.error('AUTH REQUIRED');
      }
    } catch (err) {
      cnsl.log('error', err);
    } finally {
      initialProcess.setState(false);
      cnsl.log('finish');
    }
  },

  /**
   * Initialize store and app state
   * @param {object} context – store context
   * @returns {void}
   */
  async tryToAuthorize({ commit }) {
    try {
      const authenticatedUser = await API.user.getAuthenticatedUser();

      /** Authenticated user id */
      const userId = authenticatedUser.id;

      if (userId) {
        commit('me/SET_USER_ID', userId);
        commit('users/ADD_USER', authenticatedUser);
        console.log('authenticatedUser', authenticatedUser);
      }
    } catch (err) {
      cnsl.error(err);
    }
  },

  /**
   * Update full state of current workspace
   * @param {function} commit Commit to state
   * @param {object} getters Store getters
   * @returns {Promise<void>}
   */
  async updateCurrentWorkspaceState({ commit, getters }) {
    const workspaceId = getters['me/getSelectedWorkspaceId'];

    if (!workspaceId) {
      console.error('No workspace is selected');

      return;
    }

    const workspace = await API.workspace.getWorkspaceByID(workspaceId);

    commit('channels/SET_COLLECTION', mapKeys(workspace.channels, 'id'));
    commit('users/SET_COLLECTION', mapKeys(workspace.users, 'id'));
  },

  /**
   * Select (join) channel
   * @param {object} context – store context
   * @param {string} id – channel id
   * @param {object?} janusOptions – object
   * @returns {object} selected channel
   */
  async selectChannel({ commit, dispatch, getters }, id) {
    if (id === getters['me/getSelectedChannelId']) {
      return;
    }

    let response;

    commit('me/SET_MEDIA_STATE', {
      ...getters['me/getMediaState'],
      camera: false,
      screen: false,
    });

    dispatch('janus/setSharingSource', null, { root: true });

    try {
      response = await API.channel.select(id, getters['me/getMediaState']);
      dispatch('selectChannelWithoutAPICall', {
        id,
        connectionOptions: response.connectionOptions,
      });
    } catch (err) {
      console.error(err);
    }
  },

  /**
   * Select (join) channel without API call
   * @param {object} context – store context
   * @param {string} id – channel id
   * @param {object} connectionOptions Connection options object
   * @returns {object} selected channel
   */
  selectChannelWithoutAPICall({ commit, dispatch, getters, state }, { id, connectionOptions }) {
    if (id === getters['me/getSelectedChannelId']) {
      return;
    }

    commit('me/SET_MEDIA_STATE', {
      ...getters['me/getMediaState'],
      camera: false,
      screen: false,
    });

    if (state.me.selectedChannelId !== null && state.me.selectedChannelId !== '') {
      commit('channels/REMOVE_USER', {
        userId: state.me.id,
        channelId: state.me.selectedChannelId,
      });

      commit('channels/CLEAR_CONVERSATION_DATA', { channelId: id });
      commit('channels/CLEAR_CONVERSATION_EVENTS', { channelId: id });
    }

    commit('janus/SET_OPTIONS', connectionOptions);

    commit('channels/ADD_USER', {
      userId: state.me.id,
      channelId: id,
      userMediaState: {
        ...getters['me/getMediaState'],
        camera: false,
        screen: false,
      },
    });

    commit('me/SET_CHANNEL_ID', id);
  },

  /**
   * Unselect (join) channel
   * @param {object} context – store context
   * @param {string} id – channel id
   * @returns {object} unselected channel
   */
  async unselectChannel({ commit, dispatch }, id) {
    try {
      await API.channel.unselect(id);
    } catch (err) {
      if (err.message !== 'unselect throttled') {
        console.error(err);
      }
    }

    dispatch('unselectChannelWithoutAPICall', id);
  },

  /**
   * Unselect (join) channel without api call
   * @param {object} context – store context
   * @param {string} id – channel id
   * @returns {object} unselected channel
   */
  unselectChannelWithoutAPICall({ commit, dispatch, state, getters }, id = state.me.selectedChannelId) {
    commit('channels/REMOVE_USER', {
      userId: state.me.id,
      channelId: id,
    });

    commit('channels/CLEAR_CONVERSATION_DATA', { channelId: id });
    commit('channels/CLEAR_CONVERSATION_EVENTS', { channelId: id });

    dispatch('me/setChannelId', null);

    dispatch('me/setDefaultMediaState');
  },

  /**
   * Set socket connected
   * @param {object} context store context
   * @param {object} authData is socket connected
   * @param {boolean} authData.connected Is socket connected
   * @param {boolean?} authData.reconnected Is socket has been reconnected
   * @param {number?} authData.audioRoomId Audio room id
   * @param {number?} authData.videoRoomId Video room id
   * @param {string?} authData.channelAuthToken Channel auth token
   * @param {string?} authData.serverAuthToken server auth token
   * @param {string?} authData.url Janus server url
   * @param {string?} authData.channelId Channel id
   * @returns {void}
   */
  async setSocketConnected({ state, commit, getters, dispatch }, authData) {
    if (authData && authData.connected) {
      if (!authData.reconnected) {
        const selectedChannelId = getters['me/getSelectedChannelId'];

        if (selectedChannelId) {
          dispatch('unselectChannelWithoutAPICall', selectedChannelId);
        }
      }

      if (authData.reconnected) {
        // const selectedChannelId = getters['me/getSelectedChannelId'];
        //
        // dispatch('selectChannelWithoutAPICall', {
        //   id: authData.channelId,
        //   connectionOptions: authData,
        // });
      }

      connectionCheck.handleSocketState(true);

      await dispatch('updateCurrentWorkspaceState');
    } else {
      connectionCheck.handleSocketState(false);
    }
  },

  /**
   * Log in using auth link
   *
   * @param {object} vuex context
   * @param {string} authLink – code to log in with
   * @returns {void}
   */
  async useAuthLink({ dispatch }, authLink) {
    try {
      await API.auth.signinByLink(authLink);

      await dispatch('initial');

      await router.replace({
        name: 'workspace',
      });
    } catch (err) {
      console.log(`Code ${authLink} is invalid:`, err);
    }
  },

  /**
   * Launch deep link
   *
   * @param {object} obj – vuex object
   * @param {string} path – deep link path
   * @returns {void}
   */
  launchDeepLink(obj, path) {
    const deepLink = `heyka://${path}`;

    console.log('launchDeepLink', deepLink);
    document.location.href = deepLink;
  },
};
