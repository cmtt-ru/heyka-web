<template>
  <utility-page>
    <template>
      <h1>{{ title }}</h1>
      <!-- <p>{{ subtitle }}</p> -->

      <div
        v-if="authCode"
        class="buttons"
      >
        <router-link :to="{name: 'downloads'}">
          <ui-button
            :type="1"
            size="xlarge"
            class="buttons__download"
          >
            {{ texts.downloadApp }}
          </ui-button>
        </router-link>

        <router-link :to="{name: 'workspace-create', params: {code: authCode}}">
          <ui-button
            :type="17"
            size="xlarge"
            class="buttons__create"
          >
            {{ texts.createWorkspace }}
          </ui-button>
        </router-link>
      </div>

      <ui-button
        v-if="authCode"
        :type="9"
        size="large"
        class="l-mt-18"
        @click="openAppHandler"
      >
        {{ texts.openApp }}
      </ui-button>
    </template>
  </utility-page>
</template>

<script>
import UtilityPage from '@/components/Layouts/UtilityPage';
import UiButton from '@components/UiButton';

export default {
  components: {
    UtilityPage,
    UiButton,
  },

  data() {
    return {
      authCode: '',
    };
  },

  computed: {
    /**
     * Get needed texts from I18n-locale file
     * @returns {object}
     */
    texts() {
      return this.$t('auth.verify');
    },

    /**
     * True if this account is new and we are registering new user
     * @returns {boolean}
     */
    newUser() {
      return !!this.$route.query.newUser;
    },

    title() {
      if (this.newUser) {
        return this.texts.regSuccess;
      }

      return this.texts.authSuccess;
    },
  },

  async mounted() {
    try {
      const linkData = await this.$API.auth.link();

      await this.$store.dispatch('tryToAuthorize');

      this.authCode = linkData.code;
    } catch (err) {
      this.$router.replace({ name: 'landing' }).catch(() => {});
    }

    this.$store.dispatch('workspaces/acceptWorkspaceInvite');
  },

  methods: {
    openAppHandler() {
      this.$store.dispatch('launchDeepLink', `login/${this.authCode}`);
    },
  },
};
</script>

<style lang="stylus">
  .buttons
    &__download
      @media $desktop
        margin-right 16px

      @media $mobile
        width 100%
        margin-bottom 16px

    &__create
      @media $mobile
        width 100%

</style>
