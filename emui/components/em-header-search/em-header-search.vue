<template>
  <view class="em-header-wrap" :style="[{'box-shadow': styles.wrap['box-shadow']}]">
    <view class="em-header" :style="[{'background-color': styles.wrap['background-color'], 'padding-top': styles.wrap['padding-top'], 'padding-bottom': styles.wrap['padding-bottom']}]">
      <view class="em-header-content" :style="[styles.content]">
        <view class="em-header-left">
          <view class="em-header-btn em-header-left-btn" v-for="(x, xi) in leftBtns" :key="xi" :class="[x.name]" :ref="x.name" :style="[x.styles.btn]" @click="clickBtn('left', xi)">
            <em-icon class="em-header-btn-icon" :unicode="x.iconUnicode" :style="[x.styles.icon]"></em-icon>
          </view>
        </view>
        <view class="em-header-input-wrap" :style="{'background-color': `${styles.input['background-color']}`}">
          <input class="em-header-input" :style="{'color': `${styles.input['color']}`}" type="text" v-model="keywords" @input="input" confirm-type="search" @confirm="clickSearchBtn" :placeholder="placeholder" placeholder-class="em-header-input-placeholder" :placeholder-style="`color: ${styles.placeholder['color']}`" />
        </view>
        <view class="em-header-btn em-header-search-btn" :style="[{'margin-right': `${marginRight}px`}, searchBtn.styles.btn]" @click="clickSearchBtn">
          <em-icon class="em-header-btn-icon" :style="[searchBtn.styles.icon]" :unicode="searchBtn.iconUnicode"></em-icon>
        </view>
      </view>
    </view>
  </view>
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
    name: 'em-header',
    props: {
      emStyles: {
        type: Object,
        default: () => {
          return {}
        }
      },
      searchBtn: {
        type: Object,
        default: () => {
          return {
            iconUnicode: '\uf0d1',
            styles: {
              btn: {
                'background-color': '#F76842'
              },
              icon: {
                'color': '#FFFFFF'
              }
            }
          }
        }
      },
      leftBtns: {
        type: Array,
        default: () => []
      },
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '搜索商品...'
      }
    },
    data() {
      return {
        styles: {
          wrap: {
            // 'background-color': '#FFFFFF', // 先暂时不给初始值，因为在小程序端会触发背景色过渡效果
            'background-color': 'rgba(0,0,0,0)',
            'box-shadow': '0 0 4px #E0E0E0',
            'padding-top': `${systemInfo.headerStyle.paddingTop}px`,
            'padding-bottom': `${systemInfo.headerStyle.paddingBottom}px`
          },
          content: {
            'height': `${systemInfo.headerStyle.height}px`
          },
          input: {
            // 'background-color': '#F6F6F6', // 先暂时不给初始值，因为在小程序端会触发背景色过渡效果
            'background-color': 'rgba(0,0,0,0)',
            'color': '#292929'
          },
          placeholder: {
            'color': '#999999'
          }
        },
        keywords: ''
      }
    },
    watch: {
      emStyles: {
        handler(val) {
          Object.keys(this.styles).forEach(key => {
            var style = this.styles[key]
            var emStyle = this.emStyles[key]
            if (emStyle && typeof emStyle === 'object') {
              this.styles[key] = Object.assign(style, emStyle)
            }
          })
        },
        immediate: true,
        deep: true
      },
      value: {
        handler(val) {
          this.keywords = val
        },
        immediate: true,
        deep: true
      }
    },
    computed: {
      marginRight() {
        let result = 0
        // #ifdef MP-WEIXIN
        let systemInfo = uni.getSystemInfoSync()
        let menuButtonBoundingClientRect = uni.getMenuButtonBoundingClientRect()
        result = (systemInfo.windowWidth - menuButtonBoundingClientRect.right) + menuButtonBoundingClientRect.width - 14
        // #endif
        return result
      }
    },
    methods: {
      input(e) {
        this.$emit('input', e.detail.value)
      },
      clickSearchBtn() {
        this.$emit('confirm', {
          value: this.keywords
        })
      },
      clickBtn(position, index) {
        this.$emit('clickBtn', {
          position,
          index
        })
      }
    }
  }
</script>

<style>
  .em-header-wrap {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 28px;
    border-bottom-right-radius: 28px;
    /* 当前元素为overflow: hidden;时在iOS上，外层或同级元素如果是overflow: scroll;切换页面再回到页面，未显示的滚动区域的内容或暂时被高层的内容遮挡会出现被隐藏的情况 */
    /* overflow: hidden; */
  }

  .em-header {
    /* 在nvue中z-index不起作用，但是position: sticky;层级要比absolute高些，所以这里用这个 */
    /* position: sticky;在nvue中会透过swiper */
    /* 取消使用position，将浮动决定权交由外层使用组件的元素 */
    /* position: sticky; */
    /* position: relative;
    z-index: 999;
    top: 0;
    right: 0;
    left: 0; */
    padding-top: 16px;
    padding-right: 28px;
    padding-bottom: 16px;
    padding-left: 28px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 28px;
    border-bottom-right-radius: 28px;
    /* 当前元素为overflow: hidden;时在iOS上，外层或同级元素如果是overflow: scroll;切换页面再回到页面，未显示的滚动区域的内容或暂时被高层的内容遮挡会出现被隐藏的情况 */
    /* overflow: hidden; */
    /* transition-property: background-color;transition-duration: 0.25s;不能与box-shadow一起使用，否则box-shadow在安卓nvue无法切换样式，比如动态切换颜色 */
    transition-property: background-color;
    transition-duration: 0.25s;
  }

  .em-header-content {
    position: relative;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 36px;
  }

  .em-header-input-wrap {
    flex: 1;
    height: 36px;
    padding: 0 16px;
    border-radius: 9px;
    /* background-color: #F6F6F6; */
    transition-property: background-color;
    transition-duration: 0.25s;
  }

  .em-header-input {
    flex: 1;
    font-size: 14px;
    color: #292929;
  }

  .em-header-input-placeholder {
    color: #999999;
  }

  .em-header-btn {
    position: relative;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 9px;
    /* 当前元素为overflow: hidden;时在iOS上，外层或同级元素如果是overflow: scroll;切换页面再回到页面，未显示的滚动区域的内容或暂时被高层的内容遮挡会出现被隐藏的情况 */
    /* overflow: hidden; */
  }

  .em-header-btn-icon {
    display: flex;
    align-items: center;
    font-size: 17px;
    color: #FFFFFF;
  }

  .em-header-search-btn {
    margin-left: 10px;
    margin-right: 0px;
    /* background-color: #F76842; */
    transition-property: background-color;
    transition-duration: 0.25s;
  }
  
  .em-header-left-btn {
    margin-right: 16px;
    /* background-color: #F76842; */
    transition-property: background-color;
    transition-duration: 0.25s;
  }
</style>
