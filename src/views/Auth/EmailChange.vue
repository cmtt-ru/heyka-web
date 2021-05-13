<template>
  <utility-page>
    <h1>{{ texts.title }}</h1>
    <p v-if="!success">
      {{ texts.subtitle }}
    </p>
    <p v-else>
      {{ $tc('auth.newEmail.successSubtitle', email) }}
    </p>

    <ui-form
      v-if="!success"
      class="reset-form"
      @submit="submitHandler"
    >
      <ui-input
        v-model="email"
        class="reset-form__input"
        placeholder="example@mail.com"
        type="email"
        :backend-error="error"
        email
        enter-submit
        required
        @change.native="error=''"
      />
      <ui-button
        :type="1"
        size="xlarge"
        class="reset-form__submit"
        submit
      >
        {{ texts.change }}
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
      email: '',
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
      return this.$t('auth.newEmail');
    },

    /**
     * Auth code
     * @returns {string | (string | null)[]}
     */
    code() {
      return this.$route.params.code;
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
    try {
      await this.$API.auth.signinByLink(this.code);
    } catch (err) {
      this.$router.push({ name: 'auth' });
    }
  },

  methods: {
    openAppHandler() {
      this.$store.dispatch('launchDeepLink', this.deepLink);
    },

    async submitHandler() {
      try {
        await this.$API.user.editProfile({ email: this.email });

        this.success = true;
      } catch (err) {
        if (err.response.data.message) {
          this.error = err.response.data.message;
          // await this.$store.dispatch('app/addNotification', {
          //   data: {
          //     text: err.response.data.message,
          //   },
          // });
        }
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
