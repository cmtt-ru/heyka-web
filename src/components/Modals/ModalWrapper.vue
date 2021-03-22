<template>
  <component
    :is="modal.name"
    class="modal-wrapper"
    :data="modal.data"
    @confirm="$emit('confirm')"
    @reject="$emit('reject')"
    @close="$emit('close')"
  />
</template>

<script>
export default {
  components: {
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

.modal-wrapper
  background-color var(--new-bg-04)

</style>
