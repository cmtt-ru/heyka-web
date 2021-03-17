<template>
  <popover
    :min-width="148"
  >
    <div class="buttons">
      <ui-button
        :type="11"
        icon="drawing"
        @click="editHandler"
      >
        Edit info
      </ui-button>
      <ui-button
        :type="11"
        icon="trash"
        class="delete-button"
      >
        Delete workspace
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

  computed: {
    /**
     * Get needed texts from I18n-locale file
     * @returns {object}
     */
    texts() {
      return this.$t('popover.editUserInWorkspace');
    },

  },

  methods: {

    editHandler() {

    },
  },
};
</script>

<style lang="stylus" scoped>
  .delete-button
    color var(--new-signal-03)

    &:hover
      background var(--new-signal-03-3)

    /deep/ svg
      color var(--new-signal-03)
</style>
