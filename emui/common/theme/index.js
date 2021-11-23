import util from './common/util'
import mixin from './common/mixin'
import store from './common/store'

export default {
  install(Vue, config) {
    // 写入配置
    store.dispatch('setConfig', config)
    // 初始化主题
    util.initTheme()
    // 将主题公共方法绑定到Vue实例方法，$em对象不存在则创建为新对象
    let em = Vue.prototype.$em = Vue.prototype.$em || {}
    em.$setTheme = Vue.prototype.$setTheme = util.setTheme
    em.$getTheme = Vue.prototype.$getTheme = util.getTheme
    em.$setStatusBarStyle = Vue.prototype.$setStatusBarStyle = util.setStatusBarStyle
    em.$setBackgroundColor = Vue.prototype.$setBackgroundColor = util.setBackgroundColor
    em.$getThemeStyle = Vue.prototype.$getThemeStyle = util.getThemeStyle
    // mixin
    Vue.mixin(mixin)
  }
}
