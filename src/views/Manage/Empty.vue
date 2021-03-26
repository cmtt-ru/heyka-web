<template>
  <div class="manage-page">
    <router-link
      class="manage-workspace-link"
      :to="{name: 'manage-users'}"
    >
      <div class="manage-workspace-link__left-content">
        <svg-icon
          name="user"
          :width="24"
          :height="24"
          class="manage-workspace-link__icon"
        />
        <div>Members</div>
      </div>
      <svg-icon
        name="arrow-down"
        :width="24"
        :height="24"
        class="manage-workspace-link__arrow"
      />
    </router-link>
    <router-link
      class="manage-workspace-link"
      :to="{name: 'manage-groups'}"
    >
      <div class="manage-workspace-link__left-content">
        <svg-icon
          name="group"
          :width="24"
          :height="24"
          class="manage-workspace-link__icon"
        />
        <div>Groups</div>
      </div>
      <svg-icon
        name="arrow-down"
        :width="24"
        :height="24"
        class="manage-workspace-link__arrow"
      />
    </router-link>
  </div>
</template>

<script>

export default {

  mounted() {
    if (document.body.clientWidth > getComputedStyle(document.documentElement).getPropertyValue('--tablet-width')) {
      this.$router.replace({ name: 'manage-users' }).catch(() => {});
    }
  },

};
</script>

<style lang="stylus" scoped>
.manage-workspace-link
  display flex
  flex-direction row
  align-items center
  justify-content space-between
  height 56px
  width 100%
  box-sizing border-box
  padding 6px 12px
  font-size 18px
  line-height 32px
  font-weight 500
  text-decoration none
  color var(--text-0)
  position relative

  &:after
    content ''
    position absolute
    bottom 0
    right 0
    left 48px
    height 1px
    background-color var(--new-stroke-01)

  &:hover
    background-color var(--new-UI-06)

  &__left-content
    display flex
    flex-direction row
    align-items center

  &__icon
    color var(--new-UI-01)
    padding-right 18px

  &__arrow
    transform rotate(-90deg)
</style>