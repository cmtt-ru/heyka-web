<template>
  <utility-page>
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>
    <ui-button
      v-if="deepLink"
      :type="1"
      size="xlarge"
      @click="openApp"
    >
      {{ texts.button }}
    </ui-button>
  </utility-page>
</template>

<script>
import UtilityPage from '@/components/Layouts/UtilityPage';
import UiButton from '@components/UiButton';
import Cookies from 'js-cookie';
import { COOKIE_URL } from '@sdk/Constants';
import { GA_EVENTS, trackEvent } from '@libs/analytics';
import { authFileStore } from '@/store/localStore';

export default {
  components: {
    UtilityPage,
    UiButton,
  },

  data() {
    return {
      title: '',
      subtitle: '',
      deepLink: '',
    };
  },

  computed: {
    /**
     * Get needed texts from I18n-locale file
     * @returns {object}
     */
    texts() {
      return this.$t('auth.socialCallback');
    },

    /**
     * Service name
     * @returns {string | (string | null)[]}
     */
    serviceName() {
      const serviceName = this.$route.query.s;

      if (serviceName) {
        return serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
      }

      return '';
    },

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
     * True if this account is new and we are registering new user
     * @returns {boolean}
     */
    newUser() {
      return !!this.$route.query.newUser;
    },

    /**
     * Backend status
     * @returns {string | (string | null)[]}
     */
    status() {
      return this.$route.query.success === 'true';
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
    if (this.status) {
      this.title = this.texts.successTitle;
    } else {
      this.title = this.texts.failTitle;
      this.subtitle = this.texts.errorSubtitle;
    }

    switch (this.action) {
      case 'login':
        if (this.status) {
          this.subtitle = this.$t('auth.socialCallback.loginSubtitle', [ this.serviceName ]);
          this.deepLink = `login/${this.authCode}`;

          if (this.newUser) {
            trackEvent(GA_EVENTS.signup(this.serviceName), 'App');
          } else {
            trackEvent(GA_EVENTS.login(this.serviceName), 'App');
          }
        } else {
          this.deepLink = `login/false/${this.error}`;
        }
        break;

      case 'web-login':
        if (this.status || this.newUser) {
          try {
            await this.$API.auth.signinByLink(this.authCode);
            const user = await this.$API.user.getAuthenticatedUser();
            const inviteCode = authFileStore.get('inviteCode');

            if (this.newUser) {
              trackEvent(GA_EVENTS.signup(this.serviceName));
            } else {
              if (inviteCode) {
                trackEvent(GA_EVENTS.inviteToWorkspace);
              }

              trackEvent(GA_EVENTS.login(this.serviceName));
            }

            if (user.lang) {
              await this.$store.dispatch('app/setLanguage', user.lang);
            }
          } catch (err) {
            console.log('ERROR:', err);
          }

          this.$router.replace({
            name: 'auth-success',
            query: { newUser: this.newUser },
          }).catch(() => {});
        }
        break;

      case 'link': {
        let deepLink = `social-link/${this.status}`;

        if (this.error) {
          deepLink += `/${encodeURIComponent(this.error)}`;
        }

        if (this.status) {
          this.subtitle = this.$t('auth.socialCallback.linkSubtitle', [ this.serviceName ]);

          trackEvent(GA_EVENTS.socialLink(this.serviceName));
        }

        this.deepLink = deepLink;
        break;
      }
    }
    Cookies.remove('heyka-access-token', { domain: COOKIE_URL });
    Cookies.remove('heyka-auth-action', { domain: COOKIE_URL });

    if (this.deepLink) {
      this.$store.dispatch('launchDeepLink', this.deepLink);
    }
  },

  methods: {
    openApp() {
      this.$store.dispatch('launchDeepLink', this.deepLink);
    },
  },
};
</script>

<style lang="stylus">

</style>
