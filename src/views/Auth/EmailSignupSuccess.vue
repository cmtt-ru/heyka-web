<template>
  <utility-page>
    <h1>{{ texts.title }}</h1>
    <p>{{ texts.subtitle }}</p>
  </utility-page>
</template>

<script>
import UtilityPage from '@/components/Layouts/UtilityPage';

export default {
  components: {
    UtilityPage,
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

  mounted() {
    this.$store.dispatch('workspaces/acceptWorkspaceInvite');
  },
};
</script>

<style lang="stylus">

</style>
