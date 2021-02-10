<template>
  <div
    class="channel-item"
    :class="{'channel-item--selected': selected}"
    @click="$emit('select', item)"
  >
    <div class="channel-item__wrapper">
      <p class="channel-item__name">
        {{ item.name }}
      </p>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },

  props: {
    /**
     * Item data
     */
    item: {
      type: Object,
      default: null,
    },

    /**
     * Selected state
     */
    selected: {
      type: Boolean,
      default: false,
    },
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
  @import 'styles.styl'

  .channel-item
    border-bottom 1px solid $border-color
    cursor default

    &__wrapper
      padding 10px 12px

    &__name
      font-size 14px
      white-space nowrap
      text-overflow ellipsis
      overflow hidden

    &--selected
      background $item-active
      color #fff

</style>
