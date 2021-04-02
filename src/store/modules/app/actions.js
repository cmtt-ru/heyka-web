import i18n from '@sdk/translations/i18n';
import { v4 as uuidV4 } from 'uuid';
import { heykaStore } from '@/store/localStore';
import { conversationBroadcast } from '@api/socket/utils';

/**
 * @typedef PrivacyLogData
 * @property {string} category – category, e.g. API or SOCKET
 * @property {string} method – method name, e.g. getWorkspaces
 * @property {object} data – data sent, e.g. {userId: '...'}
 */

let selectedDevicesLoaded = false;

export default {
  /**
   * Set app language
   *
   * @param {function} commit – store commit
   * @param {string} language – app language
   * @returns {void}
   */
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language);
    i18n.locale = language;
    heykaStore.set('language', language);
  },

  /**
   * Add new in-app notification
   *
   * @param {function} commit – store commit
   * @param {object} notif – notification
   * @returns {string} id
   */
  addNotification({ commit }, notif) {
    const id = uuidV4();
    const notification = {
      id,
      ...notif,
    };

    commit('ADD_NOTIFICATION', notification);

    return id;
  },

  /**
   * Remove in-app notification by ID
   *
   * @param {function} commit – store commit
   * @param {string} id – notification id
   * @returns {void}
   */
  removeNotification({ commit }, id) {
    commit('REMOVE_NOTIFICATION', id);
  },

  /**
   * Add new modal window
   *
   * @param {function} commit – store commit
   * @param {object} modal – modal
   * @returns {string} id
   */
  addModal({ commit }, modal) {
    const id = uuidV4();
    const modalWithId = {
      id,
      ...modal,
    };

    commit('ADD_MODAL', modalWithId);

    return id;
  },

  /**
     * Remove last modal window
     *
     * @param {function} commit – store commit
     * @param {string} id – notification id
     * @returns {void}
     */
  removeModal({ commit }) {
    commit('REMOVE_MODAL');
  },

  /**
   * Set selected devices
   *
   * @param {object} vuex context
   * @param {object} devices – selected devices
   * @returns {void}
   */
  setSelectedDevices({ state, commit, getters }, devices) {
    const selectedDevices = devices ? { ...devices } : { ...state.selectedDevices };

    /** Re-set default devices if previous id's are not found */
    if (!state.devices.speakers.map(el => el.id).includes(selectedDevices.speaker)) {
      selectedDevices.speaker = 'default';
    }
    if (!state.devices.microphones.map(el => el.id).includes(selectedDevices.microphone)) {
      selectedDevices.microphone = 'default';
    }
    if (!state.devices.cameras.map(el => el.id).includes(selectedDevices.camera)) {
      if (state.devices.cameras[0]) {
        selectedDevices.camera = state.devices.cameras[0].id;
      } else {
        selectedDevices.camera = '';
      }
    }

    commit('SET_SELECTED_DEVICES', selectedDevices);

    /** Save selected devices to storage */
    Object.keys(selectedDevices).forEach(deviceType => {
      const deviceTypeCapitalized = deviceType.charAt(0).toUpperCase() + deviceType.slice(1);

      heykaStore.set(`selected${deviceTypeCapitalized}`, selectedDevices[deviceType]);

      const device = getters.getDevice(deviceType, selectedDevices[deviceType]);

      heykaStore.set(`selected${deviceTypeCapitalized}Label`, device?.rawLabel || '');
    });
  },

  /**
   * Load selected devices from storage
   *
   * @param {object} vuex context
   * @returns {void}
   */
  loadSelectedDevices({ getters, dispatch }) {
    const selectedDevices = {
      speaker: getters.loadSelectedDevice('speaker'),
      microphone: getters.loadSelectedDevice('microphone'),
      camera: getters.loadSelectedDevice('camera'),
    };

    dispatch('setSelectedDevices', selectedDevices);
  },

  /**
   * Set device list
   *
   * @param {object} vuex context
   * @param {object} devices – device list
   * @returns {void}
   */
  setDevices({ commit, dispatch }, devices) {
    commit('SET_DEVICES', devices);

    if (!selectedDevicesLoaded) {
      dispatch('loadSelectedDevices');
      selectedDevicesLoaded = true;
    } else {
      dispatch('setSelectedDevices');
    }
  },

  /**
   * Set microphone volume
   *
   * @param {function} commit – store commit
   * @param {number} volume – microphone volume
   * @returns {void}
   */
  setMicrophoneVolume({ commit }, volume) {
    const quietestVolume = -100;
    const loudestVolume = 0;

    if (volume < quietestVolume) {
      volume = quietestVolume;
    }

    if (volume > loudestVolume) {
      volume = loudestVolume;
    }

    commit('SET_MICROPHONE_VOLUME', volume);
  },

  raiseHandInChannel({ commit }, myId) {
    conversationBroadcast('hand-up', myId, {
      timestamp: Date.now(),
    });
  },

  sendMiniChatMessage({ commit, rootGetters }, message) {
    conversationBroadcast('mini-chat', rootGetters['me/getMyId'], {
      message,
    });
  },

  markMiniChatAsRead({ commit }) {
    commit('SET_MINI_CHAT_READ_TIMESTAMP', Date.now());
  },
};
