import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    config: {},
    currentThemeName: ''
  },
  actions: {
    setConfig({
      state
    }, config) {
      state.config = config
    },
    setTheme({
      state
    }, themeName) {
      state.currentThemeName = themeName
    }
  }
})

export default store
