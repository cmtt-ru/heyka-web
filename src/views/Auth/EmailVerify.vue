<template>
  <utility-page>
    <loader
      v-if="loading"
      :size="48"
    />

    <template v-else>
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>

      <div
        v-if="authCode"
        class="email-verify-buttons"
      >
        <router-link :to="{name: 'landing'}">
          <ui-button
            :type="1"
            size="xlarge"
            class="email-verify-buttons__download"
          >
            {{ texts.downloadApp }}
          </ui-button>
        </router-link>

        <router-link :to="{name: 'workspace-create', params: {code: authCode}}">
          <ui-button
            :type="17"
            size="xlarge"
            class="email-verify-buttons__create"
          >
            {{ texts.createWorkspace }}
          </ui-button>
        </router-link>
      </div>

      <ui-button
        v-if="authCode"
        :type="9"
        size="large"
        class="l-mt-18"
        @click="openAppHandler"
      >
        {{ texts.openApp }}
      </ui-button>
    </template>
  </utility-page>
</template>

<script>
import UtilityPage from '@/components/Layouts/UtilityPage';
import UiButton from '@components/UiButton';
import Loader from '@components/Loader';
import verify from '@api/auth/verify';

export default {
  components: {
    UtilityPage,
    UiButton,
    Loader,
  },

  data() {
    return {
      title: '',
      subtitle: '',
      loading: true,
      authCode: '',
    };
  },

  computed: {
    /**
     * Get needed texts from I18n-locale file
     * @returns {object}
     */
    texts() {
      return this.$t('auth.verify');
    },

    /**
     * JWT token
     * @returns {string}
     */
    jwt() {
      return this.$route.query.token;
    },
  },

  async mounted() {
    try {
      await verify(this.jwt);

      const linkData = await this.$API.auth.link();

      await this.$store.dispatch('tryToAuthorize');

      this.authCode = linkData.code;
      this.title = this.texts.successTitle;
      this.subtitle = this.texts.successSubtitle;
    } catch (err) {
      this.title = this.texts.failTitle;
      this.subtitle = this.texts.failSubtitle;
    } finally {
      this.loading = false;
    }
  },

  methods: {
    openAppHandler() {
      this.$store.dispatch('launchDeepLink', `login/${this.authCode}`);
    },
  },
};
</script>

<style lang="stylus">
  .email-verify-buttons
    &__download
      @media $desktop
        margin-right 16px

      @media $mobile
        width 100%
        margin-bottom 16px

    &__create
      @media $mobile
        width 100%

</style>
