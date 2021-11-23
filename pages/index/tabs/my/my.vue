<template>
  <em-page class="tab-my" :em-styles="pageStyles">
    <em-scroller class="scroller" @scroll="scroll">
      <view class="top" :style="[$em.$getThemeStyle(['bg-color-1'])]">
        <em-header-inset></em-header-inset>
        <view class="top-avatar">
          <image class="top-avatar-image" :src="userInfo.avatar"></image>
        </view>
        <view class="top-name">
          <text class="top-name-text" :style="[$em.$getThemeStyle(['color-1'])]">{{userInfo.name}}</text>
        </view>
        <view class="top-label">
          <text class="top-label-text" :style="[$em.$getThemeStyle(['color-1'])]">修改资料</text>
        </view>
      </view>
      <view class="list">
        <view class="list-item" :style="[$em.$getThemeStyle(['bg-color-1'])]" @click="$em.$navigateTo('/pages/order/order')">
          <view class="list-item-left">
            <view class="list-item-left-icon list-item-icon-bg-101">
              <em-icon class="list-item-left-icon-text" :unicode="'\ueced'"></em-icon>
            </view>
            <view class="list-item-left-title">
              <text class="list-item-left-title-text" :style="[$em.$getThemeStyle(['color-1'])]">我的订单</text>
            </view>
          </view>
          <view class="list-item-right">
            <view class="list-item-right-arrow-icon">
              <em-icon class="list-item-right-arrow-icon-text" :unicode="'\uea6e'"></em-icon>
            </view>
          </view>
        </view>
        <view class="list-item" :style="[$em.$getThemeStyle(['bg-color-1'])]" @click="$em.$navigateTo('/pages/history/history')">
          <view class="list-item-left">
            <view class="list-item-left-icon list-item-icon-bg-100">
              <em-icon class="list-item-left-icon-text" :unicode="'\uee17'"></em-icon>
            </view>
            <view class="list-item-left-title">
              <text class="list-item-left-title-text" :style="[$em.$getThemeStyle(['color-1'])]">我的足迹</text>
            </view>
          </view>
          <view class="list-item-right">
            <view class="list-item-right-arrow-icon">
              <em-icon class="list-item-right-arrow-icon-text" :unicode="'\uea6e'"></em-icon>
            </view>
          </view>
        </view>
        <view class="list-item" :style="[$em.$getThemeStyle(['bg-color-1'])]" @click="$em.$navigateTo('/pages/address/address')">
          <view class="list-item-left">
            <view class="list-item-left-icon list-item-icon-bg-102">
              <em-icon class="list-item-left-icon-text" :unicode="'\uef06'"></em-icon>
            </view>
            <view class="list-item-left-title">
              <text class="list-item-left-title-text" :style="[$em.$getThemeStyle(['color-1'])]">我的地址</text>
            </view>
          </view>
          <view class="list-item-right">
            <view class="list-item-right-arrow-icon">
              <em-icon class="list-item-right-arrow-icon-text" :unicode="'\uea6e'"></em-icon>
            </view>
          </view>
        </view>
      </view>
      <view style="width: 750rpx;height: 18px;"></view>
      <em-tab-bar-inset style="padding-top: 18px;"></em-tab-bar-inset>
    </em-scroller>
    <em-header class="header" title="个人中心" :em-styles="headerStyles" :right-btns="headerRightBtns"></em-header>
  </em-page>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import mixin from '../../mixins/tab'

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
    mixins: [mixin],
    data() {
      return {
        headerShowShadow: false
      }
    },
    computed: {
      ...mapState(['userInfo']),
      pageStyles() {
        return {
          wrap: app.$getThemeStyle(['bg-color--1'])
        }
      },
      headerStyles() {
        return {
          wrap: app.$getThemeStyle(['bg-color-1', this.headerShowShadow?'shadow-1':'shadow-0']),
          title: app.$getThemeStyle(['color-1'])
        }
      },
      headerRightBtns() {
        return [{
          iconUnicode: '\uf0ea',
          styles: {
            btn: app.$getThemeStyle(['bg-color-104']),
            icon: app.$getThemeStyle(['color-104'])
          }
        }]
      }
    },
    created() {
      // 因为nvue不支持挂载vue实例方法，但是又可以通过getApp()获取到vue实例和所挂载的方法，然后将this.$em替换，这样模板中就可以使用$em调用vue实例方法了
      this.$em = app.$em
    },
    methods: {
      load() {
        console.log('my on load')
      },
      show() {
        console.log('my on show')
      },
      hide() {
        console.log('my on hide')
      },
      scroll(e) {
        if (e.scrollTop > 42) {
          this.headerShowShadow = true
        } else {
          this.headerShowShadow = false
        }
      }
    }
  }
</script>

<style>
  .header {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 101;
  }

  .scroller {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
  }

  .top {
    align-items: center;
    padding: 42px 0 42px 0;
    border-bottom-left-radius: 34px;
    border-bottom-right-radius: 34px;
    transition-property: background-color;
    transition-duration: 0.25s;
  }

  .top-avatar-image {
    width: 108px;
    height: 108px;
    border-radius: 36px;
    background-color: #E5AD8B;
  }

  .top-name {
    margin-top: 24px;
  }

  .top-name-text {
    font-size: 19px;
    font-weight: 700;
    line-height: 19px;
  }

  .top-label {
    margin-top: 18px;
  }

  .top-label-text {
    font-size: 14px;
  }

  .list {
    padding: 0 28px;
  }

  .list-item {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 84px;
    margin-top: 18px;
    padding: 0 24px;
    border-radius: 12px;
    transition-property: background-color;
    transition-duration: 0.25s;
  }

  .list-item-left {
    flex-direction: row;
    align-items: center;
  }

  .list-item-left-icon {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 48px;
    border-radius: 12px;
  }

  .list-item-left-icon-text {
    font-size: 18px;
    color: #FFFFFF;
  }

  .list-item-left-title {
    flex-direction: row;
    align-items: center;
    margin-left: 18px;
  }

  .list-item-left-title-text {
    font-size: 14px;
    font-weight: 700;
  }

  .list-item-icon-bg-100 {
    background-color: #FFC592;
  }

  .list-item-icon-bg-101 {
    background-color: #F76842;
  }

  .list-item-icon-bg-102 {
    background-color: #61DAD5;
  }

  .list-item-right {
    flex-direction: row;
    align-items: center;
  }

  .list-item-right-arrow-icon {
    flex-direction: row;
    align-items: center;
  }

  .list-item-right-arrow-icon-text {
    font-size: 18px;
    font-weight: 700;
    color: #9093A2;
  }
</style>
