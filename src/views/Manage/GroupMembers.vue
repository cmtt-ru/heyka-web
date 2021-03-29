<template>
  <div class="manage-page">
    <div class="sub-header">
      <ui-button
        :type="9"
        class="sub-header__back"
        size="small"
        @click="$emit('go-back')"
      >
        <svg-icon

          name="back"
          :height="24"
          :width="24"
        />
      </ui-button>
      <p class="sub-header__text">
        {{ group.name }}
      </p>
    </div>

    <ui-input
      v-model="searchText"
      icon="search"
      class="search-input"
      placeholder="Search"
      @keydown.native.esc="searchText=''"
    />

    <ui-button
      :type="9"
      icon="add"
      class="add-button"
      size="large"
      @click="addMembersHandler"
    >
      Add members
    </ui-button>

    <placeholder
      v-if="!groupUsers.length"
      class="users-placeholder"
      avatar
      two-lines
      right-button
      :height="80"
    />

    <list
      v-if="sortedUsers.length"
      v-model="filteredGroupUsers"
      :items="sortedUsers"
      filter-key="name"
      :filter-by="searchText"
    >
      <list-item
        v-for="user in filteredGroupUsers"
        :key="user.id"
        :similarity="user.similarity"
      >
        <user
          :user="user"
          delete-button
        />
      </list-item>
    </list>
  </div>
</template>

<script>
import Placeholder from '@components/Placeholder';
import User from '@/components/Manage/User';
import cloneDeep from 'clone-deep';
import { sortAny } from '@libs/arrays';
import { UiInput } from '@components/Form';
import { List, ListItem } from '@components/List';
import UiButton from '@components/UiButton';

import Modal from '@sdk/classes/Modal';
import broadcastEvents from '@sdk/classes/broadcastEvents';

export default {
  components: {
    User,
    UiInput,
    List,
    ListItem,
    UiButton,
    Placeholder,
  },

  data() {
    return {
      searchText: '',
      group: {},
      groupUsers: [],
      filteredGroupUsers: [],
      selectedGroup: {},
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
     * group id from route
     * @returns {string}
     */
    groupId() {
      return this.$route.params.groupId;
    },

    /**
     * Sort users by latestActivityAt
     * @returns {array}
     */
    sortedUsers() {
      return cloneDeep(this.groupUsers).sort(sortAny([
        {
          key: 'latestActivityAt',
          type: 'date',
          order: 'desc',
        } ]));
    },
  },

  async mounted() {
    const groups = await this.$API.group.getGroups(this.workspaceId);

    this.group = groups.find(group => group.id === this.groupId);
    this.groupUsers = await this.$API.group.getMembers(this.groupId);

    broadcastEvents.on('delete-group-user', this.deleteUser);
  },

  methods: {
    addMembersHandler() {
      Modal.show({
        name: 'NewGroupUsers',
        data: {
          header: this.$tc('modal.addGroup.header2', this.group.name),
        },
        onClose: async (status, data) => {
          if (status === 'confirm') {
            console.log('confirm', data);
            await this.$API.group.addMembers(this.groupId, {
              users: data.map(user => user.id),
            });
            this.groupUsers = await this.$API.group.getMembers(this.groupId);
          }
        },
      });
    },

    async deleteUser(id) {
      await this.$API.group.deleteMembers(this.groupId, [ id ]);
      this.groupUsers = await this.$API.group.getMembers(this.groupId);
    },

  },
};
</script>

<style lang="stylus" scoped>
@import 'content.styl'

.sub-header__back
  display initial

.users-placeholder
  padding 0 17px

</style>
