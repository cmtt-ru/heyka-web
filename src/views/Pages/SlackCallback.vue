<template>
  <throbber
    v-if="loading"
    :size="48"
  />

  <div v-else>
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>
    <ui-button
      :type="1"
      size="xlarge"
    >
      {{ texts.button }}
    </ui-button>
  </div>
</template>

<script>
import UiButton from '@components/UiButton';
import Throbber from '@components/Throbber';

export default {
  components: {
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
    setTimeout(() => {
      this.slackWorkspaceName = 'Комитет';
      this.heykaWorkspaceName = 'Комитет';
      this.title = this.texts.successTitle;
      this.subtitle = this.$t('slackCallback.successSubtitle', [this.slackWorkspaceName, this.heykaWorkspaceName]);
      this.loading = false;
      // eslint-disable-next-line no-magic-numbers
    }, 1000);
  },

  methods: {

  },
};
</script>

<style lang="stylus">
  @import './pages.styl'
</style>
