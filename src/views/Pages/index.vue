<template>
  <div class="layout">
    <ui-header />

    <div class="layout__wrapper">
      <router-view />
    </div>
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

    &__wrapper
      display flex
      align-items center
      justify-content center
      height 100%
      flex 1
      text-align center

</style>
