<template>
  <div />
</template>

<script>
import Cookies from 'js-cookie';
import { API_URL, COOKIE_URL } from '@sdk/Constants';

export default {
  computed: {
    /**
     * Social network name
     * @returns {string}
     */
    socialName() {
      return this.$route.params.socialName;
    },

    /**
     * Authentication code
     * @returns {string | (string | null)[]}
     */
    authCode() {
      return this.$route.params.code;
    },

    /**
     * Action like a login or social-link
     * @returns {string}
     */
    action() {
      return this.$route.params.action;
    },
  },
  async mounted() {
    /** Set action cookie */
    Cookies.set('heyka-auth-action', this.action, {
      domain: COOKIE_URL,
    });

    /** User goes to link social network to his account */
    if (this.action === 'link') {
      const res = await this.$API.auth.signinByLink(this.authCode);

      if (res.data && res.data.accessToken) {
        Cookies.set('heyka-access-token', res.data.accessToken, {
          domain: COOKIE_URL,
        });
        console.log(API_URL.split('.').splice(-2)
          .join('.'), Cookies.get('heyka-access-token'));
      }
    }

    /** Redirect to social login page */
    const time = 10000;

    setTimeout(() => {
      document.location.href = `${API_URL}/signin/${this.socialName}`;
    }, time);
  },
};
</script>

<style lang="stylus" scoped>

</style>
