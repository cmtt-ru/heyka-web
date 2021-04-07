<template>
  <popover
    :min-width="148"
  >
    <div class="buttons">
      <ui-button
        :type="11"
        data-popover-close
      >
        <a
          class="link"
          target="_blank"
          :href="macLink"
          @click="startPinging"
        >macOS</a>
      </ui-button>
      <ui-button
        :type="11"
        data-popover-close
      >
        <a
          class="link"
          target="_blank"
          :href="winLink"
          @click="startPinging"
        >Windows</a>
      </ui-button>
      <ui-button
        :type="11"
        data-popover-close
      >
        <a
          class="link"
          target="_blank"
          :href="linuxLink"
          @click="startPinging"
        >Linux</a>
      </ui-button>
      <router-link :to="{ name: 'downloads'}">
        <ui-button
          :type="11"
          data-popover-close
        >
          Downloads page
        </ui-button>
      </router-link>
    </div>
  </popover>
</template>

<script>
import Popover from '@components/Popover';
import UiButton from '@components/UiButton';

import broadcastEvents from '@sdk/classes/broadcastEvents';

export default {
  components: {
    Popover,
    UiButton,
  },

  data() {
    return {
      version: '1.1.12',
      pingInterval: null,
    };
  },

  computed: {
    /**
     * Get needed texts from I18n-locale file
     * @returns {object}
     */
    texts() {
      return this.$t('landing');
    },

    macLink() {
      return `https://storage.yandexcloud.net/heyka-beta-bin/download/Heyka-${this.version}.dmg`;
    },
    winLink() {
      return `https://storage.yandexcloud.net/heyka-beta-bin/download/Heyka%20Setup%20${this.version}.exe`;
    },
    linuxLink() {
      return `https://storage.yandexcloud.net/heyka-beta-bin/download/heyka_${this.version}_amd64.deb`;
    },

  },

  methods: {
    startPinging() {
      broadcastEvents.dispatch('ping-local-server');
    },
  },
};
</script>
