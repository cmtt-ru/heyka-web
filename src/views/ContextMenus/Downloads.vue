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
        >Linux</a>
      </ui-button>
      <router-link :to="{ name: 'downloads'}">
        <ui-button
          :type="11"
          data-popover-close
        >
          Downloads
        </ui-button>
      </router-link>
    </div>
  </popover>
</template>

<script>
import Popover from '@components/Popover';
import UiButton from '@components/UiButton';

export default {
  components: {
    Popover,
    UiButton,
  },

  data() {
    return {
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
      return `https://storage.yandexcloud.net/heyka-beta-bin/download/Heyka-${VERSION}.dmg`;
    },
    winLink() {
      return `https://storage.yandexcloud.net/heyka-beta-bin/download/Heyka%20Setup%20${VERSION}.exe`;
    },
    linuxLink() {
      return `https://storage.yandexcloud.net/heyka-beta-bin/download/heyka_${VERSION}_amd64.deb`;
    },

  },
};
</script>
