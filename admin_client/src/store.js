import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    crumb: {
      name: '',
      icon: ''
    },
    avatar: ''
  },
  mutations: {
    // 设置当前的 组件名称 
    setCrumb(state, obj) {
      state.crumb.name = obj.name
      state.crumb.icon = obj.icon
    },
    setAvatar(state, avatar) {
      state.avatar = avatar
    }
  },
  getters: {
    // 获取当前的 组件名称
    getCrumb(state) {
      return state.crumb
    },
    getAvatar(state) {
      return state.avatar
    }
  },
  actions: {

  }
})
