<template>
  <div class="layout layout--static">
    <ui-header />

    <div class="layout__content">
      <h1>Data Deletion Request</h1>

      <p>
        To be compliant with General Data Protection Regulation (GDPR), we provide measures you can take to ensure we do not further process your personal data for desktop app, iOS and Android.
      </p>
      <p>
        You can write us via email at <strong>support@heyka.app</strong>
      </p>
      <ul>
        <li>Use mail title "Data Deletion Request".</li>
        <li>Make sure you write from the same email that is assosiated with desired account.</li>
      </ul>
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

.layout--static

  .layout__content
    max-width 720px
    margin 0 auto
    padding 16px

    h1
      @media $desktop
        font-size 32px
        line-height 48px
        margin-bottom 16px

      @media $mobile
        font-size 24px
        line-height 38px
        margin-bottom 12px

    h2
      @media $desktop
        font-size 24px
        line-height 38px
        margin 24px 0 12px

      @media $mobile
        font-size 18px
        line-height 28px
        margin 18px 0 9px

    p
      font-size 16px
      line-height 26px
      margin-bottom 16px

    ul
      margin-left 40px
      margin-bottom 16px

      li
        margin-bottom 8px

</style>
