import Vue from 'vue'
import App from './App'
import Emui from './emui'
import Theme from './emui/common/theme'
import ThemeConfig from './theme/config'
import Store from './store'
import Api from './common/js/api'
import Util from './common/js/util'

Vue.config.productionTip = false

Vue.use(Emui) // 安装emui库
Vue.use(Theme, ThemeConfig) // 安装并使用主题配置

Vue.prototype.$store = Store
// 监听窗体变化
uni.onWindowResize(res => {
  Store.dispatch('updateSystemInfo')
})
Vue.prototype.$api = Api
Vue.prototype.$switchTab = Util.switchTab

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
