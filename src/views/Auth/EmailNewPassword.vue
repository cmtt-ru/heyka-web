<template>
  <utility-page>
    <h1>{{ texts.title }}</h1>
    <p v-if="!success">
      {{ texts.subtitle }}
    </p>
    <p v-else>
      {{ texts.successSubtitle }}
    </p>

    <ui-form
      v-if="!success"
      class="reset-form"
      @submit="submitHandler"
    >
      <ui-input
        v-model="password"
        class="reset-form__input"
        :placeholder="texts.newPassword"
        type="password"
        required
        :minlength="8"
        :maxlength="120"
      />
      <ui-button
        :type="1"
        size="xlarge"
        class="reset-form__submit"
        submit
      >
        {{ texts.save }}
      </ui-button>
    </ui-form>

    <ui-button
      v-else
      :type="1"
      size="xlarge"
      @click="openAppHandler"
    >
      {{ texts.openApp }}
    </ui-button>

    <p
      v-if="error"
      class="l-mt-16"
    >
      {{ error }}
    </p>
  </utility-page>
</template>

<script>
import UtilityPage from '@/components/Layouts/UtilityPage';
import UiButton from '@components/UiButton';
import { UiInput, UiForm } from '@components/Form';

export default {
  components: {
    UtilityPage,
    UiButton,
    UiInput,
    UiForm,
  },

  data() {
    return {
      password: '',
      success: false,
      authLink: '',
      error: '',
    };
  },

  computed: {
    /**
     * Get needed texts from I18n-locale file
     * @returns {object}
     */
    texts() {
      return this.$t('auth.newPassword');
    },

    /**
     * JWT token
     * @returns {string}
     */
    jwt() {
      return this.$route.query.token;
    },

    /**
     * Deep link with auth link
     * @returns {string}
     */
    deepLink() {
      return `login/${this.authlink}`;
    },
  },

  async mounted() {
    const res = await this.$API.auth.checkWebToken(this.jwt);

    if (res.result === false) {
      this.$router.push({ name: 'auth' });
    }
  },

  methods: {
    openAppHandler() {
      this.$store.dispatch('launchDeepLink', this.deepLink);
    },

    async submitHandler() {
      try {
        const res = await this.$API.auth.resetPass({
          token: this.jwt,
          password: this.password,
        });

        this.authLink = res.code;
        this.success = true;
      } catch (e) {
        this.error = e.message;
      }
    },
  },
};
</script>

<style lang="stylus">
  .reset-form
    @media $desktop
      display flex

    &__input
      @media $desktop
        margin-right 16px
        width 260px !important

      @media $mobile
        width 100%
        margin-bottom 16px

      .input
        min-height 46px
        font-size 18px
        font-weight 500
        padding-left 18px
        padding-right 40px

      .input__eye
        width 24px
        height 24px

    &__submit
      flex-shrink 0

      @media $mobile
        width 100%

</style>
