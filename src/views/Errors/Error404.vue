<template>
  <utility-page>
    <h1>{{ texts.title }}</h1>
    <svg-icon
      name="doggo"
      width="200"
      height="230"
      style="margin-top: -25px"
    />
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
      return this.$t('errors.404');
    },
  },
};
</script>
