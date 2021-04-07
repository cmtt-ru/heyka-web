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
          <router-link :to="{ name: 'auth'}">
            <ui-button
              class="controls__signIn"
              :type="3"
              size="large"
              @click="showSignIn=true"
            >
              {{ texts.signIn }}
            </ui-button>
          </router-link>
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
          <ui-form class="email-form">
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
          Скорость
        </div>
        <div class="app-text__content">
          Мгновенное подключение к комнатам обсуждения — пока до 32 участников одновременно
        </div>
      </div>
      <img
        id="img1"
        src="./assets/img1.png"
        alt=""
        class="app-image"
      >

      <div

        class="app-text app-text--fading"
      >
        <div class="app-text__header">
          Лаконичность
        </div>
        <div class="app-text__content">
          Компактный, как рация, и чистый дизайн. Без раздражающих звонков, перекрывающих экран, и неприятных звуков
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
          Прозрачность
        </div>
        <div class="app-text__content">
          Все данные, отправляемые на сервер, в реальном времени отражаются в приложении, мы не собираем персональных данных
        </div>
      </div>
      <img
        src="./assets/img3.png"
        alt=""
        class="app-image app-image--fading"
      >

      <div class="app-text app-text--fading">
        <div class="app-text__header">
          Все платформы
        </div>
        <div class="app-text__content">
          Heyka работает на Web, iOS, Android, Windows, Mac и Linux
        </div>
      </div>
      <div
        class="app-image app-image--fading"
      >
        <a
          class="app-image__quarter"
          target="_blank"
          :href="macLink"
        >
          <svg-icon
            name="apple-white"
            width="60"
            height="60"
          />
          <div class="app-image__quarter__label">
            macOS | iOS
          </div>
        </a>
        <a
          class="app-image__quarter"
          target="_blank"
          href="#"
        >
          <svg-icon
            name="android"
            width="60"
            height="60"
          />
          <div class="app-image__quarter__label">
            Android
          </div>
        </a>
        <a
          class="app-image__quarter"
          target="_blank"
          :href="winLink"
        >
          <svg-icon
            name="windows"
            width="60"
            height="60"
          />
          <div class="app-image__quarter__label">
            Windows
          </div>
        </a>
        <a
          class="app-image__quarter"
          target="_blank"
          :href="linuxLink"
        >
          <svg-icon
            name="ubuntu"
            width="60"
            height="60"
          />
          <div class="app-image__quarter__label">
            Linux
          </div>
        </a>
      </div>
    </div>

    <div class="bottom-info">
      <div class="bottom-info__inner">
        <ui-form class="email-form">
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
      <a
        class="menu__item"
        :href="WEB_URL+'/auth'"
      >{{ texts.signIn }}</a>
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

import { authFileStore } from '@/store/localStore';
import broadcastEvents from '@sdk/classes/broadcastEvents';

let observer;

const STICKED_CLASS = 'ui-sticked';

// eslint-disable-next-line no-magic-numbers
const PORTS = [9615, 48757, 48852, 49057, 49086];
const pingTime = 2000;

export default {
  components: {
    UiButton,
    UiInput,
    UiForm,
  },
  data() {
    return {
      version: '1.1.12',
      WEB_URL,
      regAmount: 483,
      email: '',
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
      return `https://storage.yandexcloud.net/heyka-beta-bin/download/Heyka-${this.version}.dmg`;
    },
    winLink() {
      return `https://storage.yandexcloud.net/heyka-beta-bin/download/Heyka%20Setup%20${this.version}.exe`;
    },
    linuxLink() {
      return `https://storage.yandexcloud.net/heyka-beta-bin/download/heyka_${this.version}_amd64.deb`;
    },
  },

  mounted() {
    document.getElementsByTagName('html')[0].classList.add('dark-html');

    window.addEventListener('scroll', this.onScroll);

    broadcastEvents.on('ping-local-server', this.startPinging);

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
    document.getElementsByTagName('html')[0].classList.remove('dark-html');
    broadcastEvents.removeAllListeners('ping-local-server');
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

    async startPinging() {
      if (authFileStore.get('accessToken')) {
        const res = await this.$API.auth.link();

        this.pingInterval = setInterval(() => {
          for (const port of PORTS) {
            this.pingLocalWebServer(res.code, port);
          }
        }, pingTime);
      }
    },
    async pingLocalWebServer(authLink, port) {
      try {
        await fetch(`http://127.0.0.1:${port}/${authLink}`, { mode: 'no-cors' });

        clearInterval(this.pingInterval);
      } catch (err) {
      }
    },
  },
};
</script>

