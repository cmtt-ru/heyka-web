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
        Members
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
      placeholder="Search"
      @keydown.native.esc="closeInput"
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
      :items="sortedUsers"
      filter-key="name"
      :filter-by="searchText"
    >
      <list-item
        v-for="user in filteredWorkspaceUsers"
        :key="user.id"
        :similarity="user.similarity"
      >
        <user
          :user="user"
          :workspace="selectedWorkspace"
          @update="loadUsers"
        />
      </list-item>
    </list>

    <div class="footer">
      You can invite users via
      <a @click="openWorkspaceHandler">Heyka app</a>
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
      canAllInvite: true,
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
     * Sort users alphabetically
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
  },

  async mounted() {
    await this.loadWorkspaces();
    await this.loadUsers();

    broadcastEvents.on('delete', this.deleteModal);
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

    openWorkspaceHandler() {
      this.$store.dispatch('launchDeepLink', `workspace/${this.workspaceId}`);
    },

    deleteModal(id) {
      const name = this.workspaceUsers.find(user => user.id === id).name;

      Modal.show({
        name: 'NewGroupName',
        data: {
          header: this.$t('modal.deleteUser.header'),
          body: this.$tc('modal.deleteUser.body', name),
        },
        onClose: (state) => {
          if (state === true) {
            console.log('true');
          } else {
            console.log('false');
          }
        },
      });
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

  &__back
    color var(--new-UI-01)
    padding-right 16px
    display none

    @media $tablet
      display initial

  &__text
    font-weight bold
    font-size 22px
    line-height 36px
    margin-right 16px
    flex-shrink 0
    flex-grow 2

  &__switch
    max-width 500px

.search-input
  margin-bottom 24px

/deep/ .input
  padding-right 24px
  padding-left 72px
  height 44px
  min-height 44px
  box-sizing border-box
  font-size 18px
  line-height 32px

/deep/ .input__icon
  padding-left 24px

.users-placeholder
  padding 0 17px

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
