import util from './util'

module.exports = {
  onLoad() {
    // 需要onLoad和onShow同时设置状态栏，并且onLoad还需要具有一点点延时，设置状态栏时才不会闪烁
    setTimeout(() => {
      util.setStatusBarStyle(util.getTheme())
    }, 1)
  },
  onShow() {
    util.setStatusBarStyle(util.getTheme())
  }
}
