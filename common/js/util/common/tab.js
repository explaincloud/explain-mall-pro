import store from '@/store'
import emUtil from '@/emui/common/util'

module.exports.switchTab = function(tabPath, tabName) {
  let pages = getCurrentPages()
  let currentPage = pages[pages.length - 1]
  if (`/${currentPage.route}` === tabPath) {
    store.dispatch('switchTab', tabName)
  } else {
    store.dispatch('switchTab', tabName)
    emUtil.reLaunch(`${tabPath}?tab=${tabName}`)
  }
}
