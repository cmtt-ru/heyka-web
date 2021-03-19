<template>
  <div>
    <div class="header">
      Deleting user
    </div>
    <div class="body">
      Are you sure you want to delete user {{ user.name }}?
    </div>
    <div class="buttons">
      <ui-button
        :type="1"
        wide
        size="large"
        @click="$emit('reject')"
      >
        CANCEL
      </ui-button>
      <ui-button
        :type="1"
        wide
        size="large"
        @click="$emit('confirm')"
      >
        DELETE
      </ui-button>
    </div>
  </div>
</template>

<script>
import UiButton from '@components/UiButton';
import { mapGetters } from 'vuex';

export default {
  components: {
    UiButton,
  },

  props: {
    /**
      * Inner data
    */
    data: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      getUserById: 'users/getUserById',
    }),

    userId() {
      return this.data.userId;
    },

    /**
     * Get needed texts from I18n-locale file
     * @returns {object}
     */
    texts() {
      return this.$t('popover.griduser');
    },

    /**
     * Get current user
     * @returns {object}
     */
    user() {
      return this.getUserById(this.userId);
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>
