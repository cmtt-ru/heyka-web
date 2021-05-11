<template>
  <utility-page>
    <h1>{{ texts.header }}</h1>
    <p>{{ texts.subheader }}</p>
    <ui-button
      v-if="deepLink"
      :type="1"
      size="xlarge"
      @click="openApp"
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
      deepLink: null,
    };
  },

  computed: {
    /**
     * Get needed texts from I18n-locale file
     * @returns {object}
     */
    texts() {
      return this.$t('deeplink');
    },

    /**
     * channel Id
     * @returns {string}
     */
    channelId() {
      return this.$route.query.channelId;
    },

    /**
     * workspace Id
     * @returns {string}
     */
    workspaceId() {
      return this.$route.query.workspaceId;
    },
  },

  mounted() {
    // if (!this.workspaceId && !this.channelId) {
    //   return;
    // }
    this.deepLink = `invite/${this.workspaceId}/${this.channelId}`;

    this.$store.dispatch('launchDeepLink', this.deepLink);
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
