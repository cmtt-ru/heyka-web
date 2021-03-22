<template>
  <div class="user">
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
      v-popover.click="{name: 'EditUserInWorkspace', data: {id: user.id}}"
      class="user__more"
      :type="7"
      size="medium"
      icon="more"
    />
  </div>
</template>

<script>
import { getUserAvatarUrl } from '@libs/image';
import { dateToElapsedTime } from '@libs/texts';
import Avatar from '@components/Avatar';
import UiButton from '@components/UiButton';

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
     * Format date
     * @param {string} date – date
     * @returns {string}
     */
    dateFormat(date) {
      return dateToElapsedTime(date, this.$t('calendar'));
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

    &__avatar
      border-radius 100%
      object-fit cover
      margin 8px 16px 0 4px
      flex-shrink 0

    &__info
      flex-grow 2

    &__name
      font-size 18px
      line-height 28px
      font-weight 500
      display flex
      flex-direction row
      justify-content flex-start
      align-items center

      &__admin
        color var(--new-UI-01)
        padding-left 8px
        flex-shrink 0

    &__email
      font-size 16px
      line-height 26px
      color var(--new-UI-04)

      &.disabled
        opacity 0.5

    &__date
      margin 0 16px
      font-size 16px
      line-height 26px
      flex-shrink 0

    &__more
      flex-shrink 0

    &:after
      content ''
      position absolute
      bottom 0
      right 0
      left 72px
      height 1px
      background-color var(--new-stroke-01)
</style>
