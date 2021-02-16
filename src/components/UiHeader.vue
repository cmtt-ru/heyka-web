<template>
  <header>
    <div class="wrapper">
      <svg-icon
        class="logo"
        name="logo-full"
        width="105"
        height="32"
      />

      <div class="slot">
        <slot />
      </div>

      <div
        v-if="me.id"
        v-popover.click="{name: 'UserMenu'}"
        class="user"
      >
        <avatar
          :user-id="me.id"
          :image="userAvatar(me.id, 32)"
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
  components: { Avatar },
  computed: {
    ...mapGetters({
      me: 'myInfo',
      userAvatar: 'users/getUserAvatarUrl',
      animationChannel: 'app/getAnimationChannel',
    }),
  },
};
</script>

<style lang="stylus" scoped>
  @import '~@styles/global.styl';

  header
    position sticky
    display flex
    align-items center
    justify-content center
    top 0
    left 0
    width 100%
    height 60px
    background #fff
    z-index 10

    .wrapper
      display flex
      max-width 960px
      margin 0 16px
      flex-grow 1

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
