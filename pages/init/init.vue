<template>
  <!-- 这个页面如果换成nvue，iPhoneXsMax启动时间在7-8秒。vue只需要1-2秒，nvue反而变慢了，就算重新建一个空白nvue文件也要7-8秒启动时间，与页面里写了什么东西无关 -->
  <view class="loading" :style="[$em.$getThemeStyle(['bg-color-1'])]" @touchmove.stop.prevent>
    <view class="loading-box" :class="{'loaded': !loading}">
      <view class="square-gradient">
        <view class="gradient" :style="[$em.$getThemeStyle(['bg-color-7'])]" v-for="(item, index) in 9" :key="index"></view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'

  let app = {}
  // #ifdef MP-WEIXIN
  app = getApp({
    allowDefault: true
  }).$vm
  // #endif
  // #ifndef MP-WEIXIN
  app = getApp({
    allowDefault: true
  })
  // #endif

  export default {
    data() {
      return {
        loading: true
      }
    },
    created() {
      this.$em = app.$em
    },
    async onLoad(options) {
      // pages.json里第一个页面路径
      let rootPath = '/pages/index/index'
      // 获取返回路径，如果没有则返回首页路径
      let redirectPath = options.redirect || rootPath

      // 在此处登录用户信息
      try {
        let getUserInfoRes = await this.$api.getUserInfo()
        this.login(getUserInfoRes.data)
      } catch (e) {
        uni.showModal({
          title: '提示',
          content: JSON.stringify(e),
          showCancel: false
        })
        this.loading = false
        return
      }
      await app.$threadSleep(1500)

      // 增加一个loading消除的过渡效果，让跳转看起来更生动
      this.loading = false
      // 配合过渡效果
      setTimeout(() => {
        // 在App-nvue使用预加载页面可以避免闪烁
        app.$reLaunch(decodeURIComponent(redirectPath))
      }, 250)
    },
    methods: {
      ...mapMutations(['login'])
    }
  }
</script>

<style>
  .loading {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    opacity: 1;
  }

  .loading-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
    transition-property: opacity;
    transition-duration: 0.25s;
  }

  .loaded {
    opacity: 0;
  }
</style>

<style>
  .square-gradient {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 60px;
    height: 60px;
    box-sizing: border-box;
  }

  .gradient {
    width: 20px;
    height: 20px;
    border-radius: 5px;
  }
  
  .gradient {
    animation: gradient 1s infinite linear;
  }
  
  .square-gradient .gradient:nth-child(1) {
    animation-delay: -1.0s;
  }
  
  .square-gradient .gradient:nth-child(2) {
    animation-delay: -0.9s;
  }
  
  .square-gradient .gradient:nth-child(3) {
    animation-delay: -0.8s;
  }
  
  .square-gradient .gradient:nth-child(4) {
    animation-delay: -0.9s;
  }
  
  .square-gradient .gradient:nth-child(5) {
    animation-delay: -0.8s;
  }
  
  .square-gradient .gradient:nth-child(6) {
    animation-delay: -0.7s;
  }
  
  .square-gradient .gradient:nth-child(7) {
    animation-delay: -0.8s;
  }
  
  .square-gradient .gradient:nth-child(8) {
    animation-delay: -0.7s;
  }
  
  .square-gradient .gradient:nth-child(9) {
    animation-delay: -0.6s;
  }
  
  @keyframes gradient {
    0% {
      transform: scale(1.0);
    }
  
    50% {
      transform: scale(0.1);
    }
  
    100% {
      transform: scale(1.0);
    }
  }
</style>
