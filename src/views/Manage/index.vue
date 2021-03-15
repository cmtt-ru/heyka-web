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
        <p class="workspace-name">
          {{ selectedWorkspace.name }}
        </p>
        <router-link
          class="manage-workspace-link"
          :to="{name: 'manage-users'}"
          replace
        >
          Users
        </router-link>
        <router-link
          class="manage-workspace-link"
          :to="{name: 'manage-groups'}"
          replace
        >
          Groups
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

export default {
  components: {
    Workspaces,
    UiHeader,
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

      &--content
        flex 1 1 auto
        border-left 1px solid rgba(0,0,0,0.1)
        padding 32px 40px
        overflow-y auto

  .workspace-name
    font-size 32px
    font-weight 500
    line-height 44px
    margin-bottom 24px

.manage-workspace-link
  display block
  padding 6px
  border-radius 8px
  font-size 18px
  line-height 32px
  text-decoration none
  color var(--text-0)
  margin 2px 4px 8px

  &:hover:not(.router-link-exact-active)
    background-color var(--new-UI-06)

  &.router-link-exact-active
    background-color var(--new-UI-06)
</style>
