<template>
  <div class="auth-page">
    <h1>Вход в Heyka</h1>

    <router-link :to="{name: 'new-auth-email'}">
      Email
    </router-link>

    <router-link :to="{name: 'new-auth-signup'}">
      Signup
    </router-link>

    <router-link :to="{name: 'new-auth-email-reset'}">
      Reset
    </router-link>
  </div>
</template>

<script>

export default {
  components: {
  },
};
</script>

<style lang="stylus" scoped>
  h1
    font-size 26px
    font-weight 700
    line-height 1.6

</style>
