<template>
  <view class="em-header-wrap" :style="[{'box-shadow': styles.wrap['box-shadow']}]">
    <view class="em-header-bg-wrap" :style="[{'opacity': styles.wrap['opacity']}]">
      <view class="em-header-bg" :style="[{'background-color': styles.wrap['background-color']}]"></view>
    </view>
    <view class="em-header" :style="[{'padding-top': styles.wrap['padding-top'], 'padding-bottom': styles.wrap['padding-bottom']}]">
      <view class="em-header-content" :style="[styles.content]">
        <text class="em-header-title" :style="[styles.title]">{{title}}</text>
        <view class="em-header-left">
          <view class="em-header-btn em-header-left-btn" v-for="(x, xi) in leftBtns" :key="xi" :class="[x.name]" :ref="x.name" :style="[x.styles.btn]" @click="clickBtn('left', xi)">
            <em-icon class="em-header-btn-icon" :unicode="x.iconUnicode" :style="[x.styles.icon]"></em-icon>
          </view>
          <slot name="left"></slot>
          <!-- #ifdef MP-WEIXIN -->
          <view class="em-header-btn em-header-left-btn" v-for="(x, xi) in rightBtns" :key="xi" :class="[x.name]" :ref="x.name" :style="[x.styles.btn]" @click="clickBtn('right', xi)">
            <em-icon class="em-header-btn-icon" :unicode="x.iconUnicode" :style="[x.styles.icon]"></em-icon>
          </view>
          <slot name="right"></slot>
          <!-- #endif -->
        </view>
        <view class="em-header-right">
          <!-- #ifndef MP-WEIXIN -->
          <view class="em-header-btn em-header-right-btn" v-for="(x, xi) in rightBtns" :key="xi" :class="[x.name]" :ref="x.name" :style="[x.styles.btn]" @click="clickBtn('right', xi)">
            <em-icon class="em-header-btn-icon" :unicode="x.iconUnicode" :style="[x.styles.icon]"></em-icon>
          </view>
          <slot name="right"></slot>
          <!-- #endif -->
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
      leftBtns: {
        type: Array,
        default: () => []
      },
      rightBtns: {
        type: Array,
        default: () => []
      },
      title: String
    },
    data() {
      return {
        styles: {
          wrap: {
            'background-color': 'rgba(0,0,0,0)', // old:先暂时不给初始值，因为在微信小程序端会触发背景色过渡效果，new:不给值在微信小程序没有默认值会无法切换主题，所以给个透明值
            'opacity': '1',
            'box-shadow': '0 0 4px #E0E0E0',
            'padding-top': `${systemInfo.headerStyle.paddingTop}px`,
            'padding-bottom': `${systemInfo.headerStyle.paddingBottom}px`
          },
          content: {
            'height': `${systemInfo.headerStyle.height}px`
          },
          title: {
            'color': '#292929',
            'opacity': '1'
          }
        }
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
      }
    },
    methods: {
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
    position: relative;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 28px;
    border-bottom-right-radius: 28px;
    /* 当前元素为overflow: hidden;时在iOS上，外层或同级元素如果是overflow: scroll;切换页面再回到页面，未显示的滚动区域的内容或暂时被高层的内容遮挡会出现被隐藏的情况 */
    /* 这里的阴影样式就会被遮掉一部分 */
    /* overflow: hidden; */
  }

  .em-header {
    /* 在nvue中z-index不起作用，但是position: sticky;层级要比absolute高些，所以这里用这个 */
    /* position: sticky;在nvue中会透过swiper */
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
  }

  .em-header-bg-wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition-property: opacity;
    transition-duration: 0.25s;
  }

  .em-header-bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /* 这样设置border-radius，会导致iOS nvue opacity失效，又是个离谱的坑，把opacity放到外层去吧，不能放一起 */
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 28px;
    border-bottom-right-radius: 28px;
    /* transition-property: background-color;transition-duration: 0.25s;不能与box-shadow一起使用，否则box-shadow在安卓nvue无法切换样式，比如动态切换颜色 */
    transition-property: background-color;
    transition-duration: 0.25s;
  }

  .em-header-content {
    position: relative;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 36px;
  }

  .em-header-title {
    flex: 1;
    text-align: center;
    font-size: 15px;
    font-weight: 700;
  }

  .em-header-left {
    position: absolute;
    left: 0;
    z-index: 10;
    flex-direction: row;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
  }

  .em-header-right {
    position: absolute;
    right: 0;
    z-index: 10;
    flex-direction: row;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
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

  .em-header-left-btn {
    margin-right: 16px;
    /* background-color: #F76842; */
    transition-property: background-color;
    transition-duration: 0.25s;
  }

  .em-header-right-btn {
    margin-left: 16px;
    /* background-color: #393939; */
    transition-property: background-color;
    transition-duration: 0.25s;
  }

  .em-header-btn-icon {
    display: flex;
    align-items: center;
    font-size: 17px;
    color: #FFFFFF;
  }
</style>
