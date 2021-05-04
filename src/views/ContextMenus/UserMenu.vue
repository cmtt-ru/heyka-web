<template>
  <popover
    :min-width="89"
  >
    <div class="buttons">
      <ui-button
        :type="11"
        icon="disconnect"
        @click="logoutHandler"
      >
        Logout
      </ui-button>
    </div>
  </popover>
</template>

<script>
import Popover from '@components/Popover';
import UiButton from '@components/UiButton';
import logout from '@api/auth/logout';

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
      return this.$t('popover.userProfile');
    },

  },

  methods: {
    /**
     * Logout handler
     * @returns {void}
    */
    logoutHandler() {
      logout();
    },
  },
};
</script>
