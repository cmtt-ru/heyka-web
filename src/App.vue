<template>
  <div
    :style="$themes.getColors('content')"
    class="app-wrapper"
  >
    <notifications />
    <router-view />
    <modals />
  </div>
</template>

<script>
import '@sdk/styles/fonts.styl';
import '@/styles/global.styl';
import Notifications from '@components/Notifications';
import Modals from '@sdk/components/Modals';
import { client } from '@api/socket/client';
require.context('@assets/icons', true, /[A-Za-z0-9-_,\s]+\.svg$/i);

export default {
  components: {
    Notifications,
    Modals,
  },

  async created() {
    this.loadSvgSprite();

    try {
      await this.$API.auth.check();
      await this.$store.dispatch('tryToAuthorize');
    } catch (e) {

    }

    window.addEventListener('beforeunload', () => {
      client.emit('logout');
    });
  },
  methods: {
    loadSvgSprite() {
      const ajax = new XMLHttpRequest();

      ajax.open('GET', '/img/icons.svg', true);
      ajax.send();
      ajax.onload = function (e) {
        const div = document.createElement('div');

        div.style.pointerEvents = 'none';
        div.style.width = '1px';
        div.style.height = '1px';
        div.style.position = 'absolute';
        div.style.left = '-10px';
        div.style.overflow = 'hidden';
        div.innerHTML = ajax.responseText;
        document.body.insertBefore(div, document.body.childNodes[0]);
      };
    },
  },
};
</script>

<style lang="stylus">
.app-wrapper
  background-color var(--new-bg-04)
  color var(--new-UI-02)
</style>
