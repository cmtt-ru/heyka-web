<template>
  <transition name="fade">
    <div
      v-show="visible"
      class="guest-start"
    >
      <h1>You’re about to join a video meeting</h1>
      <p class="l-mt-24">
        For others to see and hear you, your browser will request access to your cam and mic.
        You can still turn them back off at any time.
      </p>

      <p
        v-if="isSafari"
        class="safari-issue"
      >
        <span>Issues with Safari</span>
        The current version of Safari has known audio issues. Try to use other browser.
      </p>

      <p
        v-if="mediaPermissionsBlocked"
        class="safari-issue"
      >
        It seems your browser is blocked from accessing your camera and microphone.
        To continue, please allow access by clicking the camera icon in the URL bar.
      </p>

      <div class="webcam l-mt-24">
        <video
          ref="video"
          autoplay
          playsinline
          muted
        />
        <div class="webcam__loader">
          <svg-icon
            :name="mediaPermissionsBlocked ? 'video-off' : 'video'"
            size="small"
          />
        </div>
      </div>

      <ui-form @submit="joinHandler">
        <ui-input
          v-model="userName"
          placeholder="Enter your name"
          class="user-name"
          required
          enter-submit
        />

        <ui-button
          :type="1"
          class="l-mt-24"
          submit
        >
          Join channel
        </ui-button>
      </ui-form>
    </div>
  </transition>
</template>

<script>
import mediaCapturer from '@classes/mediaCapturer';
import { mapState, mapGetters } from 'vuex';
import { UiForm, UiInput } from '@components/Form';
import UiButton from '@components/UiButton';

let cameraStream = null;

const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default {
  components: {
    UiForm,
    UiInput,
    UiButton,
  },

  data() {
    let userName = '';

    try {
      userName = localStorage.getItem('heyka-guest-name') || '';
    } catch (e) {
      console.error(e);
    }

    console.log('userName', userName);

    return {
      userName,
      visible: false,
      mediaPermissionsBlocked: false,
    };
  },

  computed: {
    ...mapState('app', {
      devices: 'devices',
      selectedDevices: 'selectedDevices',
    }),

    ...mapGetters({
      selectedChannelId: 'me/getSelectedChannelId',
      myId: 'me/getMyId',
    }),

    ...mapState({
      janusOptions: 'janus',
    }),

    isSafari() {
      return IS_SAFARI;
    },
  },

  async mounted() {
    const SHOW_TIMEOUT = 500;

    setTimeout(() => {
      this.visible = true;
    }, SHOW_TIMEOUT);

    try {
      const immediate = await mediaCapturer.requestMediaPermissions();

      // if (immediate && this.userName) {
      //   await this.joinHandler();
      // } else {
      //   await this.startCameraPreview();
      // }

      if (immediate) {

      }
      await this.startCameraPreview();
    } catch (e) {
      this.mediaPermissionsBlocked = true;
    }
  },

  beforeDestroy() {
    mediaCapturer.destroyStream(cameraStream);
  },

  methods: {
    async startCameraPreview() {
      cameraStream = await mediaCapturer.getCameraStream();

      this.$refs.video.srcObject = cameraStream;
    },

    async joinHandler() {
      try {
        localStorage.setItem('heyka-guest-name', this.userName);
      } catch (e) {
        console.error(e);
      }

      await this.$API.user.editProfile({
        name: this.userName,
      });

      this.$emit('join');
    },
  },
};
</script>

<style lang="stylus">
  .guest-start
    max-width 500px
    margin 48px auto
    padding 36px 24px
    text-align center
    background #191919
    color var(--new-white)
    border-radius 12px
    box-sizing border-box

    h1
      letter-spacing -1.8px

    .webcam
      position relative
      height 0
      padding-bottom 62.5%
      border-radius 8px
      overflow hidden
      transform translate3d(0, 0, 0);

      &__loader
        position absolute
        display flex
        width 100%
        height 100%
        z-index 1
        background var(--new-black)
        align-items center
        justify-content center
        animation svgClear 500ms ease-in-out

        svg
          width 96px
          height 96px

      video
        position absolute
        display block
        width 100%
        height 100%
        z-index 2
        object-fit cover

    .user-name
      width 50%
      margin 24px auto 0 auto

      .input-wrapper
        background-color var(--new-black)

        &:hover
          background var(--new-black)

        &:focus-within
          background var(--new-black)
          border-color rgba(255,255,255,0.5)

        input
          color var(--new-white)
          outline none
          text-align center

  .safari-issue
    background rgba(255,0,0,0.28)
    border-radius 6px
    padding 8px 36px
    margin-top 20px
    border 1px solid rgba(185, 0, 0, 0.21)

    span
      font-weight bold
      display block
      font-size 16px

  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  @keyframes svgClear {
    0% {
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
