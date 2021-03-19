<template>
  <div
    v-if="modalsAmount"
    role="dialog"
    aria-modal="true"
    class="modal"
  >
    <div
      class="modal__backdrop"
      @click="close"
    />
    <modal-wrapper
      class="modal-wrapper"
      :modal="lastModal"
      @confirm="$emit('confirm')"
      @reject="$emit('reject')"
      @close="$emit('close')"
    />
  </div>
</template>

<script>
import ModalWrapper from './ModalWrapper';

import Modal from '@sdk/classes/Modal';

export default {
  components: {
    ModalWrapper,
  },

  data() {
    return {
      scrollPosition: null,
      modalVisible: false,
    };
  },

  computed: {

    /**
     * Get all modals from store
     * @returns {array}
    */
    modals() {
      return this.$store.state.app.modals;
    },

    /**
     * Get number of modals from store
     * @returns {array}
    */
    modalsAmount() {
      return this.modals.length;
    },

    /**
     * Last modal window from store
     * @returns {array}
    */
    lastModal() {
      if (this.modalsAmount) {
        return this.modals[this.modalsAmount - 1];
      }

      return null;
    },
  },

  watch: {
    modalsAmount(val) {
      if (val === 0) {
        this.modalVisible = false;
      } else {
        this.modalVisible = true;
      }
    },
  },

  mounted() {
    Modal.setModalComponent(this);

    const close = (e) => {
      const ESC = 27;

      if (e.keyCode !== ESC) {
        return;
      }
      this.close();
    };

    // Close the modal when the
    // user presses the ESC key.
    document.addEventListener('keyup', close);
    // Activate the modal when the component is mounted.
    this.activate();
  },

  destroyed() {
    document.removeEventListener('keyup', close);
    this.deactivate();
  },

  methods: {
    activate() {
      this.disableScrolling();
    },

    async deactivate() {
      this.enableScrolling();
    },

    // Disable scrolling on all devices (including iOS).
    disableScrolling() {
      this.scrollPosition = window.pageYOffset;

      const body = document.querySelector('body');

      body.style.overflowY = 'scroll';
      body.style.position = 'fixed';
      body.style.top = `-${this.scrollPosition}px`;
      body.style.width = '100%';
    },

    enableScrolling() {
      const body = document.querySelector('body');

      body.style.removeProperty('overflowY');
      body.style.removeProperty('position');
      body.style.removeProperty('top');
      body.style.removeProperty('width');

      window.scrollTo({
        top: this.scrollPosition,
        behavior: 'instant',
      });
    },

    close() {
      this.$store.dispatch('app/removeModal');
    },

  },

};
</script>

<style lang="stylus" scoped>
.modal
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  display flex
  justify-content center
  align-items center
  z-index 999

.modal__backdrop
  position absolute
  width 100%
  height 100%
  background-color rgba(0, 0, 0, 0.28)

</style>
