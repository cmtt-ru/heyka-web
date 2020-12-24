<template>
  <div class="auth-page">
    <h1>Вход в Heyka</h1>

    <div class="l-mt-18">
      <ui-button
        :type="3"
        wide
        class="l-mb-12"
        icon="slack"
        @click="socialHandler('slack')"
      >
        Slack
      </ui-button>

      <ui-button
        :type="3"
        wide
        class="l-mb-12"
        icon="google"
        @click="socialHandler('google')"
      >
        Google
      </ui-button>

      <ui-button
        :type="3"
        wide
        class="l-mb-12"
        icon="facebook"
        @click="socialHandler('facebook')"
      >
        Facebook
      </ui-button>

      <router-link :to="{name: 'new-auth-email'}">
        <ui-button
          :type="3"
          wide
          class="l-mb-12"
          icon="mail"
        >
          Email
        </ui-button>
      </router-link>
    </div>

    <!--    <router-link :to="{name: 'new-auth-signup'}">-->
    <!--      Signup-->
    <!--    </router-link>-->

    <!--    <router-link :to="{name: 'new-auth-email-reset'}">-->
    <!--      Reset-->
    <!--    </router-link>-->
  </div>
</template>

<script>

import UiButton from '@components/UiButton';

export default {
  components: {
    UiButton,
  },

  methods: {
    socialHandler(social) {
      console.log('Social loing -->', social);
    },
  },
};
</script>

<style lang="stylus" scoped>
  h1
    font-size 26px
    font-weight 700
    line-height 1.6

</style>
