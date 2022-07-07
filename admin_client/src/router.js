import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import NotFound from './views/NotFound.vue'
import Login from './views/Login.vue'


import AdminIndex from './components/admin/Main.vue'
import Employee from './components/admin/Employee.vue'
import InfoCenter from './components/admin/InfoCenter.vue'
import Offices from './components/admin/Offices.vue'

import Appointment from './components/admin/userManage/Appointment.vue'
import UserInfo from './components/admin/userManage/UserInfo.vue'

import MsgBox from './components/admin/baseManage/MsgBox.vue'
import Success from './components/admin/baseManage/Success.vue'
import News from './components/admin/baseManage/News.vue'
import Swipe from './components/admin/baseManage/Swipe.vue'
import DocShow from './components/admin/baseManage/DocShow.vue'

import DocAppoint from './components/users/DocAppoint.vue'
import DocInfo from './components/users/DocInfo.vue'
import DocIndex from './components/users/DocIndex.vue'
import DocUserInfo from './components/users/DocUserInfo.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
      children:[
         { path:'',redirect:'/main'},  //默认跳转到首页
         //   管理员的 子路由  
         { path:'/main',name:'main',component:AdminIndex},
         { path:'/employee',name:'employee',component:Employee},
         { path:'/infoCenter',name:'infoCenter',component:InfoCenter},
         { path:'/offices',name:'offices',component:Offices},
         { path:'/appointment',name:'appointment',component:Appointment},
         { path:'/userinfo',name:'userinfo',component:UserInfo},
         { path:'/msgBox',name:'msgBox',component:MsgBox},
         { path:'/success',name:'success',component:Success},
         { path:'/news',name:'news',component:News},
         { path:'/swipe',name:'swipe',component:Swipe},
         { path:'/docShow',name:'docShow',component:DocShow},

        //    职工的子路由
         { path:'/docAppoint',name:'DocAppoint',component:DocAppoint},
         { path:'/docInfo',name:'DocInfo',component:DocInfo},
         { path:'/docIndex',name:'DocIndex',component:DocIndex},
         { path:'/docUserInfo',name:'DocUserInfo',component:DocUserInfo}
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      name: '404',
      component: NotFound

    }
  ]
})
