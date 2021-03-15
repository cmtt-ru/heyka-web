<template>
  <div>
    <p class="workspace-name">
      Members
    </p>

    <user
      v-for="user in sortedUsers"
      :key="user.id"
      class="user"
      :user="user"
      :workspace="selectedWorkspace"
      @update="loadUsers"
    />
  </div>
</template>

<script>

import User from '@/components/Manage/User';
import cloneDeep from 'clone-deep';

export default {
  components: {
    User,
  },

  data() {
    return {
      workspaceUsers: [],
      selectedWorkspace: {},
    };
  },

  computed: {
    /**
     * Workspace id from route
     * @returns {string}
     */
    workspaceId() {
      return this.$route.params.workspaceId;
    },

    /**
     * Sort users alphabetically
     * @returns {array}
     */
    sortedUsers() {
      console.log(this.workspaceUsers);

      return cloneDeep(this.workspaceUsers).sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }

        return 0;
      });
    },
  },

  async mounted() {
    await this.loadWorkspaces();
    await this.loadUsers();
  },

  methods: {

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
      const workspaceData = await this.$API.admin.getUsers(this.workspaceId);

      if (workspaceData) {
        this.workspaceUsers = workspaceData.users;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>

  .workspace-name
    font-size 32px
    font-weight 500
    line-height 44px
    margin-bottom 24px
</style>
