<template>
  <div class="user">
    <avatar
      class="user__avatar"
      :user-id="user.id"
      :image="avatarUrl(user, 32)"
      :size="32"
    />

    <div class="user__name">
      {{ user.name }}
    </div>

    <div
      class="user__email"
      :class="{'disabled': !user.isEmailVerified}"
    >
      {{ user.email }}
    </div>

    <div class="user__date">
      {{ dateFormat(user.latestActivityAt) }}
    </div>

    <div
      class="user__delete"
      @click="revokeHandler(user)"
    >
      Revoke
    </div>

    <div
      class="user__reset-password"
      :class="{'disabled': !user.isEmailVerified}"
      @click="resetHandler(user)"
    >
      Reset password
    </div>
  </div>
</template>

<script>
import dateFormat from 'dateformat';
import { getUserAvatarUrl } from '@libs/image';
import Avatar from '@components/Avatar';

export default {
  comments: {
    Avatar,
  },
  components: { Avatar },
  props: {
    /**
     * user object
     */
    user: {
      type: Object,
      default: function () {
        return {};
      },
    },

    /**
     * Workspace
     */
    workspace: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },

  methods: {
    /**
     * Revoke user's session
     * @param {object} user – user
     * @returns {Promise<void>}
     */
    async revokeHandler(user) {
      const state = confirm(`Are you sure want to revoke access for "${user.name}"?`);

      if (state) {
        try {
          await this.$API.admin.revokeAccess({
            workspaceId: this.workspace.id,
            userId: user.id,
          });

          this.$emit('update');
        } catch (e) {
          console.log('ERROR');
          console.log(e);
        }
      }
    },

    /**
     * Send reset password mail to user's email
     * @param {object} user – user
     * @returns {Promise<void>}
     */
    async resetHandler(user) {
      const state = confirm(`Are you sure want to send reset password mail to "${user.name}"?`);

      if (state) {
        try {
          await this.$API.auth.discardPass({ email: user.email });
          alert('Reset password mail sent');
        } catch (e) {
          console.log('ERROR');
          console.log(e);
        }
      }
    },

    /**
     * Format date
     * @param {string} date – date
     * @returns {string}
     */
    dateFormat(date) {
      return dateFormat(new Date(date), 'dd.mm.yy HH:MM:ss');
    },

    /**
     * Avatar url
     */
    avatarUrl: getUserAvatarUrl,
  },
};
</script>

<style scoped lang="stylus">
  .user
    display flex
    align-items center
    margin 8px 0
    padding 4px 12px 4px 4px
    border-radius 2px
    cursor default

    &__avatar
      border-radius 100%
      object-fit cover
      margin-right 12px
      min-width 32px

    &__name
      font-size 18px
      line-height 1

    &__email
      margin-left auto
      margin-right 16px

      &.disabled
        opacity 0.5

    &__date
      margin-right 16px

    &__delete
      color lightcoral
      cursor pointer
      margin-right 16px

    &__reset-password
      color lightcoral
      cursor pointer

      &.disabled
        pointer-events none
        opacity 0.5

    &:hover
      background #eee
</style>
