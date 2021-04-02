<template>
  <popover
    :min-width="148"
  >
    <div class="buttons">
      <ui-button
        :type="11"
        icon="user"
        data-popover-close
        @click="membersHandler"
      >
        {{ $t('manage.members') }}
      </ui-button>
      <ui-button
        :type="11"
        icon="drawing"
        data-popover-close
        @click="editHandler"
      >
        {{ $t('techTexts.edit') }}
      </ui-button>
      <ui-button
        :type="11"
        icon="trash"
        class="delete-button"
        data-popover-close
        @click="deleteHandler"
      >
        {{ $t('techTexts.delete') }}
      </ui-button>
    </div>
  </popover>
</template>

<script>
import Popover from '@components/Popover';
import UiButton from '@components/UiButton';
import broadcastEvents from '@sdk/classes/broadcastEvents';

export default {
  components: {
    Popover,
    UiButton,
  },

  props: {
    /**
     * User id
     */
    id: {
      type: String,
      required: true,
    },
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

    membersHandler() {
      broadcastEvents.dispatch('open-group-members', this.id);
    },

    editHandler() {
      broadcastEvents.dispatch('edit-group', this.id);
    },

    deleteHandler() {
      broadcastEvents.dispatch('delete-group', this.id);
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
