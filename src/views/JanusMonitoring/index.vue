<template>
  <div class="layout">
    <ui-header />

    <div class="layout__wrapper">
      <!--
        Channels
      -->
      <div class="layout__col layout__col--fixed">
        <h4>Channels</h4>

        <channel-item
          v-for="item in channelsList"
          :key="item.id"
          :item="item"
          :selected="item.id === selectedChannel.id"
          @select="selectChannelHandler"
        />
      </div>

      <!--
        Users
      -->
      <div class="layout__col layout__col--fixed">
        <h4>Users</h4>

        <user-item
          v-for="item in usersList"
          :key="item.userId"
          :item="item"
          :selected="item.userId === selectedUser.userId"
          @select="selectUserHandler"
        />
      </div>

      <!--
        Sessions
      -->
      <div class="layout__col layout__col--fixed">
        <h4>Sessions</h4>

        <session-item
          v-for="(item, i) in sessionsList"
          :key="i"
          :item="item"
          :selected="item.id === selectedSession.id"
          @select="selectSessionHandler"
        />
      </div>

      <!--
        Handles
      -->
      <div class="layout__col layout__col--fixed">
        <h4>Handles</h4>

        <handle-item
          v-for="(item, id) in handlesList"
          :key="id"
          :item="item"
          :selected="item.handle_id === selectedHandle.handle_id"
          @select="selectHandleHandler"
        />
      </div>

      <!--
        Content
      -->
      <div class="layout__col layout__col--content">
        <handle-content
          v-if="selectedHandle"
          :data="selectedHandle"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-magic-numbers */
import UiHeader from '@/components/UiHeader';
import ChannelItem from './ChannelItem';
import UserItem from './UserItem';
import SessionItem from './SessionItem';
import HandleItem from './HandleItem';
import HandleContent from './HandleContent';

const WORKSPACE_ID = 'd2b3f98c-3749-4242-b319-1416a408b6ed';

export default {
  components: {
    UiHeader,
    ChannelItem,
    UserItem,
    SessionItem,
    HandleItem,
    HandleContent,
  },

  data() {
    return {
      state: {
        channels: [],
        users: [],
      },

      selectedChannel: {},
      selectedUser: {},
      selectedSession: {},
      selectedHandle: {},
    };
  },

  computed: {
    channelsList() {
      if (this.state.channels) {
        return this.state.channels;
      }

      return [];
    },

    usersList() {
      if (this.state.users && this.selectedChannel.users?.length) {
        return this.selectedChannel.users.map(user => {
          const findUser = this.getUserById(user.userId);

          if (findUser) {
            return Object.assign({}, user, {
              name: findUser.name,
            });
          }
        });
      }

      return [];
    },

    sessionsList() {
      if (this.selectedUser.janusStats) {
        return this.selectedUser.janusStats;
      }

      return [];
    },

    handlesList() {
      if (this.selectedSession.handles) {
        return this.selectedSession.handles;
      }

      return [];
    },
  },

  async mounted() {
    await this.updateState();

    window.updateState = this.updateState;
  },

  methods: {
    async updateState(timestamp) {
      const stats = await this.$API.admin.getWorkpsaceStateWithJanusStats(WORKSPACE_ID);

      const body = stats[0].body;

      const { workspaceState } = JSON.parse(body);

      console.log('workspaceState', workspaceState);

      if (workspaceState) {
        this.state.channels = workspaceState.channels;
        this.state.users = workspaceState.users;
      }
    },

    async selectChannelHandler(item) {
      console.log('selected channel', item);
      this.selectedChannel = item;

      this.updateRoute(0);
    },

    async selectUserHandler(item) {
      console.log('selected user', item);
      this.selectedUser = item;

      this.selectedSession = {};
      this.selectedHandle = {};

      this.updateRoute(1);
    },

    async selectSessionHandler(item) {
      console.log('selected session', item);
      this.selectedSession = item;

      this.selectedHandle = {};

      this.updateRoute(2);
    },

    async selectHandleHandler(item) {
      console.log('selected handle', item);
      this.selectedHandle = item;

      this.updateRoute(3);
    },

    getUserById(userId) {
      if (this.state.users) {
        const user = this.state.users.find(u => u.id === userId);

        if (user) {
          return user;
        }
      }

      return null;
    },

    updateRoute(deep) {
      let url = '/janus-monitoring';

      if (this.selectedChannel.id) {
        url += `/c/${this.selectedChannel.id}`;
      }

      if (this.selectedUser.userId) {
        url += `/u/${this.selectedUser.userId}`;
      }

      if (this.selectedSession.id) {
        url += `/s/${this.selectedSession.id}`;
      }

      if (this.selectedHandle.id) {
        url += `/h/${this.selectedHandle.id}`;
      }

      // console.log(url);

      /**
       * Trying to select first items in all columns
       */
      if (deep < 1) {
        if (this.usersList.length) {
          this.selectedUser = this.usersList[0];
        } else {
          this.selectedUser = {};
        }
      }

      if (deep < 2) {
        if (this.sessionsList.length) {
          const session = this.sessionsList.find(s => s.name === 'Main window');

          if (session) {
            this.selectedSession = session;
          } else {
            this.selectedSession = this.sessionsList[0];
          }
        } else {
          this.selectedSession = {};
        }
      }

      if (deep < 3) {
        const handleIds = Object.keys(this.handlesList);

        if (handleIds.length) {
          const audioBridgeHandleId = handleIds.find(handleId => {
            return this.handlesList[handleId].plugin === 'janus.plugin.audiobridge';
          });

          if (audioBridgeHandleId) {
            this.selectedHandle = this.handlesList[audioBridgeHandleId];
          } else {
            this.selectedHandle = {};
          }
        } else {
          this.selectedHandle = {};
        }
      }

      return url;
    },
  },
};
</script>

<style lang="stylus" scoped>
  @import 'styles.styl'

  .layout
    display flex
    flex-direction column
    width 100%
    min-height 100vh

    &__wrapper
      display flex
      flex 1 1 auto
      overflow-y auto

    &__col
      &--fixed
        flex 0 0 200px
        border-right 1px solid $border-color

        h4
          padding 12px

      &--content
        flex 1 1 auto
        min-width 500px
</style>
