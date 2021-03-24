<template>
  <div class="layout">
    <ui-header />

    <div class="layout__wrapper">
      <div
        :class="{'layout__col--workspaces--hidden': !showWorkspacesMobile}"
        class="layout__col layout__col--workspaces"
      >
        <workspaces
          :selected-workspace="selectedWorkspace"
          :workspaces="workspaces"
          @select="workspaceSelectHandler"
        />
      </div>

      <div class="layout__col layout__col--sidebar">
        <div class="sub-header">
          <p class="sub-header__text">
            {{ selectedWorkspace.name }}
          </p>
          <ui-button
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
          <svg-icon
            name="user"
            :width="24"
            :height="24"
            class="manage-workspace-link__icon"
          />
          <div>Members</div>
        </router-link>
        <router-link
          class="manage-workspace-link"
          :to="{name: 'manage-groups'}"
        >
          <svg-icon
            name="group"
            :width="24"
            :height="24"
            class="manage-workspace-link__icon"
          />
          <div>Groups</div>
        </router-link>
      </div>

      <div class="layout__col layout__col--content">
        <transition
          :name="transitionName"
        >
          <keep-alive>
            <router-view
              :key="$route.fullPath"
              @go-back="backHandler"
            />
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Workspaces from '@/components/Manage/Workspaces';
import UiHeader from '@/components/UiHeader';
import UiButton from '@components/UiButton';

export default {
  components: {
    Workspaces,
    UiHeader,
    UiButton,
  },

  data() {
    return {
      transitionName: null,
      showWorkspacesMobile: true,
      workspaces: [],
      selectedWorkspace: {},
    };
  },

  computed: {
    /**
     * Auth code from route
     * @returns {string}
     */
    authCode() {
      return this.$route.params.code;
    },

    /**
     * Workspace id from route
     * @returns {string}
     */
    workspaceId() {
      return this.$route.params.workspaceId;
    },
  },

  watch: {
    $route(to, from) {
      if (to.meta.depth > from.meta.depth) {
        this.transitionName = 'next';
      } else if (to.meta.depth === from.meta.depth) {
        this.transitionName = null;
      } else {
        this.transitionName = 'prev';
      }
      if (to.meta.depth > 1) {
        this.showWorkspacesMobile = false;
      } else {
        this.showWorkspacesMobile = true;
      }
    },
  },

  async mounted() {
    await this.authorize();
    await this.loadWorkspaces();
    await this.loadUsers();
  },

  methods: {
    /**
     * Authorization
     * @returns {Promise<date>}
     */
    async authorize() {
      if (this.authCode) {
        await this.$API.auth.signinByLink(this.authCode);
        await this.$router.replace({
          name: 'manage',
          params: { workspaceId: this.workspaceId },
        });
      }
    },

    /**
     * Load workspace list to which you have access
     * @returns {Promise<void>}
     */
    async loadWorkspaces() {
      this.workspaces = await this.$API.admin.getWorkspaces();

      const selected = this.workspaces.find(w => w.id === this.workspaceId);

      if (selected) {
        this.selectedWorkspace = selected;
      } else {
        this.selectedWorkspace = this.workspaces[0];
      }
    },

    /**
     * Load users for selected workspace
     * @returns {Promise<void>}
     */
    async loadUsers() {
      const workspaceData = await this.$API.admin.getUsers(this.selectedWorkspace.id);

      if (workspaceData) {
        this.workspaceUsers = workspaceData.users;
      }
    },

    /**
     * Workspace select handler
     * @param {object} workspace – specific workspace object
     * @returns {Promise<void>}
     */
    async workspaceSelectHandler(workspace) {
      this.selectedWorkspace = workspace;

      await this.$router.replace({
        name: 'manage',
        params: { workspaceId: workspace.id },
      });

      await this.loadUsers();
    },

    /**
     * Back button handler
     * @returns {void}
     */
    backHandler() {
      if (window.history.length > 2) {
        this.$router.go(-1);
      } else {
        this.$router.push({
          name: 'manage',
          params: { workspaceId: this.workspaceId },
        });
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
  .layout
    display flex
    flex-direction column
    width 100%
    min-height 100vh
    background-color var(--new-bg-04)

    &__wrapper
      border-top 1px solid rgba(0,0,0,0.1)
      box-sizing border-box
      display flex
      flex 1 1 auto
      height calc(100vh - 60px)

    &__col
      &--workspaces
        flex 0 0 136px
        padding-top 32px

        &--hidden
          @media $tablet
            display none

      &--sidebar
        flex 0 0 366px
        padding 32px 40px
        box-sizing border-box
        border-left 1px solid rgba(0,0,0,0.1)
        background-color var(--new-bg-01)

        @media $tablet
          display none

      &--content
        flex 1 1 auto
        border-left 1px solid rgba(0,0,0,0.1)
        overflow-y auto
        position relative

  .sub-header
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    flex-wrap wrap
    margin-bottom 24px

    &__text
      font-weight bold
      font-size 22px
      line-height 36px
      margin-right 16px
      flex-shrink 0
      flex-grow 2

.manage-workspace-link
  display flex
  flex-direction row
  align-items center
  justify-content flex-start
  padding 6px 12px
  border-radius 8px
  font-size 18px
  line-height 32px
  font-weight 500
  text-decoration none
  color var(--text-0)
  margin 2px 0 8px

  &__icon
    color var(--new-UI-01)
    padding-right 12px

  &:hover:not(.router-link-exact-active)
    background-color var(--new-UI-06)

  &.router-link-exact-active
    background-color var(--new-UI-06)

.manage-page
  width 100%
  position absolute
  box-sizing border-box
  padding 32px 40px
  background-color var(--new-bg-04)

@media $tablet

/* Page transitions */

  $animation-duration = 350ms

  .next-leave-to
    animation leaveToLeft $animation-duration both cubic-bezier(0.165, 0.84, 0.44, 1)

  .next-enter-active
    transform translateX(100%)

  .next-enter-to
    animation enterFromRight $animation-duration both cubic-bezier(0.165, 0.84, 0.44, 1)
    transform translateX(100%)

  .prev-leave-to
    animation leaveToRight $animation-duration both cubic-bezier(0.165, 0.84, 0.44, 1)

  .prev-enter-active
    transform translateX(-100%)

  .prev-enter-to
    animation enterFromLeft $animation-duration both cubic-bezier(0.165, 0.84, 0.44, 1)

  @keyframes leaveToLeft {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }

  @keyframes enterFromLeft {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes leaveToRight {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }

  @keyframes enterFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
</style>
