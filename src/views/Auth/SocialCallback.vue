<template>
  <div />
</template>

<script>
import Cookies from 'js-cookie';
import { COOKIE_URL } from '@sdk/Constants';

export default {
  computed: {
    /**
     * Authentication code
     * @returns {string | (string | null)[]}
     */
    authCode() {
      return this.$route.query.authlink;
    },

    /**
     * Action like a login or social-link
     * @returns {string}
     */
    action() {
      return Cookies.get('heyka-auth-action');
    },

    /**
     * Backend status
     * @returns {string | (string | null)[]}
     */
    status() {
      return this.$route.query.success;
    },

    /**
     * Backend error message
     * @returns {string|(string | null)[]}
     */
    error() {
      if (this.$route.query.error) {
        return this.$route.query.error;
      }

      return '';
    },
  },

  async mounted() {
    console.log(this.$route);

    if (this.action === 'login') {
      if (this.status === 'true') {
        this.launchDeepLink(`login/${this.authCode}`);
      } else {
        this.launchDeepLink(`login/false/${this.error}`);
      }
    }

    if (this.action === 'link') {
      let deepLink = `social-link/${this.status}`;

      if (this.error) {
        deepLink += `/${encodeURIComponent(this.error)}`;
      }

      Cookies.remove('heyka-access-token', { domain: COOKIE_URL });
      Cookies.remove('heyka-auth-action', { domain: COOKIE_URL });

      this.launchDeepLink(deepLink);
    }
  },

  methods: {
    /**
     * Launch deep link
     * @param {string} url – deep link url
     * @returns {void}
     */
    launchDeepLink(url) {
      console.log('launchDeepLink', `heyka://${url}`);
      document.location.href = `heyka://${url}`;
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>
