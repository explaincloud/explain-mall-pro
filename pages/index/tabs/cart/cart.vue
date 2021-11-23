<template>
  <em-page class="tab-cart" :em-styles="pageStyles">
    <!-- em-scroller的高=窗体高度-tabbar高度70-footer高度58+28+28 -->
    <view class="scroll-view" :style="[$em.$getThemeStyle(['bg-color-1'])]">
      <em-scroller class="scroller" :style="[{'height': `${systemInfo.windowHeight-(70+58+28+28)}px`}]">
        <em-header-inset></em-header-inset>
        <view class="item-padding-top"></view>
        <view class="item" v-for="(x, xi) in carts" :key="xi">
          <view class="item-left">
            <!-- @click.stop在iOS nvue不能阻止事件冒泡 -->
            <view class="item-checkbox" @click="toggleChecked(x, xi)">
              <em-icon class="item-checkbox-icon" style="color: #9093A2;" :style="[x.checked&&$em.$getThemeStyle(['color-3'])]" v-if="x.checked" :unicode="'\ueb82'"></em-icon>
              <em-icon class="item-checkbox-icon" style="color: #9093A2;" :style="[x.checked&&$em.$getThemeStyle(['color-3'])]" v-else :unicode="'\ueb7f'"></em-icon>
            </view>
            <view class="item-image-wrap" @click="$em.$navigateTo('/pages/goods/goods?id='+x.id)">
              <image class="item-image" mode="aspectFill" :src="x.image"></image>
            </view>
            <view class="item-info" @click="$em.$navigateTo('/pages/goods/goods?id='+x.id)">
              <text class="item-title" :style="[$em.$getThemeStyle(['color-1'])]">{{x.title}}</text>
              <text class="item-spec">{{x.spec}}</text>
              <text class="item-price" :style="[$em.$getThemeStyle(['color-1'])]">￥{{x.price.toFixed(2)}}</text>
            </view>
          </view>
          <view class="item-right">
            <!-- 小程序v-model不支持使用对象里的属性，例如这里的x.quantity，所以改为用value，再用input事件改变x.quantity -->
            <em-number-box :em-styles="numberBoxStyles" :plus-btn="numberBoxPlusBtnStyles" :minus-btn="numberBoxMinusBtnStyles" :value="x.quantity" @input="inputNumberBox($event, x)"></em-number-box>
          </view>
        </view>
      </em-scroller>
    </view>
    <view class="footer">
      <view class="footer-submit" v-if="!isRemoveEdit">
        <view class="footer-btn" :style="[{'width': `${systemInfo.windowWidth-112}px`}, $em.$getThemeStyle(['bg-color-101'])]" @click="commit">
          <text class="footer-submit-label" :style="[$em.$getThemeStyle(['color-101'])]">提交订单</text>
          <text class="footer-submit-amount" :style="[$em.$getThemeStyle(['color-101'])]">￥{{totalAmount.toFixed(2)}}</text>
        </view>
      </view>
      <view class="footer-remove" v-else>
        <view class="footer-btn footer-remove-btn" :style="[{'width': `${systemInfo.windowWidth-112}px`}, $em.$getThemeStyle(['bg-color-101'])]" @click="remove">
          <text class="footer-remove-label" :style="[$em.$getThemeStyle(['color-101'])]">删除选中</text>
        </view>
      </view>
    </view>
    <em-header class="header" title="购物车" :em-styles="headerStyles" :left-btns="headerLeftBtns" :right-btns="headerRightBtns" @clickBtn="clickHeaderBtn"></em-header>
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
        carts: [],
        totalAmount: 0,
        isCheckedAll: false,
        isRemoveEdit: false
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
          iconUnicode: this.isCheckedAll ? '\ueb7b' : '\ueb7f',
          styles: {
            btn: app.$getThemeStyle(['bg-color-103']),
            icon: app.$getThemeStyle(['color-103'])
          }
        }]
      },
      headerRightBtns() {
        return [{
          iconUnicode: this.isRemoveEdit ? '\ueb99' : '\uec2a',
          styles: {
            btn: app.$getThemeStyle(['bg-color-104']),
            icon: app.$getThemeStyle(['color-104'])
          }
        }]
      },
      numberBoxStyles() {
        return {
          wrap: app.$getThemeStyle(['bg-color-2']),
          input: app.$getThemeStyle(['color-2'])
        }
      },
      numberBoxPlusBtnStyles() {
        return {
          iconUnicode: '\uea13',
          styles: {
            icon: app.$getThemeStyle(['color-3'])
          }
        }
      },
      numberBoxMinusBtnStyles() {
        return {
          iconUnicode: '\uf1af',
          styles: {
            icon: app.$getThemeStyle(['color-2'])
          }
        }
      }
    },
    watch: {
      carts: {
        handler(val) {
          let totalAmount = 0
          let checkedList = this.carts.filter(x => x.checked)
          checkedList.forEach(x => totalAmount += x.price * x.quantity)
          this.totalAmount = totalAmount
          this.isCheckedAll = checkedList.length === this.carts.length ? true : false
        },
        deep: true
      }
    },
    created() {
      // 因为nvue不支持挂载vue实例方法，但是又可以通过getApp()获取到vue实例和所挂载的方法，然后将this.$em替换，这样模板中就可以使用$em调用vue实例方法了
      this.$em = app.$em
    },
    methods: {
      load() {
        console.log('cart on load')
        this.getCartList()
      },
      show() {
        console.log('cart on show')
      },
      hide() {
        console.log('cart on hide')
      },
      getCartList() {
        app.$api.getCartList().then(res => {
          this.carts = res.data
        })
      },
      inputNumberBox(e, item) {
        item.quantity = e
      },
      toggleChecked(item, index) {
        this.$set(item, 'checked', !item.checked)
      },
      clickHeaderBtn(e) {
        if (e.position === 'left' && e.index === 0) {
          // 全选或取消全选
          this.checkedAll()
        } else if (e.position === 'right' && e.index === 0) {
          // 移除编辑
          this.removeEdit()
        }
      },
      checkedAll() {
        this.isCheckedAll = !this.isCheckedAll
        this.carts.forEach(x => this.$set(x, 'checked', this.isCheckedAll))
      },
      removeEdit() {
        this.isRemoveEdit = !this.isRemoveEdit
      },
      commit() {
        console.log(this.carts.filter(x => x.checked).map(x => x.id))
        // uni.showToast({
        //   icon: 'none',
        //   title: '提交订单'
        // })
        app.$navigateTo('/pages/order/create?cartIds=')
      },
      remove() {
        console.log(this.carts.filter(x => x.checked).map(x => x.id))
        uni.showToast({
          icon: 'none',
          title: '删除选中'
        })
      }
    }
  }
