<template>
  <div class="layout layout--auth">
    <div class="auth">
      <div class="auth__cover">
        <img src="./img/auth-cover.jpg">
      </div>

      <div class="auth__body">
        <div class="auth__body__wrapper">
          <div class="auth__header">
            <router-link
              v-if="$route.meta.depth > 1"
              :to="{name: 'new-auth'}"
            >
              <ui-button
                :type="9"
                size="small"
              >
                <svg-icon name="arrow-down" />
                Назад
              </ui-button>
            </router-link>
          </div>

          <div class="auth__form">
            <transition :name="transitionName">
              <router-view />
            </transition>
          </div>

          <div class="auth__footer">
            <p>
              Вы даете согласие на обработку
              персональных данных
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UiButton from '@components/UiButton';

export default {
  components: {
    UiButton,
  },

  data() {
    return {
      transitionName: '',
    };
  },

  watch: {
    $route(to, from) {
      this.transitionName = to.meta.depth > from.meta.depth ? 'next' : 'prev';
    },
  },
};
</script>

<style lang="stylus">
  @import '../../styles/global.styl';

  shape()
    border 1px solid rgba(0,0,0,0.1)
    box-sizing border-box

  .layout
    display flex
    width 100%
    min-height 100vh
    justify-content center
    align-items center

  .auth
    display flex
    height 520px
    overflow hidden
    justify-content center
    font-size 12px
    line-height 1.5

    @media $desktop
      border-radius 10px
      box-shadow 0 2px 6px rgba(0, 0, 0, 0.12)
      width 520px

    @media $mobile
      width 100%

    &__cover
      width 220px

      img
        width 100%

      @media $mobile
        display none

    &__body
      display flex
      width 300px
      justify-content center

      &__wrapper
        position relative
        display flex
        width 268px
        flex-direction column
        overflow hidden

    &__header
      height 100px

      .ui-button
        margin-top 35px
        margin-left -4px

      .icon--arrow-down
        transform rotate(90deg)
        width 20px
        height 20px

    &__footer
      height 65px
      color var(--new-UI-04)

    &__form
      position relative
      flex 1

      h1
        font-size 26px
        font-weight 700
        line-height 1.6

  /* Used in child components */
  .auth-page
    position absolute
    z-index 0
    width 100%

    h1
      font-size 26px
      font-weight 700
      line-height 1.6

  /* Page transitions */
  $animation-duration = 350ms
  .next-leave-to
    animation leaveToLeft $animation-duration both cubic-bezier(0.165, 0.84, 0.44, 1)
    z-index 1

  .next-enter-to
    animation enterFromRight $animation-duration both cubic-bezier(0.165, 0.84, 0.44, 1)
    z-index 2

  .prev-leave-to
    animation leaveToRight $animation-duration both cubic-bezier(0.165, 0.84, 0.44, 1)
    z-index 2

  .prev-enter-to
    animation enterFromLeft $animation-duration both cubic-bezier(0.165, 0.84, 0.44, 1)
    z-index 1

  @keyframes leaveToLeft {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }

  @keyframes enterFromLeft {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes leaveToRight {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }

  @keyframes enterFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

</style>
