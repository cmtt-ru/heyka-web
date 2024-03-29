import Vue from 'vue';

const NO_EMOJI_REGEXP = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;

export default {

  /**
   * Replace full collection
   *
   * @param {UserState} state – user module state
   * @param {UserCollection} collection — user collection object
   * @constructor
   */
  SET_COLLECTION(state, collection) {
    //! remove emoji from name. Temp solution!
    for (const userId in collection) {
      collection[userId].name = collection[userId].name.replace(NO_EMOJI_REGEXP, '');
    }
    state.collection = collection;
  },

  /**
   * Update specific user
   *
   * @param {UserState} state – user module state
   * @param {object} data — online status object
   * @param {string} data.id – user id
   * @constructor
   */
  UPDATE_USER(state, data) {
    if (state.collection[data.id]) {
      for (const key in data) {
        //! remove emoji from name. Temp solution!
        if (key === 'name') {
          Vue.set(state.collection[data.id], 'name', data[key].replace(NO_EMOJI_REGEXP, ''));
        } else {
          Vue.set(state.collection[data.id], key, data[key]);
        }
      }
    }
  },

  /**
   * Add specific user
   *
   * @param {UserState} state – user module state
   * @param {object} data — user data object
   * @constructor
   */
  ADD_USER(state, data) {
    if (!state.collection[data.id]) {
      Vue.set(state.collection, data.id, data);
    }
  },

  /**
   * Remove specific user by id
   *
   * @param {UserState} state – user module state
   * @param {string} userId – user id
   * @constructor
   */
  REMOVE_USER(state, userId) {
    if (state.collection[userId]) {
      Vue.delete(state.collection, userId);
    }
  },
};
