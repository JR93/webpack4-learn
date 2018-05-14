// import Vue from 'vue';
import './assets/scss/home.scss'
import { reverse } from './common/tool/util'
// import(/* webpackChunkName: "vall" */ './common/tool/var');
// import aa from './common/tool/var'
const a = 1
const str = 'JR123'

setTimeout(() => {
  console.log(a)
  console.log(reverse(str))
  console.log(process.env.NODE_ENV)
}, 1000)
