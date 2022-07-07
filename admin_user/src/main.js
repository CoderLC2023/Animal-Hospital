import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// 引入Element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入element UI 的布局样式文件
import 'element-ui/lib/theme-chalk/display.css';

import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

import animated from 'animate.css'
Vue.use(animated)

import moment from 'moment'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'


// 引入 Font-Awesome 图标字体
import 'font-awesome/css/font-awesome.min.css'

// 引入axios
// http.js中对axios进行了响应和请求拦截，并导出了处理后的axios对象
import axios from './http'

Vue.prototype.$axios = axios

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// 引入session
import VueSession from 'vue-session'
Vue.use(VueSession)

// 挂载第三方组件
Vue.use(ElementUI)

// 格式化日期的过滤器
Vue.filter('DateFormat',(date)=>{
  return moment(date).format('YYYY-MM-DD')
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
