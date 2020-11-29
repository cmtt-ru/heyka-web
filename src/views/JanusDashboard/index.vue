<template>
  <div class="layout">
    <ui-header>
      <div class="layout__controls l-ml-auto l-mr-24">
        <input
          v-model="inputDate"
          class="layout__controls__date l-mh-24"
          type="datetime-local"
          :max="historyRange.maxDate"
          :min="historyRange.minDate"
          @keypress.enter="dateNavigateHandler(0)"
        >

        <ui-button
          hidden
          :type="1"
          size="small"
          class="l-mr-4"
          @click="dateNavigateHandler(-20)"
        >
          ←
        </ui-button>
        <ui-button
          hidden
          :type="1"
          size="small"
          @click="dateNavigateHandler(20)"
        >
          →
        </ui-button>
        <ui-switch
          v-model="autoUpdate"
          class="layout__controls__switch"
          text="Auto refresh"
        />
      </div>
    </ui-header>

    <div class="layout__wrapper">
      <div
        v-for="user in users"
        :key="user.id"
        class="widget"
      >
        <p class="widget__user-name">
          {{ user.name }}
        </p>

        <div class="widget__chart">
          <zingchart
            :data="getChartData([user.generatedStats.lostLocal, user.generatedStats.lostRemote], 'Lost Local / Remote', ['Local', 'Remote'])"
            height="100"
            width="300"
          />
        </div>

        <div class="widget__chart">
          <zingchart
            :data="getChartData([user.generatedStats.jitterLocal, user.generatedStats.jitterRemote], 'Jitter Local / Remote', ['In', 'Out'])"
            height="100"
            width="300"
          />
        </div>

        <div class="widget__chart">
          <zingchart
            :data="getChartData([user.generatedStats.rtt], 'Round Trip Time', ['RTT (ms)'])"
            height="100"
            width="300"
          />
        </div>

        <div class="widget__chart">
          <zingchart
            :data="getChartData([user.generatedStats.bitrateIn, user.generatedStats.bitrateOut], 'Bitrate In / Out', ['In', 'Out'])"
            height="100"
            width="300"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-magic-numbers, camelcase */
import UiHeader from '@/components/UiHeader';
import { UiSwitch } from '@components/Form';
import UiButton from '@components/UiButton';
import 'zingchart/es6';
import zingchartVue from 'zingchart-vue';
import sleep from 'es7-sleep';

const WORKSPACE_ID = 'auto';

// eslint-disable-next-line no-extend-native
Date.prototype.toDatetimeLocal = function toDatetimeLocal() {
  var
      date = this,
      ten = function (i) {
        return (i < 10 ? '0' : '') + i;
      },
      YYYY = date.getFullYear(),
      MM = ten(date.getMonth() + 1),
      DD = ten(date.getDate()),
      HH = ten(date.getHours()),
      II = ten(date.getMinutes()),
      SS = ten(date.getSeconds())
  ;

  return YYYY + '-' + MM + '-' + DD + 'T' +
    HH + ':' + II + ':' + SS;
};

// eslint-disable-next-line no-extend-native
Date.prototype.fromDatetimeLocal = (function (BST) {
  // BST should not be present as UTC time
  return new Date(BST).toISOString()
    .slice(0, 16) === BST
    // if it is, it needs to be removed
    ? function () {
      return new Date(
        this.getTime() +
        (this.getTimezoneOffset() * 60000)
      ).toISOString();
    }
    // otherwise can just be equivalent of toISOString
    : Date.prototype.toISOString;
}('2006-06-06T06:06'));

