<template>
  <div class="auth-page">
    <h1>Вход в Heyka</h1>

    <div class="l-mt-18">
      <ui-button
        :type="3"
        wide
        class="l-mb-12"
        icon="slack"
        @click="socialHandler('slack')"
      >
        Slack
      </ui-button>

      <ui-button
        :type="3"
        wide
        class="l-mb-12"
        icon="google"
        @click="socialHandler('google')"
      >
        Google
      </ui-button>

      <ui-button
        :type="3"
        wide
        class="l-mb-12"
        icon="facebook"
        @click="socialHandler('facebook')"
      >
        Facebook
      </ui-button>

      <router-link :to="{name: 'new-auth-email'}">
        <ui-button
          :type="3"
          wide
          class="l-mb-12"
          icon="mail"
        >
          Email
        </ui-button>
      </router-link>
    </div>
  </div>
</template>

<script>

import UiButton from '@components/UiButton';
import { WEB_URL } from '@sdk/Constants';

export default {
  components: {
    UiButton,
  },

  methods: {
    /**
     * Social button handler
     * @param {string} socialName – social name
     * @returns {void}
     */
    socialHandler(socialName) {
      const link = `${WEB_URL}/auth/social/${socialName}/login`;

      window.open(link);
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>
