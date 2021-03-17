<template>
  <div class="layout">
    <ui-header />

    <div class="layout__wrapper">
      <div class="layout__col layout__col--workspaces">
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
          replace
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
          replace
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
        <router-view />
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

      &--sidebar
        flex 0 0 366px
        padding 32px 40px
        box-sizing border-box
        border-left 1px solid rgba(0,0,0,0.1)
        background-color var(--new-bg-01)

      &--content
        flex 1 1 auto
        border-left 1px solid rgba(0,0,0,0.1)
        padding 32px 40px
        overflow-y auto

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
</style>
