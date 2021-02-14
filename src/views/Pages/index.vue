<template>
  <div class="layout">
    <ui-header />

    <router-view />
  </div>
</template>

<script>
import UiHeader from '@/components/UiHeader';

export default {
  components: {
    UiHeader,
  },

  data() {
    return {

    };
  },

  computed: {

  },

  async mounted() {

  },

  methods: {

  },
};
</script>

<style lang="stylus" scoped>
  .layout
    display flex
    flex-direction column
    width 100%
    min-height 100vh

</style>