<style lang="stylus" scoped>

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

<style lang="stylus">
.dark-html
    background-color #000000
    --app-bg: #333333 !important;
    --text-tech-0: #DE4B39 !important;
    --text-tech-1: #27AE60 !important;
    --text-tech-2: #2886ff !important;
    --text-tech-3: #FFFFFF !important;
    --color-0: #DE4B39 !important;
    --color-1: #27AE60 !important;
    --color-2: #2886ff !important;
    --color-3: #FDCB4B !important;
    --color-4: #B1B3B5 !important;
    --color-5: #000000 !important;
    --stroke-0: #F6D4CF !important;
    --stroke-1: #C9EAD7 !important;
    --stroke-2: #C4DCFB !important;
    --stroke-3: #D7D8D9 !important;
    --button-bg-0: #FDF6F5 !important;
    --button-bg-1: #F4FBF7 !important;
    --button-bg-2: #F3F8FE !important;
    --button-bg-3: #000000 !important;
    --button-bg-4: #707070 !important;
    --button-bg-5: transparent !important;
    --button-bg-6: #555555 !important;
    --button-bg-7: transparent !important;
    --icon-bg: #E8F2FE !important;
    --input: #222222 !important;
    --item-bg-hover: #333333 !important;
    --item-bg-active: #FFFFFF !important;
    --item-bg-multi-pick: #222222 !important;
    --shadow-10: rgba(0,0,0,0.1) !important;
    --shadow-15: rgba(255,255,255,0.15) !important;
    --shadow-20: rgba(255,255,255,0.2) !important;
    --shadow-50: rgba(255,255,255,0.5) !important;
    --scroll-bar: 255, 255, 255 !important;
    --new-signal-01: #FFC876 !important;
    --new-signal-02: #62C971 !important;
    --new-signal-02-1: #2B6233 !important;
    --new-signal-03: #FF6157 !important;
    --new-signal-03-1: #FF6157 !important;
    --new-signal-03-2: #FF6157 !important;
    --new-signal-03-3: rgba(255, 97, 87, 0.1) !important;
    --new-icon-0: #525B67 !important;
    --new-UI-01: #3D92FF !important;
    --new-UI-01-1: #4798FF !important;
    --new-UI-01-2: #509DFF !important;
    --new-UI-02: #DFE0E3 !important;
    --new-UI-03: rgba(255, 255, 255, 0.7) !important;
    --new-UI-04: #6B6E73 !important;
    --new-UI-05: rgba(255, 255, 255, 0.3) !important;
    --new-UI-06: #191919 !important;
    --new-UI-07: #1F1F1F !important;
    --new-UI-08: rgba(255, 255, 255, 0.15) !important;
    --new-UI-09: #1F1F1F !important;
    --new-bg-01: #272A30 !important;
    --new-bg-02: rgba(0, 0, 0, 0.65) !important;
    --new-bg-03: #3D4046 !important;
    --new-bg-04: #1F2227 !important;
    --new-bg-05: #141414 !important;
    --new-stroke-01: rgba(255, 255, 255, 0.1) !important;
    --new-system-01: #FFC12F !important;
    --new-system-01-1: #FFE097 !important;
    --new-system-01-2: #DFA023 !important;
    --new-system-02: #FF6157 !important;
    --new-system-02-1: #FFB0AB !important;
    --new-system-02-2: #E24640 !important;
    --new-overlay-01: #333333 !important;
    --new-overlay-02: #404040 !important;
    --new-overlay-03: #262626 !important;
    --new-shadow-01: 0px 2px 6px rgba(0, 0, 0, 0.12) !important;
    --new-shadow-02: 0px 1px 1px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.12) !important;
    --new-shadow-03: 0px 0px 20px rgba(0, 0, 0, 0.08), 0px 10px 30px rgba(0, 0, 0, 0.12) !important;
</style>
