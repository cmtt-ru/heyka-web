<template>
  <div class="workspaces">
    <div
      v-for="workspace in workspaces"
      :key="workspace.id"
      class="workspaces__item"
      :class="{'workspaces__item--selected': selectedWorkspace.id === workspace.id}"
      @click="selectWorkspaceHandler(workspace)"
    >
      <avatar
        class="workspaces__item__img"
        :image="avatarUrl(workspace, 56)"
        :size="56"
        :border-radius="12"
      />
      <!-- <img
        class="workspaces__item__img"
        width="56"
        height="56"
        :src="avatarUrl(workspace, 56)"
      > -->
    </div>
    <router-link
      to="/ws/create"
      class="workspaces__item workspaces__item--add"
    >
      <svg-icon
        name="add"
        width="24"
        height="24"
      />
    </router-link>
  </div>
</template>

<script>
import { getUserAvatarUrl } from '@libs/image';
import Avatar from '@components/Avatar';

export default {
  components: { Avatar },
  props: {
    /**
     * Array of workspace
     */
    workspaces: {
      type: Array,
      default: function () {
        return [];
      },
    },

    /**
     * Selected workspace
     */
    selectedWorkspace: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },

  methods: {
    /**
     * Workspace selected event handler
     * @param {object} workspace – workspace
     * @returns {void}
     */
    selectWorkspaceHandler(workspace) {
      this.$emit('select', workspace);
    },

    /**
     * Avatar url
     */
    avatarUrl: getUserAvatarUrl,
  },
};
</script>

<style scoped lang="stylus">
  .workspaces
    position sticky
    top 84px
    display flex
    flex-direction column
    align-items center

    &__item
      width 56px
      height 56px
      box-sizing border-box
      border-radius 12px
      cursor pointer
      margin-bottom 16px
      position relative

      &--add
        background-color #E8F1FE
        color var(--new-UI-01)
        display flex
        justify-content center
        align-items center

        &:hover
          background-color rgba(21, 117, 241, 0.2)

      &--selected
        cursor default

        &:after
          content ''
          position absolute
          bottom -6px
          right -6px
          left -6px
          top -6px
          border-radius 18px
          border 4px solid var(--new-UI-01)
          z-index 2

</style>
