<template>
  <div class="modal-wrapper">
    <div class="header">
      {{ data.header }}
    </div>
    <ui-form
      @submit="next"
    >
      <div>
        <div class="input-label">
          {{ $t('modal.common.name') }}
        </div>
        <ui-input

          v-model="name"
          required
          :minlength="2"
          enter-submit
        />
      </div>

      <div class="buttons">
        <ui-button
          :type="1"
          submit
        >
          {{ $t('techTexts.next') }}
        </ui-button>
      </div>
    </ui-form>
  </div>
</template>

<script>
import UiButton from '@components/UiButton';
import { UiForm, UiInput } from '@components/Form';

import Modal from '@sdk/classes/Modal';

export default {
  components: {
    UiButton,
    UiForm,
    UiInput,
  },

  props: {
    /**
      * Inner data
    */
    data: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      name: '',
    };
  },

  computed: {
    /**
      * RegEx with full match
      *
      * @returns {RegEx}
    */
    confirmRegex() {
      return new RegExp(`^${this.data.confirmString}$`);
    },
  },

  methods: {
    next() {
      Modal.show({
        name: 'ConfirmDelete',
        data: {
          header: this.$t('modal.deleteUser.header'),
          body: this.$tc('modal.deleteUser.body', this.name),
        },
        onClose: (state) => {
          if (state === true) {
            this.$emit('confirm');
          }
        },
      });
    },
  },

};
</script>

<style lang="stylus" scoped>
@import 'default.styl'
</style>
