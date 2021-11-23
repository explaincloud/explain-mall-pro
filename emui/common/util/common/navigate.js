let isPreloadPageLock = false // 节流变量，防止点击过快重复打开页面
function navigateTo(url, title) {
  if (isPreloadPageLock) return
  if (!url) return

  // #ifdef APP-PLUS
  isPreloadPageLock = true
  // 解决APP端（nvue）不同主题背景闪烁的核心就在这里
  // 可接受最小预载时间150ms，150ms未预加载完页面则显示loading，150ms内加载完则取消
  var preloadPageLoading = setTimeout(() => {
    uni.showLoading({
      mask: true
    })
  }, 150)
  uni.preloadPage({
    url,
    complete: () => {
      setTimeout(() => {
        clearTimeout(preloadPageLoading)
        uni.hideLoading()
        uni.navigateTo({
          url,
          complete: () => {
            // 页面成功打开后需要取消预载页面，不然后面每次打开页面都不再是预载页面，而是新页面，还会造成背景闪烁
            uni.unPreloadPage({
              url
            })
            isPreloadPageLock = false
          }
        })
      }, 150) // 可接受打开新页面渲染最大延迟150ms，执行preloadPage多余的时间将显示loading
    }
  })
  // #endif
  // #ifndef APP-PLUS
  // 跳转页面
  uni.navigateTo({
    url
  })
  // #endif
}

function navigateBack(indexPath = '/pages/index/index') {
  var pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack()
  } else {
    uni.reLaunch({
      url: indexPath
    })
  }
}

function reLaunch(url) {
  if (isPreloadPageLock) return
  if (!url) return
  
  // #ifdef APP-PLUS
  isPreloadPageLock = true
  // 解决APP端（nvue）不同主题背景闪烁的核心就在这里
  // 可接受最小预载时间150ms，150ms未预加载完页面则显示loading，150ms内加载完则取消
  var preloadPageLoading = setTimeout(() => {
    uni.showLoading({
      mask: true
    })
  }, 150)
  // preloadPage会触发onShow
  uni.preloadPage({
    url,
    complete: () => {
      setTimeout(() => {
        clearTimeout(preloadPageLoading)
        uni.hideLoading()
        uni.reLaunch({
          url,
          complete: () => {
            // 页面成功打开后需要取消预载页面，不然后面每次打开页面都不再是预载页面，而是新页面，还会造成背景闪烁
            uni.unPreloadPage({
              url
            })
            isPreloadPageLock = false
          }
        })
      }, 150) // 可接受打开新页面渲染最大延迟150ms，执行preloadPage多余的时间将显示loading
    }
  })
  // #endif
  // #ifndef APP-PLUS
  // 跳转页面
  uni.reLaunch({
    url
  })
  // #endif
}

function redirectTo(url) {
  if (isPreloadPageLock) return
  if (!url) return
  
  // #ifdef APP-PLUS
  isPreloadPageLock = true
  // 解决APP端（nvue）不同主题背景闪烁的核心就在这里
  // 可接受最小预载时间150ms，150ms未预加载完页面则显示loading，150ms内加载完则取消
  var preloadPageLoading = setTimeout(() => {
    uni.showLoading({
      mask: true
    })
  }, 150)
  // preloadPage会触发onShow
  uni.preloadPage({
    url,
    complete: () => {
      setTimeout(() => {
        clearTimeout(preloadPageLoading)
        uni.hideLoading()
        uni.redirectTo({
          url,
          complete: () => {
            // 页面成功打开后需要取消预载页面，不然后面每次打开页面都不再是预载页面，而是新页面，还会造成背景闪烁
            uni.unPreloadPage({
              url
            })
            isPreloadPageLock = false
          }
        })
      }, 150) // 可接受打开新页面渲染最大延迟150ms，执行preloadPage多余的时间将显示loading
    }
  })
  // #endif
  // #ifndef APP-PLUS
  // 跳转页面
  uni.redirectTo({
    url
  })
  // #endif
}

export default {
	navigateTo,
	navigateBack,
  reLaunch,
  redirectTo
}