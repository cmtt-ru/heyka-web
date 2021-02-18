<template>
  <utility-page>
    <throbber
      v-if="loading"
      :size="48"
    />

    <template v-else>
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
      <ui-button
        :type="1"
        size="xlarge"
        @click="openAppHandler"
      >
        {{ texts.button }}
      </ui-button>
    </template>
  </utility-page>
</template>

<script>
import UtilityPage from '@/components/Layouts/UtilityPage';
import UiButton from '@components/UiButton';
import Throbber from '@components/Throbber';

export default {
  components: {
    UtilityPage,
    UiButton,
    Throbber,
  },

  data() {
    return {
      loading: true,
      title: '',
      subtitle: '',
      slackWorkspaceName: '',
      heykaWorkspaceName: '',
      deepLink: '',
    };
  },

  computed: {
    /**
     * Get needed texts from I18n-locale file
     * @returns {object}
     */
    texts() {
      return this.$t('slackCallback');
    },
  },

  async mounted() {
    try {
      const res = await this.$API.workspace.resumeConnectWithSlack(window.location.search);

      this.slackWorkspaceName = res.slackWorkspaceName;
      this.heykaWorkspaceName = res.workspaceName;

      this.title = this.texts.successTitle;
      this.subtitle = this.$t('slackCallback.successSubtitle', [this.slackWorkspaceName, this.heykaWorkspaceName]);

      this.deepLink = '/slack-connect/true';

      console.log('res', res);
    } catch (err) {
      console.error(err);
      this.title = this.texts.failTitle;
      this.subtitle = this.texts.errorSubtitle;
      this.deepLink = `/slack-connect/false/${err.message}`;
    } finally {
      this.loading = false;
    }
  },

  methods: {
    openAppHandler() {
      this.$store.dispatch('launchDeepLink', this.deepLink);
    },
  },
};
</script>

<style lang="stylus">

</style>
