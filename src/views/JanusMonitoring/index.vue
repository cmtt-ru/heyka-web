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
import { sortAny } from '@libs/arrays';

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

      selectedChannelId: null,
      selectedUserId: null,
      selectedSessionId: null,
      selectedHandleId: null,
    };
  },

  computed: {
    channelsList() {
      if (this.state.channels) {
        return this.state.channels
          .map(channel => channel)
          .sort(sortAny([
            {
              key: 'users',
              type: 'array-count',
              order: 'desc',
            },
            {
              key: 'name',
              type: 'string',
              order: 'asc',
            },
          ]));
      }

      return [];
    },

    usersList() {
      if (this.state.users && this.selectedChannel.users?.length) {
        return this.selectedChannel.users
          .map(user => {
            const findUser = this.getUserById(user.userId);

            if (findUser) {
              return Object.assign({}, user, {
                name: findUser.name,
              });
            }
          })
          .sort(sortAny([
            {
              key: 'name',
              type: 'string',
              order: 'asc',
            },
          ]));
      }

      return [];
    },

    sessionsList() {
      if (this.selectedUser.janusStats) {
        return this.selectedUser.janusStats
          .map(session => session)
          .sort(sortAny([
            {
              key: 'name',
              type: 'string',
              order: 'asc',
            },
          ]));
      }

      return [];
    },

    handlesList() {
      if (this.selectedSession.handles) {
        return this.selectedSession.handles
          .map(handle => handle)
          .sort(sortAny([
            {
              key: 'plugin',
              type: 'string',
              order: 'asc',
            },
          ]));
      }

      return [];
    },

    currentRoute() {
      let url = '/janus-monitoring';

      if (this.selectedChannelId) {
        url += `/c/${this.selectedChannelId}`;
      }

      if (this.selectedUserId) {
        url += `/u/${this.selectedUserId}`;
      }

      if (this.selectedSessionId) {
        url += `/s/${this.selectedSessionId}`;
      }

      if (this.selectedHandleId) {
        url += `/h/${this.selectedHandleId}`;
      }

      return url;
    },
  },

  watch: {
    $route(to, from) {
      this.parseUrl();

      const breakDepth = this.selectPath();

      if (breakDepth) {
        this.autoSelectPath(breakDepth);
        this.selectPath();
        this.replaceRoute();
        console.log('breakDepth', breakDepth);
      }
    },
  },

  async mounted() {
    await this.updateState();

    this.parseUrl();

    this.selectPath();

    // setInterval(async () => {
    //   await this.updateState();
    //   this.selectPath();
    // }, 1000);

    window.updateState = this.updateState;
    window.selectPath = this.selectPath;
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

    parseUrl() {
      const path = this.$route.params.pathMatch;
      const pathComponents = path.slice(1).split('/');
      const pathData = {};

      for (let i = 0; i < pathComponents.length; i += 2) {
        pathData[pathComponents[i]] = pathComponents[i + 1];
      }

      this.selectedChannelId = pathData.c;
      this.selectedUserId = pathData.u;
      this.selectedSessionId = pathData.s;
      this.selectedHandleId = pathData.h;

      console.log(pathData);
    },

    getUserById(userId) {
      if (this.state.users) {
        const user = this.state.users.find(u => u.id == userId);

        if (user) {
          return user;
        }
      }

      return null;
    },

    getChannelById(channelId) {
      if (this.state.channels) {
        const channel = this.state.channels.find(c => c.id == channelId);

        if (channel) {
          return channel;
        }
      }

      return null;
    },

    getUserInChannelById(userId) {
      if (this.selectedChannel && this.selectedChannel.users.length) {
        const user = this.selectedChannel.users.find(u => u.userId == userId);

        if (user) {
          return user;
        }
      }

      return null;
    },

    getSessionInUserById(sessionId) {
      if (this.sessionsList.length) {
        const session = this.sessionsList.find(s => s.id == sessionId);

        if (session) {
          return session;
        }
      }

      return null;
    },

    getHandleInSessionById(handleId) {
      if (this.handlesList.length) {
        const handle = this.handlesList.find(s => s.handle_id == handleId);

        if (handle) {
          return handle;
        }
      }

      return null;
    },

    selectPath() {
      if (this.selectedChannelId) {
        const channel = this.getChannelById(this.selectedChannelId);

        if (channel) {
          this.selectedChannel = channel;

          if (this.selectedUserId) {
            const user = this.getUserInChannelById(this.selectedUserId);

            if (user) {
              this.selectedUser = user;

              if (this.selectedSessionId) {
                const session = this.getSessionInUserById(this.selectedSessionId);

                if (session) {
                  this.selectedSession = session;

                  if (this.selectedHandleId) {
                    const handle = this.getHandleInSessionById(this.selectedHandleId);

                    if (handle) {
                      this.selectedHandle = handle;
                    } else {
                      console.log('handle not found');

                      return 3;
                    }
                  } else {
                    console.log('handle not found');

                    return 3;
                  }
                } else {
                  console.log('session not found');

                  return 2;
                }
              } else {
                console.log('session not found');

                return 2;
              }
            } else {
              console.log('user not found');

              return 1;
            }
          } else {
            console.log('user not found');

            return 1;
          }
        }
      }

      console.log('channel not found');

      return 0;
    },

    autoSelectPath(deep) {
      /**
       * Trying to select first items in all columns
       */
      if (deep <= 1) {
        if (this.usersList.length) {
          this.selectedUser = this.usersList[0];
          this.selectedUserId = this.usersList[0].userId;
        } else {
          this.selectedUser = {};
          this.selectedUserId = null;
        }
      }

      if (deep <= 2) {
        if (this.sessionsList.length) {
          const session = this.sessionsList.find(s => s.name === 'Main window');

          if (session) {
            this.selectedSession = session;
            this.selectedSessionId = session.id;
          } else {
            this.selectedSession = {};
            this.selectedSessionId = null;
          }
        } else {
          this.selectedSession = {};
          this.selectedSessionId = null;
        }
      }

      if (deep <= 3) {
        if (this.handlesList.length) {
          const audioBridgeHandle = this.handlesList.find(handle => handle.plugin === 'janus.plugin.audiobridge');

          if (audioBridgeHandle) {
            this.selectedHandle = audioBridgeHandle;
            this.selectedHandleId = audioBridgeHandle.handle_id;
          } else {
            this.selectedHandle = this.handlesList[0];
            this.selectedHandleId = this.handlesList[0].handle_id;
          }
        } else {
          this.selectedHandle = {};
          this.selectedHandleId = null;
        }
      }
    },

    pushRoute() {
      this.$router.push(this.currentRoute).catch(() => {});
    },

    replaceRoute() {
      this.$router.replace(this.currentRoute).catch(() => {});
    },

    /**
     * Channel select handler
     * @param {object} item – channel item
     * @returns {void}
     */
    async selectChannelHandler(item) {
      console.log('selected channel', item);
      this.selectedChannelId = item.id;

      this.pushRoute();
    },

    /**
     * User select handler
     * @param {object} item – user item
     * @returns {void}
     */
    async selectUserHandler(item) {
      console.log('selected user', item);
      this.selectedUserId = item.userId;

      this.pushRoute();
    },

    /**
     * Session select handler
     * @param {object} item – session item
     * @returns {void}
     */
    async selectSessionHandler(item) {
      console.log('selected session', item);
      this.selectedSessionId = item.id;

      this.pushRoute();
    },

    /**
     * Handle select handler
     * @param {object} item – handle item
     * @returns {void}
     */
    async selectHandleHandler(item) {
      console.log('selected handle', item);
      this.selectedHandleId = item.handle_id;

      this.pushRoute();
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
