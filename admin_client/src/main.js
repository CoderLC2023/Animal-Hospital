import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入animate.css
import animate from 'animate.css'
Vue.use(animate)

// 引入 Font-Awesome 图标字体
import 'font-awesome/css/font-awesome.min.css'

// 引入moment.js
import moment from 'moment'; 

// 引入session
import VueSession from 'vue-session'

// 引入axios
// http.js中对axios进行了响应和请求拦截，并导出了处理后的axios对象
import axios from './http'

Vue.prototype.$axios = axios

// 挂载第三方组件
Vue.use(ElementUI)
Vue.use(VueSession)

Vue.config.productionTip = false

// 格式化日期的过滤器
Vue.filter('DateFormat',(date)=>{
    return moment(date).format('YYYY-MM-DD')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
