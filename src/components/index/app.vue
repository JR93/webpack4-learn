<template>
  <div :class="$style.app">
    <div :class="$style.title">JR NBA2222</div>
    <img :class="$style.img" src="../../assets/img/111.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {}
  },
  created () {},
  methods: {
    as () {}
  }
}
</script>

<style lang="scss" module>
@import '@/assets/scss/index.scss';
@font-face {
  font-family: 'dincond';
  src: url('../../assets/font/dincond-black-webfont.woff2') format('woff2'),
          url('../../assets/font/dincond-black-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
.app {
  width: 750px;
  .title {
    font-size: 46px;
    font-family: 'dincond';
    border: 1px solid #666;
  }
  .img {
    width: 200px;
    height: 180px;
  }
}

</style>


