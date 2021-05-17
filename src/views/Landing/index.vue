<template>
  <div class="page">
    <div class="page__inner">
      <div class="page__header">
        <div class="controls">
          <div
            id="burger-button"
            class="burger mobile-element"
            @click="menuClickHandler"
          >
            <svg-icon
              :name="menuIcon"
              width="24"
              height="24"
            />
          </div>
          <svg-icon
            name="logo-full"
            width="105"
            height="32"
          />
        </div>

        <div class="controls desktop-element">
          <div
            v-popover.click="{name: 'Downloads', options: {modifiers:[{name: 'offset',
                                                                       options: {
                                                                         offset: [0, 14],
                                                                       },}]}}"
            class="controls__downloads"
          >
            {{ texts.downloads }}
            <svg-icon
              class="arrow"
              name="arrow-down"
              width="16"
              height="16"
            />
          </div>
          <div
            v-popover.click="{name: 'Language', options: {modifiers:[{name: 'offset',
                                                                      options: {
                                                                        offset: [0, 14],
                                                                      },}]}}"
            class="controls__language"
          >
            <svg-icon
              name="globe"
              width="16"
              height="16"
            />
            {{ languages[language] }}
            <svg-icon
              class="arrow"
              name="arrow-down"
              width="16"
              height="16"
            />
          </div>
          <ui-button
            class="controls__signIn"
            :type="3"
            size="large"
            @click="signIn"
          >
            {{ texts.signIn }}
          </ui-button>
        </div>

        <ui-button
          class="controls__signIn mobile-element"
          :type="3"
          size="large"
        >
          {{ texts.getApp }}
        </ui-button>
      </div>

      <div class="bottom-info mobile-element">
        <div class="bottom-info__inner">
          <ui-form
            v-if="!emailSent"
            class="email-form"
            @submit="sendEmail"
          >
            <ui-input
              v-model="email"
              class="email-form__input"
              :placeholder="texts.mailPlaceholder"
              email
              required
            />
            <ui-button
              :type="1"
              size="large"
              class="email-form__submit"
              submit
            >
              <span class="email-form__submit--long">{{ texts.submit }}</span>
              <span class="email-form__submit--short">
                <svg-icon
                  name="arrow-down"
                  width="16"
                  height="16"
                />
              </span>
            </ui-button>
          </ui-form>
          <div
            v-else
            class="email-result"
          >
            {{ texts.emailSent }}
          </div>
          <div class="extra-info">
            <span class="extra-info--strong">{{ $tc('landing.peopleAmount',regAmount ) }} </span>
            <span>{{ texts.waitingListText }}</span>
            <br>
            <span>{{ texts.betaBonus }}</span>
          </div>
        </div>
      </div>

      <div class="app-text">
        <div class="app-text__header">
          {{ texts.info[0].header }}
        </div>
        <div class="app-text__content">
          {{ texts.info[0].desc }}
        </div>
      </div>
      <img
        id="img1"
        src="./assets/img0.png"
        alt=""
        class="app-image"
      >

      <div
        class="app-text app-text--fading"
      >
        <div class="app-text__header">
          {{ texts.info[1].header }}
        </div>
        <div class="app-text__content">
          {{ texts.info[1].desc }}
        </div>
      </div>
      <img
        src="./assets/img1.png"
        alt=""
        class="app-image app-image--fading"
      >

      <div
        class="app-text app-text--fading"
      >
        <div class="app-text__header">
          {{ texts.info[2].header }}
        </div>
        <div class="app-text__content">
          {{ texts.info[2].desc }}
        </div>
      </div>
      <img
        src="./assets/img2.png"
        alt=""
        class="app-image app-image--fading"
      >

      <div
        class="app-text app-text--fading"
      >
        <div class="app-text__header">
          {{ texts.info[3].header }}
        </div>
        <div class="app-text__content">
          {{ texts.info[3].desc }}
        </div>
      </div>
      <img
        src="./assets/img3.png"
        alt=""
        class="app-image app-image--fading"
      >

      <div
        class="app-text app-text--fading"
      >
        <div class="app-text__header">
          {{ texts.info[4].header }}
        </div>
        <div class="app-text__content">
          {{ texts.info[4].desc }}
        </div>
      </div>
      <img
        src="./assets/img4.png"
        alt=""
        class="app-image app-image--fading"
      >
    </div>

    <div class="bottom-info">
      <div class="bottom-info__inner">
        <ui-form
          v-if="!emailSent"
          class="email-form"
          @submit="sendEmail"
        >
          <ui-input
            v-model="email"
            class="email-form__input"
            :placeholder="texts.mailPlaceholder"
            email
            required
          />
          <ui-button
            :type="1"
            size="large"
            class="email-form__submit"
            submit
          >
            <span class="email-form__submit--long">{{ texts.submit }}</span>
            <span class="email-form__submit--short">
              <svg-icon
                name="arrow-down"
                width="16"
                height="16"
              />
            </span>
          </ui-button>
        </ui-form>
        <div
          v-else
          class="email-result"
        >
          {{ texts.emailSent }}
        </div>
        <div class="extra-info">
          <span class="extra-info--strong">{{ $tc('landing.peopleAmount',regAmount ) }} </span>
          <span>{{ texts.waitingListText }}</span>
          <br>
          <span>{{ texts.betaBonus }}</span>
        </div>

        <div class="bottom-links desktop-element">
          <a :href="WEB_URL+'/terms-conditions'">{{ texts.terms }}</a>
          <a :href="WEB_URL+'/privacy-policy'">{{ texts.privacy }}</a>
        </div>
      </div>
    </div>

    <div class="top-grad desktop-element" />
    <div class="bottom-grad desktop-element" />

    <svg-icon
      id="more-arrow"
      class="more-arrow desktop-element"
      name="scroll-down"
      width="60"
      height="137"
      @click.native="scrollPage"
    />

    <div
      id="menu"
      class="menu mobile-element"
    >
      <div
        class="menu__item"
        @click="signIn"
      >
        {{ texts.signIn }}
      </div>
      <div
        v-popover.click="{name: 'Language'}"
        class="menu__item"
      >
        {{ languages[language] }}
        <svg-icon
          class="arrow"
          name="arrow-down"
          width="16"
          height="16"
        />
      </div>
      <a
        class="menu__item menu__item--secondary"
        :href="WEB_URL+'/terms-conditions'"
      >{{ texts.terms }}</a>
      <a
        class="menu__item menu__item--secondary"
        :href="WEB_URL+'/privacy-policy'"
      >{{ texts.privacy }}</a>
    </div>
  </div>
