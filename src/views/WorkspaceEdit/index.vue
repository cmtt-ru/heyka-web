<template>
  <utility-page>
    <!-- Create state -->
    <template v-if="!finish">
      <h1>{{ texts.title }}</h1>
      <ui-form
        @submit="createHandler"
      >
        <div class="workspace-create-form l-mt-24">
          <ui-image
            :image="avatar"
            :size="76"
            @input="setNewAvatar"
          />

          <ui-input
            v-model="name"
            required
            enter-submit
            :minlength="3"
            class="l-ml-24"
            :placeholder="texts.namePlaceHolder"
          />
        </div>

        <ui-button
          :type="1"
          wide
          class="l-mt-24"
          size="xlarge"
          submit
        >
          {{ texts.createButton }}
        </ui-button>
      </ui-form>
    </template>

    <!-- Finish state -->
    <template v-if="finish">
      <h1>{{ name }} {{ texts.finishTitle }}</h1>
      <p>{{ texts.finishSubtitle }}</p>

      <ui-button
        :type="1"
        size="xlarge"
        @click="openAppHandler"
      >
        {{ texts.openApp }}
      </ui-button>

      <div
        class="workspace-create-link-wrapper l-ml-16"
        :class="{'workspace-create-link-wrapper--copied': linkCopied}"
      >
        <ui-button
          :type="1"
          class="link-copy"
          size="xlarge"
          @click="copyLinkHandler"
        >
          {{ texts.copy }}
        </ui-button>

        <ui-button
          v-show="linkCopied"
          :type="5"
          class="link-copied"
          size="xlarge"
          @click="copyLinkHandler"
        >
          {{ texts.copied }}
        </ui-button>
      </div>
    </template>
  </utility-page>
</template>

<script>
import UtilityPage from '@/components/Layouts/UtilityPage';
import UiButton from '@components/UiButton';
import { UiForm, UiInput, UiImage } from '@components/Form';

export default {
  components: {
    UtilityPage,
    UiButton,
    UiForm,
    UiInput,
    UiImage,
  },

  data() {
    return {
      name: '',
      avatar: '',
      finish: false,
      linkCopied: false,
      newWorkspace: null,
    };
  },

  computed: {
    /**
     * Auth code from route
     * @returns {string}
     */
    authCode() {
      return this.$route.params.code;
    },

    /**
     * Get needed texts from I18n-locale file
     * @returns {object}
     */
    texts() {
      return this.$t('workspace.create');
    },
  },

  async mounted() {
    await this.authorize();
  },

  methods: {
    /**
     * Authorization
     * @returns {Promise<date>}
     */
    async authorize() {
      if (this.authCode) {
        await this.$API.auth.signinByLink(this.authCode);
        await this.$store.dispatch('tryToAuthorize');
        // await this.$router.replace('/ws/create');
      }
    },

    /**
     * Update avatar with mew image file id
     * @param {string} fileId - new image file id from uploader
     * @returns {void}
     */
    setNewAvatar(fileId) {
      this.avatar = fileId;
    },

    /**
     * Create workspace handler
     * @returns {Promise<void>}
     */
    async createHandler() {
      if (!this.name || !this.avatar) {
        const notification = {
          data: {
            text: this.texts.emptyFields,
          },
        };

        await this.$store.dispatch('app/addNotification', notification);

        return;
      }

      // eslint-disable-next-line no-magic-numbers
      if (this.name.length > 100) {
        const notification = {
          data: {
            text: this.texts.largeName,
          },
        };

        await this.$store.dispatch('app/addNotification', notification);

        return;
      }

      try {
        const { workspace } = await this.$API.workspace.create({
          avatarFileId: this.avatar,
          name: this.name,
        });

        this.newWorkspace = workspace;

        this.finish = true;
      } catch (e) {
        console.error(e);
      }
    },

    /**
     * Open Heyka with specific workspace
     * @returns {void}
     */
    openAppHandler() {
      this.$store.dispatch('launchDeepLink', `workspace/${this.newWorkspace.id}`);
    },

    /**
     * Copy invite link handler
     * @returns {Promise<void>}
     */
    async copyLinkHandler() {
      try {
        const codeData = await this.$API.workspace.inviteByCode(this.newWorkspace.id);

        const link = `${document.location.origin}/auth?invite=${codeData.code}`;

        navigator.clipboard.writeText(link);
        this.linkCopied = true;
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style lang="stylus">
  .workspace-create-form
    display flex
    align-items center

  .workspace-create-link-wrapper
    display inline-block
    position relative

    &--copied
      .link-copy
        visibility hidden

    .link-copied
      position absolute
      left 0
      width 100%

</style>
