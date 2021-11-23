import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    systemInfo: uni.getSystemInfoSync(),
    currentTabName: '',
    userInfo: {},
    userHasLogin: false
  },
  actions: {
    updateSystemInfo({
      state
    }) {
      let systemInfo = uni.getSystemInfoSync()
      // // iOS微信浏览器屏幕旋转uni.getSystemInfoSync()获取异常，windowWidth不符合预期，所以重载页面，以保证使用了systemInfo的页面显示正常
      // // #ifdef H5
      // // 安卓输入时键盘会上推，导致尺寸发生变化，在微信H5端会触发刷新，暂时弃用
      // var ua = navigator.userAgent.toLowerCase()
      // var isWXWork = ua.match(/wxwork/i) == 'wxwork'
      // var isWeixin = !isWXWork && ua.match(/micromessenger/i) == 'micromessenger'
      // if (isWeixin && state.systemInfo.windowHeight != systemInfo.windowHeight) {
      //   setTimeout(() => {
      //     window.location.reload()
      //   }, 250)
      //   return
      // }
      // // #endif
      uni.showToast({
        icon: 'none',
        title: `w:${systemInfo.windowWidth},h:${systemInfo.windowHeight}`
      })
      state.systemInfo = systemInfo
    },
    switchTab({
      state
    }, tabName) {
      state.currentTabName = tabName
    }
  },
  mutations: {
    login(state, userInfo) {
      state.userInfo = userInfo
      state.userHasLogin = true
    },
    logout(state) {
      state.userInfo = null
      state.userHasLogin = false
    }
  }
})

export default store
