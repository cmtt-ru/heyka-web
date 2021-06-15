<template>
  <div class="manage-page">
    <div class="sub-header">
      <ui-button
        :type="9"
        size="small"
        @click="$emit('go-back')"
      >
        <svg-icon
          class="sub-header__back"
          name="back"
          :height="24"
          :width="24"
        />
      </ui-button>
      <p class="sub-header__text">
        {{ $t('manage.members') }}
      </p>
      <ui-switch
        v-model="canAllInvite"
        class="sub-header__switch"
        text="Все участники могут приглашать новых пользователей"
      />
    </div>

    <ui-input
      v-model="searchText"
      icon="search"
      class="search-input"
      :placeholder="$t('techTexts.search')"
      @keydown.native.esc="searchText=''"
    />

    <placeholder
      v-if="!workspaceUsers.length"
      class="users-placeholder"
      avatar
      two-lines
      right-button
      :height="80"
    />

    <list
      v-if="workspaceUsers.length"
      v-model="filteredWorkspaceUsers"
      :items="usersForSearch"
      filter-key="searchBy"
      :filter-by="searchText"
    >
      <list-item
        v-for="user in filteredWorkspaceUsers"
        :key="user.id"
        :similarity="user.similarity"
      >
        <user
          :user="user"
          @update="loadUsers"
        />
      </list-item>
    </list>

    <div class="footer">
      {{ $t('manage.inviteUsersText') }}
      <a @click="openWorkspaceHandler">{{ $t('manage.inviteUsersLink') }}</a>
    </div>
  </div>
</template>

<script>
import Placeholder from '@components/Placeholder';
import User from '@/components/Manage/User';
import cloneDeep from 'clone-deep';
import { sortAny } from '@libs/arrays';
import { UiSwitch, UiInput } from '@components/Form';
import { List, ListItem } from '@components/List';
import UiButton from '@components/UiButton';

import broadcastEvents from '@sdk/classes/broadcastEvents';
import Modal from '@sdk/classes/Modal';

export default {
  components: {
    User,
    UiSwitch,
    UiInput,
    List,
    ListItem,
    UiButton,
    Placeholder,
  },

  data() {
    return {
      searchText: '',
      canAllInviteLocal: true,
      workspaceUsers: [],
      filteredWorkspaceUsers: [],
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
     * Sort users by latestActivityAt
     * @returns {array}
     */
    sortedUsers() {
      return cloneDeep(this.workspaceUsers).sort(sortAny([
        {
          key: 'latestActivityAt',
          type: 'date',
          order: 'desc',
        } ]));
    },

    /**
     * Concatenate usernames and emails of users for better search
     * @returns {object}
     */
    usersForSearch() {
      return this.sortedUsers.map(user => {
        return {
          ...user,
          searchBy: user.name + user.email,
        };
      });
    },

    canAllInvite: {
      get() {
        return this.canAllInviteLocal;
      },
      set(val) {
        this.canAllInviteLocal = val;
        this.$API.workspace.setWorkspaceSettings(this.workspaceId, { canUsersInvite: val });
      },
    },
  },

  async activated() {
    await this.loadUsers();
    const settings = await this.$API.workspace.getWorkspaceSettings(this.workspaceId);

    this.canAllInviteLocal = settings.canUsersInvite;

    broadcastEvents.on('delete-user', this.deleteModal);
    broadcastEvents.on('update-permissions', this.updatePermissionsHandler);
  },

  deactivated() {
    broadcastEvents.removeAllListeners('delete-user');
    broadcastEvents.removeAllListeners('update-permissions');
  },

  methods: {

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

    openWorkspaceHandler() {
      this.$store.dispatch('launchDeepLink', `workspace/${this.workspaceId}`);
    },

    deleteModal(id) {
      const name = this.workspaceUsers.find(user => user.id === id).name;

      Modal.show({
        name: 'ConfirmDelete',
        data: {
          header: this.$t('modal.deleteUser.header'),
          body: this.$tc('modal.deleteUser.body', name),
        },
        onClose: async (status) => {
          if (status === 'confirm') {
            await this.$API.admin.deleteUser(this.workspaceId, id);
            await this.loadUsers();
          }
        },
      });
    },

    async updatePermissionsHandler(params) {
      await this.$API.admin.updatePermissions(this.workspaceId, params);
      await this.loadUsers();
    },

  },
};
</script>

<style lang="stylus" scoped>
@import 'content.styl'

.sub-header__text
  @media $mobile
    flex-basis 50%

.sub-header__switch
  width initial

  @media $mobile
    margin-top 16px

.users-placeholder
  padding 0 17px

.list-view
  margin-bottom 48px

.footer
  position fixed
  bottom 0
  left 0
  right 0
  width 100%
  height 48px
  display flex
  flex-direction row
  justify-content center
  align-items center
  background-color var(--new-bg-04)
  border-top 1px solid rgba(0,0,0,0.1)

  & a
    padding-left 4px
    color var(--new-UI-01)

</style>