</template>

<script>

import { UiInput, UiForm } from '@components/Form';
import UiButton from '@components/UiButton';
import { WEB_URL } from '@sdk/Constants';

import Modal from '@sdk/classes/Modal';

let observer;

const STICKED_CLASS = 'ui-sticked';

export default {
  components: {
    UiButton,
    UiInput,
    UiForm,
  },
  data() {
    return {
      WEB_URL,
      regAmount: 0,
      email: '',
      emailSent: false,
      menuOpened: false,
      showSignIn: false,
      languages: {
        en: 'English',
        ru: 'Русский',
      },
    };
  },

  computed: {
    language() {
      return this.$store.state.app.language;
    },
    /**
     * Get needed texts from I18n-locale file
     * @returns {object}
     */
    texts() {
      return this.$t('landing');
    },

    menuIcon() {
      if (this.menuOpened) {
        return 'close';
      } else {
        return 'burger';
      }
    },

    macLink() {
      return `https://storage.yandexcloud.net/heyka-beta-bin/download/Heyka-${VERSION}.dmg`;
    },
    winLink() {
      return `https://storage.yandexcloud.net/heyka-beta-bin/download/Heyka%20Setup%20${VERSION}.exe`;
    },
    linuxLink() {
      return `https://storage.yandexcloud.net/heyka-beta-bin/download/heyka_${VERSION}_amd64.deb`;
    },
  },

  async mounted() {
    this.$themes.manualSetTheme('dark');

    window.addEventListener('scroll', this.onScroll);

    this.regAmount = await this.$API.app.subscribeCount();

    window.addEventListener('storage', this.closeSignInModal, false);

    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        this.elementCheck(entry);
      }
    }, {
      threshold: 1,
      rootMargin: `100% 0px 25%`,
    });

    for (const el of document.getElementsByClassName('app-image--fading')) {
      el.previousSibling.classList.add('app-text--observable');
      observer.observe(el);
    }
  },

  beforeDestroy() {
    this.$themes.manualSetTheme('light');
    window.removeEventListener('close-auth', this.closeSignInModal);
  },

  methods: {
    elementCheck(el) {
      if (el.intersectionRatio === 1) {
        el.target.previousSibling.classList.add(STICKED_CLASS);
      } else {
        el.target.previousSibling.classList.remove(STICKED_CLASS);
      }
    },

    menuClickHandler() {
      this.menuOpened = !this.menuOpened;
      document.getElementById('menu').classList.toggle('menu--opened');
      document.getElementById('burger-button').classList.toggle('burger--opened');
    },

    scrollPage() {
      window.scrollBy(0, document.getElementById('img1').offsetHeight);
      window.removeEventListener('scroll', this.onScroll);
      document.getElementById('more-arrow').classList.add('more-arrow--hidden');
    },

    onScroll() {
      window.removeEventListener('scroll', this.onScroll);
      document.getElementById('more-arrow').classList.add('more-arrow--hidden');
    },

    async sendEmail() {
      await this.$API.app.subscribe(this.email);
      this.emailSent = true;
      this.regAmount = await this.$API.app.subscribeCount();
    },

    signIn() {
      Modal.show({
        name: 'SignIn',
        onClose: () => {},
      });
    },

    closeSignInModal(data) {
      if (data.key !== 'authSuccess' && data.newValue !== 'true') {
        return;
      }

      this.$store.dispatch('app/removeModal');
      window.localStorage.setItem('authSuccess', 'false');
      this.$router.push({ name: 'auth-success' }).catch(() => {});
    },
  },
};
</script>

