<template>
  <div class="page">
    <div class="page__header">
      <svg-icon
        name="logo-full"
        width="105"
        height="32"
      />
      <div class="controls">
        <div
          v-popover.click="{name: 'Downloads'}"
          class="controls__downloads"
        >
          Downloads
        </div>
        <div
          v-popover.click="{name: 'Language'}"
          class="controls__language"
        >
          English
        </div>
        <ui-button
          class="controls__signIn"
          :type="3"
        >
          Sign In
        </ui-button>
      </div>
    </div>
    <div class="page__inner">
      <div class="app-text">
        <div class="info-header">
          Скорость
        </div>
        <div class="info-content">
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
        <div class="info-header">
          Лаконичность
        </div>
        <div class="info-content">
          Компактный, как рация, и чистый дизайн. Без раздражающих звонков, перекрывающих экран, и неприятных звуков
        </div>
      </div>
      <img
        src="./assets/img2.png"
        alt=""
        class="app-image"
      >

      <div

        class="app-text app-text--fading"
      >
        <div class="info-header">
          Прозрачность
        </div>
        <div class="info-content">
          Все данные, отправляемые на сервер, в реальном времени отражаются в приложении, мы не собираем персональных данных
        </div>
      </div>
      <img
        src="./assets/img3.png"
        alt=""
        class="app-image"
      >

      <div class="app-text app-text--fading">
        <div class="info-header">
          Все платформы
        </div>
        <div class="info-content">
          Heyka работает на Web, iOS, Android, Windows, Mac и Linux
        </div>
      </div>
      <img
        src="./assets/img4.png"
        alt=""
        class="app-image"
      >

      <div class="bottom-info">
        <div class="bottom-info__inner">
          <ui-form class="email-form">
            <ui-input
              v-model="email"
              class="email-form__input"
              placeholder="Your mail to be first..."
              email
              required
            />
            <ui-button
              :type="1"
              size="large"
              class="email-form__submit"
              submit
            >
              Submit
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

      <div class="top-grad" />
      <div class="bottom-grad" />
    </div>
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
    };
  },

  mounted() {
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        this.elementCheck(entry);
      }
    }, {
      threshold: 0,
      rootMargin: `0px 0px -74%`,
    });

    for (const el of document.getElementsByClassName('app-text--fading')) {
      observer.observe(el);
    }

    // observer2 = new IntersectionObserver(entries => {
    //   for (const entry of entries) {
    //     this.elementCheck(entry);
    //   }
    // }, {
    //   threshold: 0,
    //   rootMargin: `0px 0px -80%`,
    // });

    // for (const el of document.getElementsByClassName('app-image')) {
    //   observer2.observe(el);
    // }
  },

  methods: {
    elementCheck(el) {
      console.log(el);
      if (el.intersectionRatio === 0) {
        el.target.classList.remove(STICKED_CLASS);
      } else {
        el.target.classList.add(STICKED_CLASS);
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

  &__header
    position fixed
    top 0
    width 100vw
    box-sizing border-box
    padding 0 40px
    background-color #000000
    height 80px
    display flex
    flex-direction row
    align-items center
    justify-content space-between
    z-index 10

  .controls
    display flex
    flex-direction row

    &__downloads
      margin-right 28px

    &__language
      margin-right 24px

  &__inner
    padding-top 200px
    max-width 1200px
    margin 0 auto

.app-text
  position sticky
  display inline-block
  top 25%
  width 486px
  font-size 32px
  line-height 44px
  background-color #000000
  margin-right 194px
  vertical-align top

  &--fading
    opacity 0
    transition opacity 0.3s ease-out

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

.info-header
  font-size 48px
  line-height 54px
  padding-bottom 24px

.info-content
  height 220px

.app-image
    width 520px
    flex-srink 0
    padding-bottom calc(50vh - 260px)
    vertical-align top

.bottom-info
  background-color black
  position fixed
  bottom 0
  left 0
  width 50%
  height calc(75vh - 320px)

  &:before
    content ''
    position absolute
    width 100%
    height 29px
    background linear-gradient(rgba(0,0,0,0), #000000);
    bottom 100%
    left 0

  &__inner
    width 486px
    margin 40px 120px 0 auto

    & .email-form
      position relative

      &__input
        height 60px

      &__submit
        position absolute
        right 4px
        top 4px
        height 52px
        width 120px
        border-radius 12px
        font-size 24px
        font-weight normal

/deep/ .input
  padding-right 132px
  padding-left 20px
  height 60px
  min-height 60px
  box-sizing border-box
  font-weight 500
  background-color rgba(255, 255, 255, 0.1)
  border-radius 14px
  font-size 24px
  color white

  &:focus
    color black
    border-radius 14px

.extra-info
  font-size 16px
  line-height 22px
  color #595A5B
  margin-top 48px

  &--strong
    color #FFFFFF

.top-grad
  background linear-gradient(#000000, rgba(0,0,0,0));
  position fixed
  top 0
  right 0
  width 50%
  height 150px

.bottom-grad
  background linear-gradient(rgba(0,0,0,0), #000000);
  position fixed
  bottom 0
  right 0
  width 50%
  height 150px
</style>
