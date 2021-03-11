<template>
  <div class="page">
    <div class="page__inner">
      <div class="page__header">
        <div class="controls">
          <div class="burger mobile-element">
            <svg-icon
              name="burger"
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
          >
            {{ texts.signIn }}
          </ui-button>
        </div>

        <ui-button
          class="controls__signIn mobile-element"
          :type="3"
          size="large"
        >
          Get app
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
            <span class="extra-info--strong">{{ regAmount }} people</span>
            <span> in waiting list now</span>
            <br>
            <span>Beta users will receive a free premium account for year </span>
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
      <img
        src="./assets/img4.png"
        alt=""
        class="app-image app-image--fading"
      >
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
          <a href="https://heyka.app/terms-conditions">{{ texts.terms }}</a>
          <a href="https://heyka.app/privacy-policy">{{ texts.privacy }}</a>
        </div>
      </div>
    </div>

    <div class="top-grad desktop-element" />
    <div class="bottom-grad desktop-element" />
  </div>
</template>

<script>

import { UiInput, UiForm } from '@components/Form';
import UiButton from '@components/UiButton';

let observer;
// let observer2;
const STICKED_CLASS = 'ui-sticked';

export default {
  components: {
    UiButton,
    UiInput,
    UiForm,
  },
  data() {
    return {
      version: '1.1.12',
      regAmount: 483,
      email: '',
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
  },

  mounted() {
    document.getElementsByTagName('html')[0].classList.add('dark-html');

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

  methods: {
    elementCheck(el) {
      if (el.intersectionRatio === 1) {
        el.target.previousSibling.classList.add(STICKED_CLASS);
      } else {
        el.target.previousSibling.classList.remove(STICKED_CLASS);
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
    z-index 10

  .controls
    display flex
    flex-direction row
    align-items center

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
    padding-bottom 24px

  &__content
    height 220px

.app-image
    width 520px
    flex-shrink 0
    padding-bottom calc(50vh - 260px)
    vertical-align top

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

    &--short
      display none

      & .icon
        transform rotate(-90deg)

/deep/ .input-wrapper
  border-radius 14px

/deep/ .input
  padding-right 162px
  padding-left 20px
  height 60px
  min-height 60px
  box-sizing border-box
  font-weight 500
  background-color rgba(255, 255, 255, 0.1)
  border-radius 14px
  font-size 24px

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
  background linear-gradient(#000000, rgba(0,0,0,0));
  position fixed
  top 0
  right 0
  width calc(50% - 50px)
  height 150px

.bottom-grad
  background linear-gradient(rgba(0,0,0,0), #000000);
  position fixed
  bottom 0
  right 0
  width calc(50% - 50px)
  height 150px

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
    padding-bottom calc(50vh - 180px)

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

@media screen and (max-width: 1024px), screen and (max-height: 650px)
  .page__inner
    width 640px

  .app-image
    width 320px
    padding-bottom calc(50vh - 160px)

  .app-text
    width 294px
    font-size 20px
    line-height 28px
    margin-right 26px

    &__header
      font-size 32px
      line-height 52px

  .bottom-info
    height calc(50vh - 70px)
    width 50%

    &__inner
      width 294px
      margin 20px 30px 0 auto

  .email-form

      &__input
        height 40px

      &__submit
        right 4px
        top 5px
        height 32px
        border-radius 6px
        font-size 16px

        &--short
          display flex

        &--long
          display none

  /deep/ .input-wrapper
    border-radius 10px

  /deep/ .input
    padding-right 52px
    padding-left 12px
    height 40px
    min-height 40px
    border-radius 10px
    font-size 16px

  .extra-info
    margin-top 24px

  .top-grad
    width 50%
    height 150px

  .bottom-grad
    width 50%
    height 100px

@media screen and (max-width: 720px)

  .mobile-element
    display initial

  .desktop-element
    display none !important

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

  .app-image
    width 100%
    padding-bottom 32px

  .app-text
    position initial
    font-size 16px
    line-height  22px
    margin 0 auto 32px
    width auto

    &--fading
      opacity 1

    &__header
      font-size 24px
      line-height 32px

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

</style>

<style lang="stylus">
.dark-html
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
    --new-signal-03: #FFA9A3 !important;
    --new-signal-03-1: #FFADA9 !important;
    --new-signal-03-2: #FFB2AD !important;
    --new-signal-03-3: rgba(255, 97, 87, 0.1) !important;
    --new-icon-0: #525B67 !important;
    --new-UI-01: #3D92FF !important;
    --new-UI-01-1: #4798FF !important;
    --new-UI-01-2: #509DFF !important;
    --new-UI-02: #DFE0E3 !important;
    --new-UI-03: rgba(255, 255, 255, 0.7) !important;
    --new-UI-04: #6B6E73 !important;
    --new-UI-05: rgba(255, 255, 255, 0.3) !important;
    --new-UI-06: rgba(255, 255, 255, 0.05) !important;
    --new-UI-07: rgba(0, 0, 0, 0.1) !important;
    --new-UI-08: rgba(255, 255, 255, 0.15) !important;
    --new-UI-09: #000000 !important;
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
