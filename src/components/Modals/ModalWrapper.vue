<template>
  <transition name="modal">
    <component
      :is="modal.name"
      class="modal-wrapper"
      :data="modal.data"
      @confirm="$emit('confirm')"
      @reject="$emit('reject')"
      @close="$emit('close')"
    />
  </transition>
</template>

<script>
export default {
  components: {
    DeleteUser: () => import(/* webpackChunkName: "modals" */ './Templates/DeleteUser'),
  },
  props: {
    /**
      * All modal data
    */
    modal: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      scrollPosition: null,
    };
  },

  mounted() {
    console.log(this.modal);
  },

  beforeDestroy() {
    //
  },

  methods: {

  },

};
</script>

<style lang="stylus" scoped>
$ANIM = 330ms
$ANIM_DELAY = 200ms

.modal-wrapper
  background-color white
  padding 16px
  z-index 1000

.modal-enter
  opacity 0
  transform translateX(200px)
  margin-bottom var(--offset)

.modal-enter-to
  pointer-events none
  margin-bottom 12px
  transition opacity $ANIM ease $ANIM_DELAY, margin-bottom $ANIM ease, transform $ANIM ease $ANIM_DELAY

.modal-leave
  opacity 0
  margin-bottom 12px

.modal-leave-to
  opacity 0
  margin-bottom var(--offset)
  transform translateY(var(--offset))
  transition opacity $ANIM ease, margin-bottom $ANIM ease, transform $ANIM ease
</style>