<style lang="stylus" scoped>
@font-face
  font-family 'Inter Black'
  font-style  normal
  font-weight bold
  font-display swap
  src url("./assets/Inter-Black.woff2?v=3.12") format("woff2")

.page
  background-color #000000
  color #DFE0E3
  font-size 18px

  &__inner
    max-width 1200px
    margin 0 auto

  &__header
    position sticky
    top 0
    left 0
    width 100%
    box-sizing border-box
    background-color #000000
    height 80px
    margin-bottom calc(50vh - 340px)
    display flex
    flex-direction row
    align-items center
    justify-content space-between
    z-index 1

  .controls
    display flex
    flex-direction row
    align-items center
    line-height 28px
    font-weight 500

    &__downloads
      margin-right 28px
      cursor pointer

      & .arrow
        opacity 0.5
        transform translateY(2px)

    &__language
      margin-right 24px
      cursor pointer

      & .icon
        transform translateY(2px)

      & .arrow
        opacity 0.5

    &__signIn
      font-weight 500
      font-size 18px
      color #FFFFFF
      border none
      background-color rgba(255, 255, 255, 0.2)

.app-text
  position sticky
  display inline-block
  top calc(50vh - 260px)
  width 486px
  font-size 32px
  line-height 44px
  background-color #000000
  margin-right 194px

  vertical-align top

  &--fading
    opacity 0
    transition opacity 0.2s ease-out

  &--observable
    margin-top -10000px

  &:before
    content ''
    position absolute
    width 100%
    height 150px
    background linear-gradient(rgba(0,0,0,0), #000000);
    bottom 100%
    left 0

  &.ui-sticked
    opacity 1

  &__header
    font-family 'Inter Black'
    font-weight 900
    font-size 48px
    line-height 54px
    padding-bottom 25px

  &__content
    height 220px
    color #C2C2C2

.app-image
  display inline-block
  width 520px
  height 520px
  flex-shrink 0
  padding-bottom calc(50vh - 260px)
  vertical-align top

  &__quarter
    display inline-block
    background-color #171717
    color white
    padding 32px
    font-size 24px
    line-height 32px
    box-sizing border-box
    border-radius 10px
    width calc(50% - 10px)
    height calc(50% - 10px)
    position relative
    cursor pointer

    &:hover
      transform translateY(-4px)

    &:nth-child(odd)
      margin-right 20px

    &:nth-child(-n+2)
      margin-bottom 20px

    &__label
      position absolute
      bottom 32px

.bottom-info
  background-color black
  position fixed
  bottom 0
  left 0
  width 50%
  height calc(50vh - 60px)

  &:before
    content ''
    position absolute
    width 100%
    height 10px
    background linear-gradient(rgba(0,0,0,0), #000000);
    bottom 100%
    left 0

  &__inner
    width 486px
    margin 40px 116px 0 auto

.email-form
  position relative

  &__input
    height 60px

  &__submit
    position absolute
    right 4px
    top 5px
    height 52px
    border-radius 12px
    font-size 24px
    font-weight normal
    padding 1px 20px 0

    &--short
      display none

      & .icon
        transform rotate(-90deg)

.email-result
  height 60px
  color var(--new-signal-02)
  display flex
  flex-direction row
  align-items center
  font-size 32px
  line-height 46px

/deep/ .input-wrapper
  border-radius 14px

/deep/ .input
  padding-right 194px
  padding-left 20px
  height 60px
  min-height 60px
  box-sizing border-box
  background-color rgba(255, 255, 255, 0.1)
  border-radius 14px
  font-size 24px
  padding-top 1px
  background-color #191919

  &:hover
    background-color #1F1F1F

  &:focus
    background-color #1F1F1F

/deep/ .ui-error
  border 1px solid transparent

  & input
    background-color rgba(255, 121, 121, 0.21)

/deep/ .error-text
  color var(--new-signal-03-1)

.extra-info
  font-size 16px
  line-height 22px
  color #595A5B
  margin-top 48px

  &--strong
    color #FFFFFF

.bottom-links
  font-size 18px
  opacity 0.5
  position absolute
  bottom 24px

  & a
    color #DFE0E3
    margin-right 24px
    display inline-block

.top-grad
  background linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0));
  position fixed
  pointer-events none
  top 80px
  right 0
  width calc(50% - 50px)
  height 70px

