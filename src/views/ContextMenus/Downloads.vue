<template>
  <popover
    :min-width="148"
  >
    <div class="buttons">
      <ui-button
        :type="11"
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
import { authFileStore } from '@/store/localStore';

// eslint-disable-next-line no-magic-numbers
const PORTS = [9615, 48757, 48852, 49057, 49086];
const pingTime = 2000;

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
    async startPinging() {
      if (authFileStore.get('accessToken')) {
        const res = await this.$API.auth.link();

        console.log(res);
        this.pingInterval = setInterval(() => {
          for (const port of PORTS) {
            this.pingLocalWebServer(res.code, port);
          }
        }, pingTime);
      }
    },
    async pingLocalWebServer(authLink, port) {
      try {
        await fetch(`http://127.0.0.1:${port}/${authLink}`, { mode: 'no-cors' });

        clearInterval(this.pingInterval);
      } catch (err) {
      }
    },
  },
};
</script>
