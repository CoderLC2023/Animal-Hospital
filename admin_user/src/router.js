import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/Index.vue';

Vue.use(Router);

import UserIndex from './components/UserIndex.vue'
import AboutUs from './components/AboutUs.vue'
import Appointment from './components/Appointment.vue'
import Doctors from './components/Doctors.vue'
import News from './components/News.vue'
import JoinUS from './components/JoinUS.vue'
import ConnectUs from './components/ConnectUs.vue'
import Story from './components/Story.vue'
import Category from './components/Category.vue'


import Product from './components/aboutUs/Product.vue'
import Environment from './components/aboutUs/Environment.vue'
import Honour from './components/aboutUs/Honour.vue'

import Training from './components/joinus/Training.vue'
import Talent from './components/joinus/Talent.vue'

import Service from './components/appointment/Service.vue'
import Login from './components/appointment/Login.vue'
import Register from './components/appointment/Register.vue'
import InfoShow from './components/appointment/InfoShow.vue'
import MedicalRecord from './components/appointment/MedicalRecord.vue'
import RePass from './components/appointment/RePass.vue'

import SubCategory from './components/SubCategory.vue'

import Alldoctor from './components/doctors/alldoctor.vue'
import Specialdoctor from './components/doctors/specialdoctor.vue'

import AllStory from './components/story/AllStory.vue'
import SpecialStory from './components/story/SpecialStory.vue'

import AllNews from './components/news/AllNews.vue'
import SpecialNews from './components/news/SpecialNews.vue'

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
      children: [
        { path: '', redirect: '/main' },  // 默认跳转到首页
        { path: '/main', name: 'main', component: UserIndex },
        {
          path: '/aboutus',
          component: AboutUs,
          children: [
            { path: '', component: Product },
            { path: 'product', component: Product },
            { path: 'honour', component: Honour },
            { path: 'environment', component: Environment }
          ]
        },
        {
          path: '/appointment',
          component: Appointment,
          children: [
            { path: '', component: Service },
            { path: 'service', component: Service },
            { path: 'login', component: Login },
            { path: 'register', component: Register },
            { path: 'infoshow', component: InfoShow },
            { path: 'medicalRecord', component: MedicalRecord },
            { path: 'rePass', component: RePass }
          ]
        },
        {
          path: '/categories', component: Category,
          children: [
            { path: '*', component: SubCategory },
          ]
        },
        {
          path: '/doctors',
          component: Doctors,
          children: [
            { path: 'all', component: Alldoctor },
            { path: '*', component: Specialdoctor }
          ]
        },
        {
          path: '/news',
          component: News,
          children: [
            { path: 'all', component: AllNews },
            { path: '*', component: SpecialNews }
          ]
        },
        {
          path: '/joinus',
          component: JoinUS,
          children: [
            { path: 'training', component: Training },
            { path: 'talent', component: Talent }
          ]
        },
        { path: '/connectus', name: 'connectus', component: ConnectUs },
        {
          path: '/story',
          component: Story,
          children: [
            { path: 'all', component: AllStory },
            { path: '*', component: SpecialStory }
          ]
        }
      ]
    }

  ],
});
