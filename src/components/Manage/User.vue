<template>
  <div
    v-popover.click.mouse="{name: popoverName, data: {id: user.id, isAdmin: user.role==='admin'}}"
    class="user"
  >
    <avatar
      class="user__avatar"
      :user-id="user.id"
      :image="avatarUrl(user, 40)"
      :size="40"
    />
    <div class="user__info">
      <div
        v-textfade
        class="user__name"
      >
        {{ user.name }}
        <svg-icon
          v-if="user.role === 'admin'"
          name="admin"
          :width="18"
          :height="18"
          class="user__name__admin"
        />
      </div>
      <div
        v-textfade
        class="user__email"
        :class="{'disabled': !user.isEmailVerified}"
      >
        {{ user.email }}
      </div>
    </div>

    <div class="user__date">
      {{ dateFormat(user.latestActivityAt) }}
    </div>

    <ui-button
      v-if="deleteButton"
      class="user__more user__more--delete"
      :type="7"
      size="medium"
      icon="close"
      @click="deleteHandler"
    />

    <ui-button
      v-else
      :key="user.role + user.id"
      v-popover.click="{name: 'EditUserInWorkspace', data: {id: user.id, isAdmin: user.role==='admin'}}"
      class="user__more"
      :type="7"
      size="medium"
      icon="more"
      @mouseup.stop.native
    />
  </div>
</template>

<script>
import { getUserAvatarUrl } from '@libs/image';
import { dateToElapsedTime } from '@libs/texts';
import Avatar from '@components/Avatar';
import UiButton from '@components/UiButton';

import broadcastEvents from '@sdk/classes/broadcastEvents';

export default {
  components: {
    Avatar,
    UiButton,
  },
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
     * true if red cross instead of "more" button
     */
    deleteButton: {
      type: Boolean,
      default: false,
    },

  },

  computed: {
    popoverName() {
      if (!this.deleteButton) {
        return 'EditUserInWorkspace';
      }

      return null;
    },
  },

  methods: {

    /**
     * Format date
     * @param {string} date – date
     * @returns {string}
     */
    dateFormat(date) {
      return dateToElapsedTime(date, this.$t('calendar'));
    },

    deleteHandler() {
      broadcastEvents.dispatch('delete-group-user', this.user.id);
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
    flex-direction row
    justify-content space-between
    align-items flex-start
    padding 12px
    height 80px
    width 100%
    box-sizing border-box
    cursor default
    position relative
    cursor pointer

    &:hover
      background-color var(--new-UI-06)

    &__avatar
      border-radius 100%
      object-fit cover
      margin 8px 16px 0 4px
      flex-shrink 0

    &__info
      flex-grow 2
      overflow hidden

    &__name
      font-size 18px
      line-height 28px
      font-weight 500
      display flex
      flex-direction row
      justify-content flex-start
      align-items center

      @media $mobile
        font-size 16px
        line-height 26px

      &__admin
        color var(--new-UI-01)
        padding-left 8px
        flex-shrink 0

    &__email
      font-size 16px
      line-height 26px
      color var(--new-UI-04)

      @media $mobile
        font-size 14px
        line-height 22px

      &.disabled
        opacity 0.5

    &__date
      margin 0 16px
      font-size 16px
      line-height 26px
      flex-shrink 0

      @media $mobile
        font-size 14px
        line-height 26px

    &__more
      flex-shrink 0

      &--delete
        color var(--new-signal-03)

    &:after
      content ''
      position absolute
      bottom 0
      right 0
      left 72px
      height 1px
      background-color var(--new-stroke-01)
</style>
