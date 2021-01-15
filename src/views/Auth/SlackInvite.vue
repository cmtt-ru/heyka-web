<template>
  <div class="error">
    {{ stateText }}
  </div>
</template>

<script>

export default {

  data() {
    return {
      stateText: null,
    };
  },

  computed: {
    /**
     * Get needed texts from I18n-locale file
     * @returns {object}
     */
    texts() {
      return this.$t('slackInvite');
    },

  },

  async mounted() {
    this.stateText = this.texts.webWait;
    try {
      const res = await this.$API.workspace.resumeConnectWithSlack(window.location.search);

      if (res === 'ok') {
        document.location.href = `heyka://slack-connect/true`;
        this.stateText = this.texts.webSuccess;
      } else {
        this.stateText = this.texts.webError;
      }
    } catch (err) {
      this.stateText = this.texts.webError;
    }
  },

};
</script>

<style lang="stylus" scoped>
  .error
    width 100vw
    box-sizing border-box
    padding 32px
</style>
