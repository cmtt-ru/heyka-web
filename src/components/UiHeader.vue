<template>
  <header>
    <div
      class="wrapper"
      :class="{'wrapper--full-width': fullWidth}"
    >
      <router-link :to="{name: 'landing'}">
        <svg-icon
          class="logo"
          name="logo-full"
          width="105"
          height="32"
        />
      </router-link>

      <div class="slot">
        <slot />
      </div>

      <div
        v-if="myId"
        v-popover.click="{name: 'UserMenu'}"
        class="user"
      >
        <avatar
          :user-id="myId"
          :size="32"
        />

        <svg-icon
          name="arrow-down"
          width="24"
          height="24"
        />
      </div>

      <div
        v-else
        class="login"
      >
        <router-link :to="{name: 'auth'}">
          Sign in
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import Avatar from '@components/Avatar';

export default {
  components: {
    Avatar,
  },

  props: {
    /**
     * Whether the logo and user avatar should be aligned to left & right edges
     */
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      myId: 'me/getMyId',
      userAvatar: 'users/getUserAvatarUrl',
    }),
  },
};
</script>

<style lang="stylus" scoped>
  header
    position sticky
    display flex
    align-items center
    justify-content center
    top 0
    left 0
    width 100%
    height 60px
    background-color var(--app-bg)
    box-sizing border-box
    border-bottom 1px solid rgba(0,0,0,0.1)
    z-index 10

    .wrapper
      display flex
      max-width 960px
      margin 0 16px
      flex-grow 1

      &--full-width
        max-width none

        @media $desktop
          margin 0 40px

    .slot
      flex-grow 1
      margin 0 16px

    .user
      display flex
      align-items center
      cursor pointer

      &.context-menu--opened
        svg
          color var(--new-UI-01)

      svg
        margin-left 6px

    .login
      display flex
      align-items center
      color var(--new-UI-01)
</style>
