<template>
  <div class="manage-page">
    <div
      class="sub-header"
    >
      <p
        v-textfade
        class="sub-header__text"
      >
        {{ selectedWorkspace.name }}
      </p>
      <ui-button
        :key="selectedWorkspace.id"
        v-popover.click="{name: 'EditWorkspace', data: {id: selectedWorkspace.id}}"
        class="user__more"
        :type="7"
        size="medium"
        icon="more"
      />
    </div>
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
        <div>{{ $t('manage.members') }}</div>
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
        <div>{{ $t('manage.groups') }}</div>
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
import UiButton from '@components/UiButton';
import { mapGetters } from 'vuex';

export default {

  components: {
    UiButton,
  },

  computed: {
    ...mapGetters({
      getWorkspaceById: 'workspaces/getWorkspaceById',
    }),

    /**
     * Workspace id from route
     * @returns {string}
     */
    selectedWorkspace() {
      return this.getWorkspaceById(this.$route.params.workspaceId) || {};
    },

  },

  async activated() {
    if (document.body.clientWidth > getComputedStyle(document.documentElement).getPropertyValue('--tablet-width')) {
      this.$router.replace({ name: 'manage-users' }).catch(() => {});
    }
  },

};
</script>

<style lang="stylus" scoped>
.manage-page
  background-color var(--new-bg-01)

.sub-header
  display flex
  flex-direction row
  justify-content space-between
  align-items center
  max-width 100%
  margin-bottom 24px

  &__text
    font-weight bold
    font-size 22px
    line-height 36px
    margin-right 16px
    flex-shrink 1
    flex-grow 2

  & .ui-button
    flex-shrink 0

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

  @media $tablet
    padding 6px 0 6px

  @media $mobile
    padding 6px 0 6px 4px

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