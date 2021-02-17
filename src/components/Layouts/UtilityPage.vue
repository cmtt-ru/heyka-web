<template>
  <div class="utility-page-layout">
    <ui-header />

    <div class="utility-page-layout__wrapper">
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import UiHeader from '@/components/UiHeader';

export default {
  components: {
    UiHeader,
  },
};
</script>

<style lang="stylus">
  .utility-page-layout
    display flex
    flex-direction column
    width 100%
    min-height 100vh

    &__wrapper
      display flex
      align-items center
      justify-content center
      height 100%
      flex 1
      text-align center

      @media $mobile
        padding 0 28px

      h1
        margin-bottom 12px

        @media $desktop
          font-size 32px
          line-height 48px

        @media $mobile
          font-size 24px
          line-height 38px

      p
        font-size 16px
        line-height 26px
        max-width 384px
        margin 0 auto
        margin-bottom 24px
</style>
