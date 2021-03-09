<template>
  <popover
    :min-width="148"
  >
    <div class="buttons">
      <ui-button
        :type="11"
        @click="setLanguage('en')"
      >
        English
      </ui-button>
      <ui-button
        :type="11"
        @click="setLanguage('ru')"
      >
        Русский
      </ui-button>
    </div>
  </popover>
</template>

<script>
import Popover from '@components/Popover';
import UiButton from '@components/UiButton';

export default {
  components: {
    Popover,
    UiButton,
  },

  methods: {
    /**
     * Selected language
     *
     * @param {string} lang - language string
     * @returns {void}
     */
    setLanguage(lang) {
      this.$store.dispatch('app/setLanguage', lang);
    },
  },
};
</script>
