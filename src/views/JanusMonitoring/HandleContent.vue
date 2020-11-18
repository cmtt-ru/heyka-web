<template>
  <div class="handle-content">
    <!--
      Layout for Audio Bridge Plugin
    -->
    <div
      v-if="data.plugin === 'janus.plugin.audiobridge'"
      class="l-flex"
    >
      <div class="handle-widget">
        <h3>Stream</h3>
        <vue-json-pretty
          :data="stream"
          :show-double-quotes="false"
        />
      </div>

      <div class="handle-widget">
        <h3>Plugin Specific</h3>
        <vue-json-pretty
          :data="pluginSpecific"
          :show-double-quotes="false"
        />

        <h3 class="l-mt-24">
          Flags
        </h3>
        <vue-json-pretty
          :data="flags"
          :show-double-quotes="false"
        />
      </div>

      <div
        class="handle-widget"
      >
        <h3>Full json</h3>
        <vue-json-pretty
          :data="data"
          :deep="0"
          :show-double-quotes="false"
        />
      </div>

      <div class="handle-widget" />
    </div>

    <!--
      Layout for Video Room Plugin
    -->
    <div v-if="data.plugin === 'janus.plugin.videoroom'">
      <div
        class="handle-widget"
      >
        <h3>Full json</h3>
        <vue-json-pretty
          :data="data"
          :show-length="true"
          :show-double-quotes="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
  components: {
    VueJsonPretty,
  },

  props: {
    /**
     * Data
     */
    data: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
    };
  },

  computed: {
    flags() {
      if (this.data.flags) {
        return this.data.flags;
      }

      return null;
    },

    pluginSpecific() {
      if (this.data.plugin_specific) {
        return {
          muted: this.data.plugin_specific.muted,
          active: this.data.plugin_specific.active,
          'pre-buffering': this.data.plugin_specific['pre-buffering'],
          'queue-out': this.data.plugin_specific['queue-out'],
          'audio-level-dBov': this.data.plugin_specific['audio-level-dBov'],
          talking: this.data.plugin_specific.talking,
          fec: this.data.plugin_specific.fec,
          started: this.data.plugin_specific.started,
          hangingup: this.data.plugin_specific.hangingup,
          destroyed: this.data.plugin_specific.destroyed,
        };
      }

      return null;
    },

    stream() {
      if (this.data.streams && this.data.streams.length) {
        if (this.data.streams.length > 1) {
          alert(`Warning! This handle have ${this.data.streams.length} streams!`);
        }

        const stream = this.data.streams[0];
        const component = stream.components[0];

        const data = {
          'nack-queue-ms': stream['nack-queue-ms'],
          rtcp_stats: stream.rtcp_stats,
          in_stats: component.in_stats,
          out_stats: component.out_stats,
        };

        return data;
      }

      return null;
    },
  },

  async mounted() {

  },

  methods: {

  },
};
</script>

<style lang="stylus" scoped>
  @import 'styles.styl'
  .handle-content
    padding 12px 12px
    overflow auto

    .handle-widget
      min-width 100px
      flex-shrink 0
      margin-right 40px
</style>
