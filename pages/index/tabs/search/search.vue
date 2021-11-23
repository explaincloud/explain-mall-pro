<template>
  <em-page class="tab-search" :em-styles="pageStyles">
    <em-scroller class="scroller">
      <em-header-inset></em-header-inset>
      <view class="em-panel classify">
        <view class="em-panel-content">
          <view class="classify-list">
            <view class="classify-item" :style="[{'width': `${systemInfo.windowWidth/2-28-7}px`, 'height': x.image?`${systemInfo.windowWidth/2-28-7}px`:'58px'}, $em.$getThemeStyle(['bg-color-1'])]" v-for="(x, xi) in classifies" :key="xi" @click="$em.$navigateTo('/pages/category/category')">
              <view class="classify-item-image-wrap" v-if="x.image">
                <image class="classify-item-image" :src="x.image" :style="{'width': `${systemInfo.windowWidth/2-28-7}px`, 'height': x.image?`${systemInfo.windowWidth/2-28-7}px`:'58px'}" mode="aspectFill"></image>
                <view class="classify-item-mask"></view>
              </view>
              <text class="classify-item-label" :style="[x.image?$em.$getThemeStyle(['color-4']):$em.$getThemeStyle(['color-1'])]">{{x.name}}</text>
            </view>
          </view>
        </view>
      </view>
      <em-tab-bar-inset></em-tab-bar-inset>
    </em-scroller>
    <em-header-search class="header" :em-styles="headerStyles" :search-btn="headerSearchBtn" v-model="keywords" @confirm="confirmSearch" placeholder="搜索商品..."></em-header-search>
  </em-page>
</template>

<script>
  import mixin from '../../mixins/tab'
  import {
    mapState
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
    mixins: [mixin],
    data() {
      return {
        /* 搜索关键词 */
        keywords: '',
        /* 分类列表 */
        classifies: []
      }
    },
    computed: {
      ...mapState([
        'systemInfo'
      ]),
      pageStyles() {
        return {
          wrap: app.$getThemeStyle(['bg-color--1'])
        }
      },
      headerStyles() {
        return {
          wrap: app.$getThemeStyle(['bg-color-1', 'shadow-1']),
          input: app.$getThemeStyle(['bg-color-2', 'color-1']),
          placeholder: app.$getThemeStyle(['color-6'])
        }
      },
      headerSearchBtn() {
        return {
          iconUnicode: '\uf0d1',
          styles: {
            btn: app.$getThemeStyle(['bg-color-101']),
            icon: app.$getThemeStyle(['color-101'])
          }
        }
      }
    },
    created() {
      // 因为nvue不支持挂载vue实例方法，但是又可以通过getApp()获取到vue实例和所挂载的方法，然后将this.$em替换，这样模板中就可以使用$em调用vue实例方法了
      this.$em = app.$em
    },
    methods: {
      load() {
        console.log('search on load')
        this.getCategoryList()
      },
      show() {
        console.log('search on show')
      },
      hide() {
        console.log('search on hide')
      },
      getCategoryList() {
        app.$api.getCategoryList().then(res => {
          this.classifies = res.data
        })
      },
      confirmSearch(e) {
        if (e.value) {
          uni.showToast({
            icon: 'none',
            title: `搜索：${e.value}`
          })
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

  .classify {
    padding: 10px 0 24px 0;
  }

  .classify-list {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 28px;
  }

  .classify-item {
    position: relative;
    justify-content: center;
    align-items: center;
    height: 58px;
    margin-top: 14px;
    border-radius: 12px;
    overflow: hidden;
    transition-property: background-color;
    transition-duration: 0.25s;
  }

  .classify-item-image-wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
  }

  .classify-item-image {
    border-radius: 12px;
    overflow: hidden;
  }

  .classify-item-mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    overflow: hidden;
  }

  .classify-item-label {
    position: absolute;
    z-index: 1;
    font-size: 15px;
    font-weight: 700;
  }
</style>
