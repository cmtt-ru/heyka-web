<template>
  <utility-page>
    <h1>{{ texts.title }}</h1>
    <p>{{ texts.subtitle }}</p>

    <div class="email-signup-buttons">
      <router-link :to="{name: 'landing'}">
        <ui-button
          :type="1"
          size="xlarge"
          class="email-signup-buttons__download"
        >
          {{ texts.downloadApp }}
        </ui-button>
      </router-link>

      <router-link :to="{name: 'workspace-create', params: {code: 'auth-code'}}">
        <ui-button
          :type="17"
          size="xlarge"
          class="email-signup-buttons__create"
        >
          {{ texts.createWorkspace }}
        </ui-button>
      </router-link>
    </div>

    <ui-button
      :type="9"
      size="large"
      class="l-mt-18"
      @click="openAppHandler"
    >
      {{ texts.openApp }}
    </ui-button>
  </utility-page>
</template>

<script>
import UtilityPage from '@/components/Layouts/UtilityPage';
import UiButton from '@components/UiButton';

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
      return this.$t('auth.signupSuccess');
    },
  },

  methods: {
    openAppHandler() {
      this.$store.dispatch('launchDeepLink', this.deepLink);
    },
  },
};
</script>

<style lang="stylus">
  .email-signup-buttons
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
