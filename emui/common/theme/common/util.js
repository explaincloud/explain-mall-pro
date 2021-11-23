import store from './store'

const STORAGE_KEY = 'em_theme'

/**
 * 设置主题
 */
function setTheme(themeName) {
  store.dispatch('setTheme', themeName)
  // 存入本地缓存
  uni.setStorageSync(STORAGE_KEY, themeName)
  setStatusBarStyle(themeName)
  setBackgroundColor(themeName)
}

/**
 * 获取主题
 */
function getTheme() {
  // 读取本地缓存，默认为light
  let themeName = uni.getStorageSync(STORAGE_KEY) || 'light'
  store.dispatch('setTheme', themeName)
  return themeName
}

/**
 * 初始化主题
 */
function initTheme() {
  setTheme(getTheme())
}

/**
 * 设置状态栏样式
 */
function setStatusBarStyle(themeName) {
  let config = store.state.config
  let theme = config.list.filter(x => x.name === themeName)[0]
  // #ifdef APP-PLUS
  // APP-PLUS包括APP-VUE和APP-NVUE
  plus.navigator.setStatusBarStyle(theme.statusBarStyle)
  // #endif
  // #ifdef MP-WEIXIN
  let frontColor = ''
  switch (theme.statusBarStyle) {
    case 'dark':
      frontColor = '#ffffff'
      break
    case 'light':
      frontColor = '#000000'
      break
  }
  // 微信小程序设置状态栏无效
  uni.setNavigationBarColor({
    frontColor
  })
  // #endif
}

/**
 * 设置背景颜色
 */
function setBackgroundColor(themeName) {
  let config = store.state.config
  let theme = config.list.filter(x => x.name === themeName)[0]
  // #ifdef MP-WEIXIN
  // 微信小程序设置背景颜色无效
  uni.setBackgroundColor({
    backgroundColor: theme.backgroundColor
  })
  // #endif
}

/**
 * 获取主题样式
 */
function getThemeStyle(styles) {
  let result = {}
  if(Object.prototype.toString.call(styles) != '[object Array]') {
    throw new Error('getThemeStyle() parameter must be Array.')
  }
  // vuex可以对象双向绑定从而改变store.state.themeName，影响style结果，这样就可以达到改变主题名称，就切换到对应主题样式
  let config = store.state.config
  let style = config.list.filter(x => x.name === store.state.currentThemeName)[0].style
  styles.forEach(x => {
    result = Object.assign(result, style[x])
  })
  return result
}

module.exports = {
  setTheme,
  getTheme,
  initTheme,
  setStatusBarStyle,
  setBackgroundColor,
  getThemeStyle
}
