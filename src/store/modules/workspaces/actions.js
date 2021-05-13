import API from '@api/index';
import { mapKeys } from '@libs/arrays';
import Modal from '@sdk/classes/Modal';
import { authFileStore } from '@/store/localStore';
import i18n from '@sdk/translations/i18n';

export default {
  /**
   * Update workspace list
   * @param {object} context – store context
   * @returns {void}
   */
  async updateList({ commit, dispatch, rootGetters }) {
    const workspaces = await API.workspace.getWorkspaces();
    const workspacesIdList = workspaces.map(w => w.id);

    /** Selected workspace id */
    let selectedWorkspaceId = rootGetters['me/getSelectedWorkspaceId'];

    if (!selectedWorkspaceId || !workspacesIdList.includes(selectedWorkspaceId)) {
      selectedWorkspaceId = workspaces[0].id;
      dispatch('me/setSelectedWorkspaceId', selectedWorkspaceId, { root: true });
    }

    commit('SET_COLLECTION', mapKeys(workspaces, 'id'));
  },

  async acceptWorkspaceInvite() {
    const inviteCode = authFileStore.get('inviteCode');

    if (!inviteCode) {
      return;
    }

    const workspaceInfo = await API.workspace.checkCode(inviteCode);

    Modal.show({
      name: 'ConfirmJoin',
      data: {
        header: i18n.t('modal.workspaceInvite.header'),
        body: i18n.t('modal.workspaceInvite.body', [workspaceInfo.user.name, workspaceInfo.workspace.name]),
        avatar: workspaceInfo.workspace,
      },
      onClose: async (status, data) => {
        authFileStore.set('inviteCode', null);
        if (status === 'confirm') {
          console.log('confirm', data);
          await API.workspace.joinByCode(inviteCode);
        }
      },
    });
  },
};
