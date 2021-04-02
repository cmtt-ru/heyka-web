<template>
  <popover
    :min-width="148"
  >
    <div class="buttons">
      <ui-button
        v-if="isAdmin"
        :type="11"
        icon="admin-off"
        data-popover-close
        @click="updatePermissions('user')"
      >
        {{ $t('popover.manageUser.noAdmin') }}
      </ui-button>
      <ui-button
        v-else
        :type="11"
        icon="admin"
        data-popover-close
        @click="updatePermissions('admin')"
      >
        {{ $t('popover.manageUser.admin') }}
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

    /**
     * True if user is admin in current workspace
     */
    isAdmin: {
      type: Boolean,
      default: false,
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

    updatePermissions(newRole) {
      broadcastEvents.dispatch('update-permissions', {
        userId: this.id,
        role: newRole,
      });
    },

    deleteHandler() {
      broadcastEvents.dispatch('delete-user', this.id);
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
