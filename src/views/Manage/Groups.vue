<template>
  <div
    :key="workspaceId"
    class="manage-page"
  >
    <div
      v-if="groups && groups.length===0"
      class="empty"
    >
      <div class="sub-header sub-header--empty">
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
          {{ $t('manage.groups') }}
        </p>
      </div>
      <div
        class="empty__name"
      >
        {{ $t('manage.noGroupsHeader') }}
      </div>
      <div class="empty__desc">
        {{ $t('manage.noGroupsDesc') }}
      </div>
      <ui-button
        :type="1"
        class="empty__button"
        size="large"
        @click="createGroupHandler()"
      >
        {{ $t('manage.noGroupButton') }}
      </ui-button>
    </div>

    <div v-else>
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
          {{ $t('manage.groups') }}
        </p>
      </div>
      <ui-input
        v-model="searchText"
        icon="search"
        class="search-input"
        :placeholder="$t('techTexts.search')"
        @keydown.native.esc="searchText=''"
      />
      <ui-button
        :type="9"
        icon="add"
        class="add-button"
        size="large"
        @click="createGroupHandler"
      >
        {{ $t('manage.addGroup') }}
      </ui-button>

      <placeholder
        v-if="!groups"
        class="groups-placeholder"
        avatar
        two-lines
        right-button
        :height="80"
      />

      <list
        v-if="groups"
        v-model="filteredGroups"
        :items="groups"
        filter-key="name"
        :filter-by="searchText"
      >
        <list-item
          v-for="group in filteredGroups"
          :key="group.id"
          :similarity="group.similarity"
          class="group"
          @click.native="openMembers(group.id)"
        >
          <div class="group__avatar">
            <svg-icon
              name="group"
              :width="18"
              :height="18"
            />
          </div>
          <div class="group__info">
            <div
              v-textfade
              class="group__name"
            >
              {{ group.name }}
            </div>
            <div
              v-textfade
              class="group__email"
            >
              {{ $tc('manage.membersAmount', group.membersCount) }}
            </div>
          </div>

          <ui-button
            v-popover.click="{name: 'EditGroup', data: {id: group.id}}"
            class="group__more"
            :type="7"
            size="medium"
            icon="more"
            @click.stop.native
          />
        </list-item>
      </list>
    </div>
  </div>
</template>

<script>
import Placeholder from '@components/Placeholder';
import UiButton from '@components/UiButton';
import { UiInput } from '@components/Form';
import { List, ListItem } from '@components/List';

import broadcastEvents from '@sdk/classes/broadcastEvents';
import Modal from '@sdk/classes/Modal';

export default {

  components: {
    Placeholder,
    UiButton,
    List,
    ListItem,
    UiInput,
  },

  data() {
    return {
      searchText: '',
      groups: null,
      filteredGroups: [],
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

  },

  async activated() {
    this.groups = await this.$API.group.getGroups(this.workspaceId);

    broadcastEvents.on('delete-group', this.deleteModal);
    broadcastEvents.on('edit-group', this.editModal);
    broadcastEvents.on('open-group-members', this.openMembers);
  },

  deactivated() {
    broadcastEvents.removeAllListeners('delete-group');
    broadcastEvents.removeAllListeners('edit-group');
    broadcastEvents.removeAllListeners('open-group-members');
  },

  methods: {
    createGroupHandler() {
      Modal.show({
        name: 'NewGroupName',
        data: {
          header: this.$t('modal.addGroup.header1'),
          errorString: this.$t('modal.addGroup.nameAlreadyTakenError'),
          groupNames: this.groups.map(el => el.name),
        },
        onClose: async (status, data) => {
          if (status === 'confirm') {
            console.log('confirm', data);
            await this.$API.group.create(this.workspaceId, {
              name: data.name,
              users: data.users.map(user => user.id),
            });
            this.groups = await this.$API.group.getGroups(this.workspaceId);
          }
        },
      });
    },

    deleteModal(id) {
      const name = this.groups.find(group => group.id === id).name;

      Modal.show({
        name: 'ConfirmDelete',
        data: {
          header: this.$t('modal.deleteGroup.header'),
          body: this.$tc('modal.deleteGroup.body', name),
        },
        onClose: async (status) => {
          if (status === 'confirm') {
            await this.$API.group.remove(id);
            this.groups = await this.$API.group.getGroups(this.workspaceId);
          }
        },
      });
    },

    editModal(id) {
      const name = this.groups.find(group => group.id === id).name;

      Modal.show({
        name: 'EditInfo',
        data: {
          header: this.$t('modal.editGroup.header'),
          name,
        },
        onClose: async (status, data) => {
          if (status === 'confirm') {
            await this.$API.group.edit(id, data);
            this.groups = await this.$API.group.getGroups(this.workspaceId);
          }
        },
      });
    },

    async openMembers(id) {
      console.log(id);
      await this.$router.push({
        name: 'manage-groups-members',
        params: { groupId: id },
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import 'content.styl'

.manage-page
  min-height 100%
  display grid

.sub-header--empty
  position absolute
  top 0
  left 0
  display none

  @media $tablet
    display flex

.empty
  display flex
  width 100%
  height 100%
  padding 16px
  margin 0 auto
  box-sizing border-box
  flex-direction column
  align-items center
  justify-content center
  position relative

  &__name
    font-weight bold
    font-size 32px
    line-height 48px
    margin-bottom 12px
    text-align center

  &__desc
    font-size 16px
    line-height 26px
    font-weight 500
    max-width 350px
    margin-bottom 24px
    text-align center

  &__button
    height 48px
    font-weight 500
    font-size 18px
    line-height 24px
    padding 12px 38px

.groups-placeholder
  padding 0 17px

 .group
    display flex
    flex-direction row
    justify-content space-between
    align-items flex-start
    padding 12px
    height 80px
    width 100%
    box-sizing border-box
    position relative
    cursor pointer

    &:hover
      background-color var(--new-UI-06)

    &__avatar
      display flex
      flex-direction row
      justify-content center
      align-items center
      margin 8px 16px 0 4px
      flex-shrink 0
      width 40px
      height 40px
      border-radius 100%
      background var(--new-UI-01-3)
      border 1px solid var(--new-stroke-01)
      color var(--new-UI-01)

    &__info
      flex-grow 2

    &__name
      font-size 18px
      line-height 28px
      font-weight 500
      display flex
      flex-direction row
      justify-content flex-start
      align-items center

      &__admin
        color var(--new-UI-01)
        padding-left 8px
        flex-shrink 0

    &__email
      font-size 16px
      line-height 26px
      color var(--new-UI-04)

      &.disabled
        opacity 0.5

    &__date
      margin 0 16px
      font-size 16px
      line-height 26px
      flex-shrink 0

    &__more
      flex-shrink 0

    &:after
      content ''
      position absolute
      bottom 0
      right 0
      left 72px
      height 1px
      background-color var(--new-stroke-01)

    &:first-child:before
      content ''
      position absolute
      top -1px
      right 0
      left 72px
      height 1px
      background-color var(--new-stroke-01)

</style>
