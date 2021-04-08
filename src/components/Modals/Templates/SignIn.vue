<template>
  <div class="modal-wrapper">
    <iframe
      :src="signInLink"
      frameborder="0"
    />
  </div>
</template>

<script>

// import { WEB_URL } from '@sdk/Constants';
export default {

  data() {
    return {
      WEB_URL: 'http://localhost:8080',
    };
  },

  computed: {
    signInLink() {
      return `${this.WEB_URL}/auth?darkTheme=true`;
    },
  },

};
</script>

<style lang="stylus" scoped>
@import 'default.styl'

.modal-wrapper
  padding 0
  width 520px
  height 520px
  overflow hidden

  @media $mobile
    width calc(100vw - 32px)
    height 520px

  & iframe
    width 100%
    height 100%
</style>
