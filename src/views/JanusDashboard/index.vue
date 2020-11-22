<template>
  <div class="layout">
    <ui-header />

    <div class="layout__wrapper">
      <div
        v-for="user in users"
        :key="user.id"
        class="widget"
      >
        <p class="widget__user-name">
          {{ user.name }}
        </p>

        <zingchart
          :data="getChartData([user.generatedStats.lost, user.generatedStats.lostByRemote], 'Lost local / remote', ['lost', 'lost by remote'])"
          height="100"
          width="100%"
          force-render
        />

        <zingchart
          :data="getChartData([user.generatedStats.bitrateIn, user.generatedStats.bitrateOut], 'Bitrate In / Out', ['In', 'Out'])"
          height="100"
          width="100%"
          force-render
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-magic-numbers, camelcase */
import UiHeader from '@/components/UiHeader';
import 'zingchart/es6';
import zingchartVue from 'zingchart-vue';

// import { sortAny } from '@libs/arrays';

const WORKSPACE_ID = 'auto';

export default {
  components: {
    UiHeader,
    zingchart: zingchartVue,
  },

  data() {
    return {
      states: [],
    };
  },

  computed: {
    users() {
      /** Collect array of users */
      const allUsers = this.states.map(state => {
        return state.body.workspaceState.channels
          .filter(c => c.users.length)
          .reduce((prev, current) => {
            return prev.concat(current.users.map(u => {
              return {
                ...u,
                channelId: current.id,
                channelName: current.name,
              };
            }));
          }, []);
      });

      if (allUsers.length === 0) {
        return [];
      }

      /** User list with janus stats */
      const usersWithAllStats = allUsers[0].map(u => {
        return {
          channelId: u.channelId,
          channelName: u.channelName,
          id: u.userId,
          name: this.states[0].body.workspaceState.users.find(wu => wu.id === u.userId)?.name,
          janusStats: allUsers.map(users => {
            const user = users.find(uu => uu.userId === u.userId);

            if (user) {
              return user.janusStats;
            }

            return {};
          }),
        };
      });

      /** Generate some stats */
      usersWithAllStats.forEach(u => {
        const audioBridgeHandles = u.janusStats.map(sessions => {
          const session = sessions.find(s => s.name === 'Main window');
          const audioBridgeHandle = session.handles.find(handle => handle.plugin === 'janus.plugin.audiobridge');

          if (audioBridgeHandle) {
            return audioBridgeHandle;
          }

          return null;
        });

        const data = {
          lost: [],
          lostByRemote: [],
          bitrateIn: [],
          bitrateOut: [],
        };

        audioBridgeHandles.reverse().forEach(h => {
          data.lost.push(h.streams[0].rtcp_stats.audio.lost);
          data.lostByRemote.push(h.streams[0].rtcp_stats.audio['lost-by-remote']);
          data.bitrateIn.push(h.streams[0].components[0].in_stats.audio_bytes_lastsec);
          data.bitrateOut.push(h.streams[0].components[0].out_stats.audio_bytes_lastsec);
        });

        u.generatedStats = data;
      });

      return usersWithAllStats;
    },
  },

  async mounted() {
    await this.updateState();

    setInterval(async () => {
      // await this.updateState();
    }, 1000);
  },

  methods: {
    async updateState() {
      const now = new Date();

      const states = await this.$API.admin.getWorkpsaceStateWithJanusStats(WORKSPACE_ID, now, 60);

      this.states = states.map(state => {
        return {
          ...state,
          body: JSON.parse(state.body),
        };
      });
    },

    getUserStats(userId) {
      const audioBridgeHandles = this.users
        .find(u => u.id === userId)
        .janusStats.map(sessions => {
          const session = sessions.find(s => s.name === 'Main window');
          const audioBridgeHandle = session.handles.find(handle => handle.plugin === 'janus.plugin.audiobridge');

          if (audioBridgeHandle) {
            return audioBridgeHandle;
          }

          return null;
        });

      const data = {
        lost: [],
        lostByRemote: [],
        bitrateIn: [],
        bitrateOut: [],
      };

      audioBridgeHandles.reverse().forEach(h => {
        data.lost.push(h.streams[0].rtcp_stats.audio.lost);
        data.lostByRemote.push(h.streams[0].rtcp_stats.audio['lost-by-remote']);
        data.bitrateIn.push(h.streams[0].components[0].in_stats.audio_bytes_lastsec);
        data.bitrateOut.push(h.streams[0].components[0].out_stats.audio_bytes_lastsec);
      });

      console.log('audioBridgeHandles', data);

      return {
        lost: this.getChartData([data.lost, data.lostByRemote]),
        bitrateIn: this.getChartData(data.bitrateIn),
        bitrateOut: this.getChartData(data.bitrateOut),
      };
    },

    getChartData(values, title, labels = []) {
      return {
        // legend: {
        //   layout: '1x2',
        // },
        title: title ? {
          text: title,
          'font-size': 12,
          'offset-y': -6,
        } : {},
        plot: {
          tooltip: {
            text: '%t: %vt',
            // visible: false,
          },
          marker: {
            visible: false,
          },
        },
        plotarea: {
          margin: 'dynamic',
        },
        type: 'line',
        series: values.map((v, i) => {
          return {
            values: v,
            text: labels ? labels[i] : undefined,
          };
        }),
      };
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

    &__wrapper
      display flex
      flex-wrap wrap
      justify-content space-around

    .widget
      width 300px
      border-radius 8px
      box-shadow var(--new-shadow-03)
      overflow hidden
      margin 30px
      padding-bottom 12px

      &__user-name
        padding 8px 12px 6px 12px
        font-weight 500
        font-size 24px

        span
          color #949494
          font-weight 400

      &__label
        padding 6px 12px 0 12px
</style>