export default {
  components: {
    UiHeader,
    zingchart: zingchartVue,
    UiSwitch,
    UiButton,
  },

  data() {
    return {
      states: [],
      usersList: [],
      autoUpdate: false,
      autoUpdateOnFocus: false,

      currentTime: new Date(),
      selectedTime: new Date(),
      controlsLock: false,

      statesCount: 60,
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
          // name: this.states[0].body.workspaceState.users.find(wu => wu.id === u.userId)?.name,
          name: this.usersList.find(wu => wu.id === u.userId)?.name,
          janusStats: allUsers.map(users => {
            const user = users.find(uu => uu.userId === u.userId);

            if (user) {
              return user.janusStats;
            }

            return null;
          }),
        };
      });

      /** Generate some stats */
      usersWithAllStats.forEach(u => {
        const audioBridgeHandles = u.janusStats.map(sessions => {
          if (sessions) {
            const session = sessions.find(s => s.name === 'Main window');
            const audioBridgeHandle = session.handles.find(handle => handle.plugin === 'janus.plugin.audiobridge');

            if (audioBridgeHandle) {
              return audioBridgeHandle;
            }
          }

          return null;
        });

        const data = {
          lostLocal: [],
          lostRemote: [],
          bitrateIn: [],
          bitrateOut: [],
          jitterLocal: [],
          jitterRemote: [],
          rtt: [],
        };

        audioBridgeHandles.reverse().forEach(h => {
          data.lostLocal.push(h?.streams[0]?.rtcp_stats.audio.lost);
          data.lostRemote.push(h?.streams[0]?.rtcp_stats.audio['lost-by-remote']);

          data.bitrateIn.push(h?.streams[0]?.components[0].in_stats.audio_bytes_lastsec);
          data.bitrateOut.push(h?.streams[0]?.components[0].out_stats.audio_bytes_lastsec);

          data.jitterLocal.push(h?.streams[0]?.rtcp_stats.audio['jitter-local']);
          data.jitterRemote.push(h?.streams[0]?.rtcp_stats.audio['jitter-remote']);

          data.rtt.push(h?.streams[0]?.rtcp_stats.audio.rtt);
        });

        u.generatedStats = data;
      });

      return usersWithAllStats;
    },

    historyRange() {
      /* 30 minute history */
      const historyLengthMs = 1000 * 60 * 30;
      const time = this.currentTime.getTime();

      return {
        minDate: new Date(time - historyLengthMs).toDatetimeLocal(),
        maxDate: new Date(time).toDatetimeLocal(),
        value: new Date(this.selectedTime).toDatetimeLocal(),
        min: time - historyLengthMs,
        max: time,
      };
    },

    inputDate: {
      get() {
        return new Date(this.selectedTime).toDatetimeLocal();
      },
      set(value) {
        const nextDate = new Date(value).getTime();

        if (nextDate <= this.historyRange.max && nextDate >= this.historyRange.min) {
          this.selectedTime = new Date(value);
        }
      },
    },
  },

  watch: {
    async autoUpdate(value) {
      if (value) {
        this.currentTime = new Date();
        this.selectedTime = this.currentTime;
        await this.updateState(this.statesCount, true);
        this.startAutoUpdate();
      }
    },
  },

  async mounted() {
    this.parseUrl();

    window.onfocus = () => {
      if (this.autoUpdateOnFocus) {
        this.autoUpdateOnFocus = false;
        this.autoUpdate = true;
      }
    };

    window.onblur = () => {
      if (this.autoUpdate === true) {
        this.autoUpdateOnFocus = true;
        this.autoUpdate = false;
      }
    };
  },

  methods: {
    async startAutoUpdate() {
      while (this.autoUpdate) {
        await sleep(1000);

        this.currentTime = new Date();

        if (this.autoUpdate) {
          this.selectedTime = this.currentTime;
        }

        // console.time('updateState');
        await this.updateState();
        // console.timeEnd('updateState');
      }
    },

    async updateState(count = 1, clear = false) {
      console.log(this.selectedTime.toString(), count, clear);
      const states = await this.$API.admin.getWorkpsaceStateWithJanusStats(WORKSPACE_ID, this.selectedTime, count);

      states.forEach((state, i) => {
        state.body = JSON.parse(state.body);

        if (i === count - 1) {
          this.usersList = state.body.workspaceState.users;
        }

        delete state.body.undefinedJanusStats;
        delete state.body.workspaceState.workspace;
        delete state.body.workspaceState.users;
      });

      if (clear) {
        this.states = states;
      } else {
        this.states.unshift(...states);
        this.states.splice(this.statesCount);
      }
    },

    getChartData(values, title, labels = []) {
      return {
        title: title ? {
          text: title,
          'font-size': 12,
          'offset-y': -6,
        } : {},
        scaleX: {
          visible: false,
        },
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

    async dateNavigateHandler(n) {
      const nextDate = new Date(this.selectedTime).getTime() + 1000 * n;

      if (!this.controlsLock) {
        if (nextDate <= this.historyRange.max && nextDate >= this.historyRange.min) {
          this.selectedTime = new Date(nextDate);

          await this.updateState(this.statesCount, true);
        }
      }

      this.autoUpdate = false;
    },

    async parseUrl() {
      const path = this.$route.params.pathMatch;
      const pathComponents = path.slice(1).split('/');
      const pathData = {};

      for (let i = 0; i < pathComponents.length; i += 2) {
        pathData[pathComponents[i]] = pathComponents[i + 1];
      }

      if (pathData.d) {
        this.selectedTime = new Date(pathData.d);

        await this.updateState(this.statesCount, true);
      } else {
        this.autoUpdate = true;
      }
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
      overflow hidden
      margin 30px
      padding-bottom 12px
      border 1px solid rgba(0,0,0,0.2)

      &__user-name
        padding 8px 12px 6px 12px
        font-weight 500
        font-size 24px

        span
          color #949494
          font-weight 400

      &__chart
        margin-bottom 12px

    &__controls
      display flex
      align-items center

      &__range
        width 360px
        margin-left 24px

      &__switch
        width 120px
        margin-left 24px

      &__date
        border-radius 6px
        border 1px solid rgba(0,0,0,0.35)
        padding 3px 8px
        width 220px
        margin 0 8px
</style>
