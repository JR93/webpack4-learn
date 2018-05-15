import Vue from 'vue'
import App from '@/components/index/app.vue'
import './assets/scss/index.scss'

new Vue({ // eslint-disable-line
  el: '#app',
  template: '<App/>',
  components: { App }
})
