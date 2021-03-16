<template>
  <div>
    <div class="sub-header">
      <p class="sub-header__text">
        Members
      </p>
      <ui-switch
        v-model="canAllInvite"
        class="sub-header__switch"
        text="Все участники могут приглашать новых пользователей"
      />
    </div>

    <user
      v-for="user in sortedUsers"
      :key="user.id"
      :user="user"
      :workspace="selectedWorkspace"
      @update="loadUsers"
    />
  </div>
</template>

<script>

import User from '@/components/Manage/User';
import cloneDeep from 'clone-deep';
import { sortAny } from '@libs/arrays';
import { UiSwitch } from '@components/Form';

export default {
  components: {
    User,
    UiSwitch,
  },

  data() {
    return {
      canAllInvite: true,
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

      return cloneDeep(this.workspaceUsers).sort(sortAny([
        {
          key: 'latestActivityAt',
          type: 'date',
          order: 'desc',
        } ]));
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

    &__switch
      max-width 500px
</style>
