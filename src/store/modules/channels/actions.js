export default {
  /**
   * Add conversation data
   *
   * @param {object} vuex functions
   * @param {string} userId – user id
   * @param {string} action – action
   * @param {string} data – data
   * @returns {void}
   */
  processConversationData({ dispatch, commit, rootGetters }, { userId, action, data }) {
    const channelId = rootGetters['me/getSelectedChannelId'];

    if (!channelId) {
      console.error('Process Conversation Data --> no selected channel');

      return;
    }

    if (!userId) {
      console.error('Process Conversation Data --> `userId` is not defined');

      return;
    }

    if (!action) {
      console.error('Process Conversation Data --> `action` is not defined');

      return;
    }

    if (data === undefined) {
      console.error('Process Conversation Data --> `data` is not defined');

      return;
    }

    const commitData = {
      channelId,
      userId,
      action,
      data,
    };

    switch (action) {
      case 'audio-quality-indicator':
        commit('ADD_CONVERSATION_DATA', commitData);
        break;

      case 'hand-up':
        commit('ADD_CONVERSATION_DATA', commitData);
        commit('ADD_CONVERSATION_EVENT', commitData);
        break;

      case 'socket-reconnecting':
        commit('ADD_CONVERSATION_DATA', commitData);
        break;
    }
  },
};