</script>

<style>
  .header {
    /* HBuilder X 3.2.12显示正常，但是在HBuilder X 3.2.9不加!important则header无法定位，不知道其他版本还有没有这样的，如果有，请自行加上!important即可 */
    position: absolute !important;
    top: 0;
    right: 0;
    left: 0;
    z-index: 101;
  }

  .scroll-view {
    border-radius: 0 0 28px 28px;
    /* 这里的overflow会造成iOS H5切换tab header闪烁，开始会无法覆盖，然后才被覆盖 */
    /* overflow: hidden; */
    transition-property: background-color;
    transition-duration: 0.25s;
  }

  .scroller {
    /* 安卓上transition-property可真是不能乱设啊，又被坑了，设置了transition-property在安卓nvue上height就不管用了 */
    /* transition-property: background-color;
    transition-duration: 0.25s; */
  }

  .item-padding-top {
    width: 750rpx;
    height: 28px;
  }

  .item {
    flex-direction: row;
    justify-content: space-between;
    padding: 0 28px 28px 28px;
  }

  .item-left {
    flex-direction: row;
    align-items: center;
    flex: 1;
  }

  .item-checkbox-icon {
    font-size: 20px;
    color: #9093A2;
  }

  .item-image-wrap {
    margin-left: 12px;
  }

  .item-image {
    width: 88px;
    height: 88px;
    border-radius: 12px;
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
  }

  .item-info {
    margin: 0 18px;
  }

  .item-title {
    line-height: 19.5px;
    font-size: 15px;
    font-weight: 700;
  }

  .item-spec {
    margin-top: 4px;
    font-size: 15px;
    font-weight: 700;
    color: #808080;
  }

  .item-price {
    margin-top: 10px;
    font-size: 13px;
  }

  .item-right {
    height: 88px;
  }

  .footer {
    flex-direction: row;
    justify-content: center;
    padding: 28px 0;
  }

  .footer-btn {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 58px;
    padding: 0 28px;
    border-radius: 12px;
    /* background-color: #F76842; */
    /* 卧槽！！！！过分了啊，transition-property居然连justify-content: center;都能影响，绝了 */
    /* transition-property: background-color;
    transition-duration: 0.25s; */
  }

  .footer-submit-label {
    font-size: 15px;
    font-weight: 700;
    color: #FFFFFF;
  }

  .footer-submit-amount {
    font-size: 14px;
    color: #FFFFFF;
  }

  .footer-remove-btn {
    /* 卧槽！！！！过分了啊，transition-property居然连justify-content: center;都能影响，绝了 */
    justify-content: center;
  }

  .footer-remove-label {
    font-size: 15px;
    font-weight: 700;
  }
</style>
