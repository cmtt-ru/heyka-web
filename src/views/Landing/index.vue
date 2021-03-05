<template>
  <div class="wrapper">
    <div class="wrapper__inner">
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

        class="app-text"
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

        class="app-text"
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

      <div class="app-text">
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

      <div class="bottom-hider" />

      <div class="top-grad" />
      <div class="bottom-grad" />
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      version: '1.1.12',
    };
  },

  methods: {
  },
};
</script>

<style lang="stylus" scoped>
.wrapper
  background #000000
  color #DFE0E3
  padding-top 200px

  &__inner
    max-width 1200px
    margin 0 auto

.app-text
  position sticky
  display inline-block
  top 25%
  width 486px
  font-size 32px
  line-height 44px
  background #000000
  margin-right 194px
  vertical-align top

  &:before
    content ''
    position absolute
    width 100%
    height 150px
    background linear-gradient(rgba(0,0,0,0), #000000);
    bottom 100%
    left 0

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

.bottom-hider
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
