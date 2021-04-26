<template>
  <utility-page>
    <h1 class="title">
      Heyka {{ VERSION }}
    </h1>

    <p class="subtitle">
      {{ $t('landing.downloads') }}:
    </p>

    <a
      class="l-mb-12"
      target="_blank"
      :href="winLink"
      @click="startPinging"
    >
      <ui-button
        :type="17"
        wide

        icon="windows"
        size="large"
      >
        Windows
      </ui-button>
    </a>

    <a
      class="l-mb-12"
      target="_blank"
      :href="macLink"
      @click="startPinging"
    >
      <ui-button
        :type="17"
        wide
        icon="apple"
        size="large"
      >
        macOS
      </ui-button>
    </a>

    <a
      class="l-mb-12"
      target="_blank"
      :href="linuxLink"
      @click="startPinging"
    >
      <ui-button
        :type="17"
        wide
        icon="ubuntu"
        size="large"
      >
        Linux
      </ui-button>
    </a>

    <!-- <h2 class="subtitle">
        And mobile:
      </h2>

      <a
        class="l-mb-12"
        target="_blank"
        href=""
      >
        <ui-button
          :type="17"
          wide
          icon="apple"
          size="large"
        >
          iOS
        </ui-button>
      </a>

      <a
        class="l-mb-12"
        target="_blank"
        href=""
      >
        <ui-button
          :type="17"
          wide
          icon="android"
          size="large"
        >
          Android
        </ui-button>
      </a> -->
  </utility-page>
</template>

<script>
import UtilityPage from '@/components/Layouts/UtilityPage';
import UiButton from '@components/UiButton';

import { authFileStore } from '@/store/localStore';
import logo from '@assets/logo.png';

// eslint-disable-next-line no-magic-numbers
const PORTS = [9615, 48757, 48852, 49057, 49086];
const pingTime = 2000;

export default {
  components: {
    UtilityPage,
    UiButton,
  },

  data() {
    return {
      VERSION,
      pingInterval: null,
      logo,
    };
  },
  computed: {
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

<style lang="stylus" scoped>

.subtitle
  margin-bottom 12px

.ui-button
  width 300px
  height 48px
  line-height 48px
  font-size 18px
  position relative
  display block
  margin-bottom 12px

  & /deep/ .icon
    width 24px
    height 24px
    position absolute
    left 12px
    top 12px

</style>
