<template>
  <em-page class="tab-index" :em-styles="pageStyles">
    <em-scroller class="scroller" @scroll="scroll">
      <em-header-inset></em-header-inset>
      <!-- 轮播 -->
      <swiper class="carousel" :style="{'width': `${systemInfo.windowWidth}px`, 'height': `${systemInfo.windowWidth * 0.48}px`}" indicator-dots autoplay :interval="3000" circular>
        <swiper-item v-for="(x, xi) in carousels" :key="xi">
          <view class="carousel-item-box" :style="{'width': `${systemInfo.windowWidth}px`, 'height': `${systemInfo.windowWidth * 0.48}px`}">
            <view class="carousel-item" @click="$em.$navigateTo('/pages/hot/hot')">
              <image class="carousel-image" :style="{'height': `${systemInfo.windowWidth * 0.48}px`}" :src="x.image" mode="aspectFill"></image>
              <view class="carousel-show">
                <view class="carousel-word">
                  <text class="carousel-title">{{x.title}}</text>
                  <text class="carousel-info">{{x.info}}</text>
                </view>
                <view class="carousel-enter">
                  <em-icon class="carousel-enter-icon" :unicode="'\uea6e'"></em-icon>
                </view>
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
      <!-- 专栏 -->
      <view class="column em-panel" :style="[$em.$getThemeStyle(['bg-color-1'])]" v-for="(x, xi) in columns" :key="xi">
        <view class="em-panel-header">
          <text class="em-panel-header-title" :style="[$em.$getThemeStyle(['color-1'])]">{{x.title}}</text>
          <view class="column-header-more">
            <em-icon class="column-header-more-icon" :style="[$em.$getThemeStyle(['color-1'])]" :unicode="'\uef76'"></em-icon>
          </view>
        </view>
        <view class="em-panel-content">
          <scroll-view class="column-scroll-view" :scroll-x="true">
            <view class="column-list">
              <view class="column-item" v-for="(xx, xxi) in x.goods" :key="xxi" :class="[xxi===0?'column-item-first-child':'', xxi===x.goods.length-1?'column-item-last-child':'']" @click="$em.$navigateTo('/pages/goods/goods?id='+xx.id)">
                <view class="column-item-image-wrap">
                  <image class="column-item-image" :src="xx.image" mode="aspectFill"></image>
                  <view class="column-item-btn-favorite">
                    <em-icon class="column-item-btn-favorite-icon" :unicode="'\ueae5'"></em-icon>
                  </view>
                </view>
                <view class="column-item-info">
                  <text class="column-item-title" :style="[$em.$getThemeStyle(['color-1'])]">{{xx.title}}</text>
                  <text class="column-item-price" :style="[$em.$getThemeStyle(['color-1'])]">￥{{xx.price.toFixed(2)}}</text>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
      <!-- 专题 -->
      <view class="special">
        <view class="special-item" :style="{'width': `${systemInfo.windowWidth-28*2}px`, 'height': `${systemInfo.windowWidth-28*2}px`}" v-for="(x, xi) in specials" :key="xi" :class="[xi===0?'special-item-first-child':'']">
          <view class="special-item-image-wrap">
            <image class="special-item-image" :style="{'width': `${systemInfo.windowWidth-28*2}px`, 'height': `${systemInfo.windowWidth-28*2}px`}" :src="x.image" mode="aspectFill"></image>
          </view>
          <view class="special-item-mask"></view>
          <view class="special-item-word" :style="{'top': `${(systemInfo.windowWidth-28*2)*0.5}px`, 'left': `${(systemInfo.windowWidth-28*2)*0.5}px`}">
            <text class="special-item-title">{{x.title}}</text>
            <text class="special-item-info">{{x.quantity}}+ {{x.info}}</text>
          </view>
          <view class="special-item-enter-btn" :style="[{'left': `${(systemInfo.windowWidth-28*2)*0.5}px`}, $em.$getThemeStyle(['bg-color-106'])]" @click="$em.$navigateTo('/pages/hot/hot')">
            <text class="special-item-enter-btn-text" :style="[$em.$getThemeStyle(['color-106'])]">前往专题</text>
          </view>
        </view>
      </view>
      <!-- 推荐 -->
      <view class="goods em-panel" :style="[$em.$getThemeStyle(['bg-color-1'])]">
        <view class="em-panel-header">
          <text class="em-panel-header-title" :style="[$em.$getThemeStyle(['color-1'])]">推荐</text>
        </view>
        <view class="em-panel-content">
          <view class="goods-list">
            <!-- 临时替代瀑布流组件，瀑布流组件还未开发nvue版本 -->
            <view class="goods-item" :style="[{'width': `${systemInfo.windowWidth/2-36}px`}]" v-for="(x, xi) in goods" :key="xi" @click="$em.$navigateTo('/pages/goods/goods?id='+x.id)">
              <view class="goods-item-image-wrap" :style="{'height': `${systemInfo.windowWidth*0.53}px`}">
                <image class="goods-item-image" :src="x.image" mode="aspectFill"></image>
                <view class="goods-item-btn-favorite">
                  <em-icon class="goods-item-btn-favorite-icon" :unicode="'\ueae5'"></em-icon>
                </view>
              </view>
              <view class="goods-item-info">
                <text class="goods-item-title" :style="[$em.$getThemeStyle(['color-1'])]">{{x.title}}</text>
                <text class="goods-item-price" :style="[$em.$getThemeStyle(['color-1'])]">￥{{x.price.toFixed(2)}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- loadmore -->
      <view class="loadmore">
        <text class="loadmore-text" :style="[$em.$getThemeStyle(['color-1'])]" v-if="loadmoreState === 'loadmore'">上拉加载更多</text>
        <text class="loadmore-text" :style="[$em.$getThemeStyle(['color-1'])]" v-else-if="loadmoreState === 'loading'">正在加载...</text>
        <text class="loadmore-text" :style="[$em.$getThemeStyle(['color-1'])]" v-else-if="loadmoreState === 'nomore'">没有更多了</text>
      </view>
      <em-tab-bar-inset></em-tab-bar-inset>
    </em-scroller>
    <em-header class="header" title="云边杂货铺" :em-styles="headerStyles" :left-btns="headerLeftBtns" :right-btns="headerRightBtns" @clickBtn="clickHeaderBtn"></em-header>
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
        /* 轮播 */
        carousels: [],
        /* 专栏 */
        columns: [],
        /* 专题 */
        specials: [],
        /* 推荐 */
        goods: [],
        goodsPageIndex: 1,
        loadmoreState: 'loadmore'
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
          title: app.$getThemeStyle(['color-1'])
        }
      },
      headerLeftBtns() {
        return [{
          iconUnicode: '\uf0d1',
          styles: {
            btn: app.$getThemeStyle(['bg-color-103']),
            icon: app.$getThemeStyle(['color-103'])
          }
        }]
      },
      headerRightBtns() {
        return [{
          iconUnicode: '\ueae5',
          styles: {
            btn: app.$getThemeStyle(['bg-color-104']),
            icon: app.$getThemeStyle(['color-104'])
          }
        }]
      }
    },
    created() {
      this.$em = app.$em
    },
    methods: {
      load() {
        console.log('index on load')
        this.getCarouselList()
        this.getColumnList()
        this.getSpecialList()
        this.getGoodsList()
      },
      show() {
        console.log('index on show')
      },
      hide() {
        console.log('index on hide')
      },
      scroll(e) {
        if (e.scrollBottom <= 150) {
          this.loadmore()
        }
      },
      loadmore() {
        if (this.loadmoreState === 'loadmore') {
          console.log('index on loadmore')
          this.getGoodsList()
        }
      },
      getCarouselList() {
        app.$api.getCarouselList().then(res => {
          this.carousels = res.data
        })
      },
      getColumnList() {
        app.$api.getColumnList().then(res => {
          this.columns = res.data
        })
      },
      getSpecialList() {
        app.$api.getSpecialList().then(res => {
          this.specials = res.data
        })
      },
      getGoodsList() {
        this.loadmoreState = 'loading'
        app.$api.getGoodsList({
          pageIndex: this.goodsPageIndex,
          pageSize: 20
        }).then(res => {
          res.data.forEach((x, xi) => this.goods.push(x))
          if (this.goods.length >= res.total) {
            this.loadmoreState = 'nomore'
            return
          }
          this.goodsPageIndex++
          this.loadmoreState = 'loadmore'
        })
      },
      clickHeaderBtn(e) {
        if (e.position === 'left' && e.index === 0) {
          // 跳转到搜索页
          app.$switchTab('/pages/index/index', 'search')
        } else if (e.position === 'right' && e.index === 0) {
          // 跳转到收藏页
          app.$navigateTo('/pages/favorite/favorite')
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

  .carousel {
    margin-top: 32px;
  }

  .carousel-item-box {
    flex-direction: row;
    padding: 0 28px;
  }

  .carousel-item {
    position: relative;
    flex-direction: row;
    flex: 1;
    border-radius: 12px;
    /* overflow: hidden; */
  }

  .carousel-image {
    flex: 1;
    /* #ifndef APP-NVUE */
    display: block;
    width: 100%;
    /* #endif */
    border-radius: 12px;
    /* overflow: hidden; */
  }

  .carousel-show {
    position: absolute;
    right: 20px;
    bottom: 30px;
    left: 20px;
    flex-direction: row;
  }

  .carousel-word {
    flex: 1;
  }

  .carousel-title {
    font-size: 16px;
    font-weight: 700;
    color: #FFFFFF;
  }

  .carousel-info {
    margin-top: 10px;
    font-size: 14px;
    color: #FFFFFF;
  }

  .carousel-enter {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    background-color: #FFFFFF;
    border-radius: 9px;
  }

  .carousel-enter-icon {
    font-size: 22px;
    color: #292929;
  }

  .column {
    margin-top: 32px;
    transition-property: background-color;
    transition-duration: 0.25s;
  }

  .column-header-more-icon {
    font-size: 21px;
    font-weight: 700;
  }

  .column-scroll-view {
    flex-direction: row;
    flex: 1;
  }

  .column-list {
    flex-direction: row;
  }

  .column-item {
    padding: 0 16px 24px 0;
  }

  .column-item-first-child {
    padding-left: 28px;
  }

  .column-item-last-child {
    padding-right: 28px;
  }

  .column-item-image-wrap {
    position: relative;
  }

  .column-item-image {
    position: relative;
    z-index: 1;
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    width: 154px;
    height: 200px;
    border-radius: 12px;
  }

  .column-item-btn-favorite {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 10;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border-radius: 7px;
    background-color: #FFFFFF;
  }

  .column-item-btn-favorite-icon {
    font-size: 15px;
    color: #292929;
  }

  .column-item-title {
    margin-top: 20px;
    font-size: 15px;
    font-weight: 700;
    line-height: 20px;
  }

  .column-item-price {
    margin-top: 10px;
    font-size: 13px;
  }

  .special {
    padding: 28px;
  }

  .special-item {
    position: relative;
    margin-top: 28px;
    /* overflow: hidden; */
  }

  .special-item-first-child {
    margin-top: 0;
  }

  .special-item-image {
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    border-radius: 12px;
  }

  .special-item-mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.28);
    border-radius: 12px;
  }

  .special-item-word {
    position: absolute;
    justify-content: center;
    height: 80px;
    transform: translate(-50%, -50%);
  }

  .special-item-title {
    text-align: center;
    font-size: 29px;
    font-weight: 700;
    color: #FFFFFF;
  }

  .special-item-info {
    text-align: center;
    margin-top: 12px;
    font-size: 14px;
    color: #FFFFFF;
  }

  .special-item-enter-btn {
    position: absolute;
    bottom: 38px;
    justify-content: center;
    align-items: center;
    transform: translateX(-50%);
    width: 146px;
    height: 50px;
    text-align: center;
    background-color: #FFFFFF;
    border-radius: 12px;
  }

  .special-item-enter-btn-text {
    font-size: 14px;
    font-weight: 700;
    color: #292929;
  }

  .goods {
    transition-property: background-color;
    transition-duration: 0.25s;
  }

  .goods-list {
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 12px;
  }

  .goods-item {
    padding-bottom: 24px;
    margin-left: 16px;
  }

  .goods-item-image-wrap {
    position: relative;
  }

  .goods-item-image {
    position: relative;
    z-index: 1;
    flex: 1;
    /* #ifndef APP-NVUE */
    display: block;
    width: 100%;
    /* #endif */
    border-radius: 12px;
  }

  .goods-item-btn-favorite {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 10;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border-radius: 7px;
    background-color: #FFFFFF;
  }

  .goods-item-btn-favorite-icon {
    font-size: 15px;
    color: #292929;
  }

  .goods-item-title {
    margin-top: 20px;
    font-size: 15px;
    font-weight: 700;
    line-height: 20px;
  }

  .goods-item-price {
    margin-top: 10px;
    font-size: 13px;
  }

  .loadmore {
    justify-content: center;
    align-items: center;
    height: 56px;
  }

  .loadmore-text {
    font-size: 14px;
    font-weight: 700;
  }
</style>
