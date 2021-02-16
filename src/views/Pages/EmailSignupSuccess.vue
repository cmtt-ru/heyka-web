<template>
  <div class="l-fa-center">
    <h1>{{ texts.title }}</h1>
    <p>{{ texts.subtitle }}</p>

    <div class="email-signup-buttons">
      <ui-button
        :type="1"
        size="xlarge"
        class="email-signup-buttons__download"
        @click="downloadAppHandler"
      >
        {{ texts.downloadApp }}
      </ui-button>

      <ui-button
        :type="17"
        size="xlarge"
        class="email-signup-buttons__create"
        @click="createWorkspaceHandler"
      >
        {{ texts.createWorkspace }}
      </ui-button>
    </div>

    <ui-button
      :type="9"
      size="large"
      class="l-mt-18"
      @click="openAppHandler"
    >
      {{ texts.openApp }}
    </ui-button>
  </div>
</template>

<script>
import UiButton from '@components/UiButton';

export default {
  components: {
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
      return this.$t('emailSignup');
    },
  },

  async mounted() {

  },

  methods: {
    createWorkspaceHandler() {

    },

    downloadAppHandler() {

    },

    openAppHandler() {
      this.$store.dispatch('launchDeepLink', this.deepLink);
    },
  },
};
</script>

<style lang="stylus">
  @import './pages.styl'

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
