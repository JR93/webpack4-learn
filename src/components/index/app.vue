<template>
  <div :class="$style.app">
    <input type="text" :class="$style.input" v-model="msg" placeholder="input something...">
    <div :class="$style.title">JR: {{msg}}</div>
    <img :class="$style.img" src="../../assets/img/111.png" @click="output">
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: ''
    }
  },
  created () {},
  methods: {
    output () {
      console.log(this.msg)
    }
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
  .input {
    height: 60px;
    border: 1px solid #d1d1d1;
  }
  .title {
    font-size: 46px;
    font-family: 'dincond';
  }
  .img {
    width: 200px;
    height: 180px;
  }
}

</style>


