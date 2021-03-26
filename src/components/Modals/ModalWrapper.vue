<template>
  <div class="modal-wrapper-outer">
    <component
      :is="modal.name"

      :data="modal.data"
      @confirm="$emit('confirm', $event)"
      @reject="$emit('reject')"
      @close="$emit('close')"
    />
    <ui-button
      :type="7"
      icon="close"
      class="modal-wrapper-outer__close"
      @click="$emit('reject')"
    />
  </div>
</template>

<script>
import UiButton from '@components/UiButton';

export default {
  components: {
    UiButton,
    ConfirmDelete: () => import(/* webpackChunkName: "modals" */ './Templates/ConfirmDelete'),
    NewGroupName: () => import(/* webpackChunkName: "modals" */ './Templates/NewGroupName'),
    NewGroupUsers: () => import(/* webpackChunkName: "modals" */ './Templates/NewGroupUsers'),
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

};
</script>

<style lang="stylus" scoped>

.modal-wrapper-outer
  background-color var(--new-bg-04)
  position relative
  border-radius 10px

  &__close
    position absolute
    top 20px
    right 20px

    @media $mobile
      top 13px
      right 16px

</style>