.bottom-grad
  background linear-gradient(rgba(0,0,0,0), #000000);
  position fixed
  pointer-events none
  bottom 0
  right 0
  width calc(50% - 50px)
  height 150px

.more-arrow
  position fixed
  bottom 0
  left 0
  right 0
  margin 0 auto
  opacity 1
  transition opacity 0.2s ease-out

  &--hidden
    opacity 0
    pointer-events none

.mobile-element
  display none

@media screen and (max-height: 800px), screen and (max-width: 1230px)
  .page

    &__header
      margin-bottom calc(50vh - 260px)

    &__inner
      width 944px

  .app-image
    width 360px
    height 360px
    padding-bottom calc(50vh - 180px)

    &__quarter
      padding 24px
      font-size 16px
      line-height 24px
      border-radius 8px

      &__label
        bottom 24px

  .app-text
    top calc(50vh - 180px)
    font-size 28px
    line-height 38px
    margin-right 98px

    &__header
      font-size 44px
      line-height 52px

  .bottom-info
    height calc(50vh - 60px)
    width calc(50% + 12px)

    &__inner
      margin 30px 0 0 auto

    .bottom-grad
      height 100px

@media screen and (max-width: 1024px), screen and (max-height: 720px)
  .page

    &__header
      margin-bottom calc(50vh - 240px)

    &__inner
       width calc(100vw - 80px)

  .app-image
    width 360px
    height 360px
    padding-bottom calc(50vh - 180px)

    &__quarter
      padding 16px
      font-size 16px
      line-height 24px
      border-radius 6px

      &__label
        bottom 16px

  .app-text
    top calc(50vh - 160px)
    width 350px
    font-size 23px
    line-height 33px
    margin-right calc(100vw - 790px)

    &__header
      font-size 38px
      line-height 52px

  .bottom-info
    height calc(50vh - 110px)
    width 50%

    &__inner
      width 294px
      margin 49px auto 0 40px

  .email-form

      &__input
        height 40px

      &__submit
        right 4px
        top 5px
        height 32px
        border-radius 6px
        font-size 16px
        padding 1px 12px 0

        &--short
          display flex

        &--long
          display none

  .email-result
    height 40px
    font-size 16px
    line-height 22px

  /deep/ .input-wrapper
    border-radius 10px

  /deep/ .input
    padding-right 76px
    padding-left 12px
    height 40px
    min-height 40px
    border-radius 10px
    font-size 16px

  .extra-info
    margin-top 32px

  .top-grad
    width 50%
    height 150px

  .bottom-grad
    width 50%
    height 100px

@media  screen and (max-height: 720px)

  .page__inner
    max-width 800px

  .app-text
    margin-right 90px

  .bottom-info__inner
    margin 49px 110px 0 auto

@media screen and (max-width: 800px), screen and (max-height: 700px)

  .app-image
    width 320px
    height 320px
    padding-bottom calc(50vh - 160px)

  .app-text
    width 294px
    font-size 20px
    line-height 28px
    margin-right calc(100vw - 694px)

    &__header
      font-size 32px
      line-height 52px

  .bottom-info
    height calc(50vh - 70px)
    width 50%

@media  screen and (max-height: 700px)

  .page__inner
    max-width 770px

  .app-text
    margin-right 155px

  .bottom-info__inner
    margin 49px 95px 0 auto

@media screen and (max-width: 720px)

  .mobile-element
    display initial

  .desktop-element
    display none !important

  .page .controls__signIn
    font-size 14px
    height 32px
    display flex

  .page__inner
    max-width 520px
    width calc(100vw - 48px)
    padding-bottom 0

  .page__header
    margin-bottom 24px

  .burger
    margin-right 12px
    display flex
    flex-direction row
    align-items center
    transform rotate(0deg)
    transition transform 0.2s ease-out

    &--opened
      transform rotate(90deg)

  .app-image
    width 100%
    height calc(100vw - 48px)
    max-height 520px
    padding-bottom 32px

  .app-text
    position initial
    font-size 16px
    line-height  22px
    margin 0 auto 16px
    width auto

    &--fading
      opacity 1

    &__header
      font-size 24px
      line-height 32px
      padding-bottom 8px

    &__content
      height auto

  .bottom-info
    position initial
    height auto
    width 100%

    &:before
      display none

    &__inner
      max-width 520px
      width calc(100vw - 48px)
      margin 0 auto
      padding-bottom 32px

  .extra-info
    font-size 12px
    line-height 16px

  .menu
    position fixed
    top 80px
    left 0
    right 0
    bottom 0
    margin 0 auto
    max-width 520px
    display flex
    flex-direction column
    justify-content flex-start
    align-items flex-start
    padding 20px 23px
    background-color #000
    pointer-events none
    opacity 0
    transition opacity 0.2s ease-out

    &__item
      font-size 24px
      line-height 32px
      padding-bottom 16px
      display inline-block
      pointer-events none
      opacity 0
      transition opacity 0.2s linear
      transition-delay 0

      &--secondary
        color #7f7f7f

    &--opened
      pointer-events auto
      opacity 1

      & .menu__item
        pointer-events auto
        opacity 1

        &:nth-child(1) {
          transition-delay 0.075s
        }
        &:nth-child(2) {
          transition-delay 0.15s
        }
        &:nth-child(3) {
          transition-delay 0.225s
        }
        &:nth-child(4) {
          transition-delay 0.3s
        }

</style>
