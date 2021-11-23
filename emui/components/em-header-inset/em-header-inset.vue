<template>
  <view class="em-header-inset" :style="{'height': height+'px'}"></view>
</template>

<script>
  const systemInfo = (function getSystemInfo() {
    let systemInfo = uni.getSystemInfoSync()

    let headerStyle = {}
    headerStyle.height = 36
    headerStyle.paddingTop = 16
    headerStyle.paddingBottom = 16
    // #ifdef APP-PLUS
    headerStyle.paddingTop = systemInfo.statusBarHeight ? systemInfo.statusBarHeight + 4 : headerStyle.paddingTop
    // #endif
    // #ifdef MP-WEIXIN
    var menuButtonBoundingClientRect = uni.getMenuButtonBoundingClientRect()
    headerStyle.height = menuButtonBoundingClientRect.height
    headerStyle.paddingTop = menuButtonBoundingClientRect.top
    // #endif
    systemInfo.headerStyle = headerStyle

    return systemInfo
  })()

  export default {
    name: 'em-header-inset',
    data() {
      return {
        height: systemInfo.headerStyle.height + systemInfo.headerStyle.paddingTop + systemInfo.headerStyle.paddingBottom
      }
    }
  }
</script>

<style>
  .em-header-inset {
    width: 750rpx;
  }
</style>
