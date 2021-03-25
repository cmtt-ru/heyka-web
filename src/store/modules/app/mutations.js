import Vue from 'vue';

/**
 * Max length of privacy log array
 * @type {number}
 */
export default {
  /**
   * Set app language
   *
   * @param {AppState} state – module app state
   * @param {string} language – new language identifier
   * @constructor
   */
  SET_LANGUAGE(state, language) {
    state.language = language;
  },

  /**
   * Add new notification
   *
   * @param {AppState} state – module app state
   * @param {object} notif – new notification
   * @constructor
   */
  ADD_NOTIFICATION(state, notif) {
    state.notifications.push(notif);
  },

  /**
   * Remove notification by id
   *
   * @param {AppState} state – module app state
   * @param {string} id id
   * @constructor
   */
  REMOVE_NOTIFICATION(state, id) {
    state.notifications = state.notifications.filter(el => el.id != id);
  },

  /**
   * Add new modal window
   *
   * @param {AppState} state – module app state
   * @param {object} modal – new modal window
   * @constructor
   */
  ADD_MODAL(state, modal) {
    if (state.modals.length && state.modals[state.modals.length - 1].name === modal.name) {
      return;
    }
    state.modals.push(modal);
  },

  /**
   * Remove last modal window
   *
   * @param {AppState} state – module app state
   * @constructor
   */
  REMOVE_MODAL(state) {
    state.modals.pop();
  },

  /**
   * Set device list
   *
   * @param {AppState} state – module app state
   * @param {object} devices – list of devices
   * @constructor
   */
  SET_DEVICES(state, devices) {
    state.devices = devices;
  },

  /**
   * Set app theme
   *
   * @param {AppState} state – module app state
   * @param {string} theme – new theme identifier
   * @constructor
   */
  SET_THEME(state, theme) {
    state.theme = theme;
  },

  /**
   * Set selected devices
   *
   * @param {AppState} state – module app state
   * @param {object} devices – list of selected devices
   * @constructor
   */
  SET_SELECTED_DEVICES(state, devices) {
    const realDevices = { ...devices };

    /** Search for real speaker device */
    if (realDevices.speaker === 'default') {
      const device = state.devices.speakers.find(d => d.id === 'default');

      if (device) {
        const realDevice = state.devices.speakers.find(d => device.rawLabel.indexOf(d.rawLabel) > 0);

        if (realDevice) {
          realDevices.speaker = realDevice.id;
        }
      }
    }

    /** Search for real microphone device */
    if (realDevices.microphone === 'default') {
      const device = state.devices.microphones.find(d => d.id === 'default');

      if (device) {
        const realDevice = state.devices.microphones.find(d => device.rawLabel.indexOf(d.rawLabel) > 0);

        if (realDevice) {
          realDevices.microphone = realDevice.id;
        }
      }
    }

    state.selectedDevices = devices;
    state.realSelectedDevices = realDevices;
  },

  /**
   * Set microphone volume
   *
   * @param {AppState} state – module app state
   * @param {number} volume – new microphone volume
   * @constructor
   */
  SET_MICROPHONE_VOLUME(state, volume) {
    state.microphoneVolume = volume;
  },

  /**
   * Set connection status
   *
   * @param {AppState} state – module app state
   * @param {ConnectionStatus} statusObject – status object
   * @constructor
   */
  SET_CONNECTION_STATUS(state, statusObject) {
    Object.keys(statusObject).forEach(status => {
      Vue.set(state.connectionStatus, status, statusObject[status]);
    });
  },

  /**
   * Set last mini chat message timestamp
   *
   * @param {AppState} state – module app state
   * @param {number} timestamp – last message timestamp
   * @constructor
   */
  SET_MINI_CHAT_READ_TIMESTAMP(state, timestamp) {
    state.miniChatLastReadTimestamp = timestamp;
  },
};
