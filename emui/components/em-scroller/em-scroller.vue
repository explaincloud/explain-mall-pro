<template>
  <view class="em-scroller-wrap">
    <!-- #ifdef APP-NVUE -->
    <scroller class="em-scroller" ref="scroller" scroll-direction="vertical" @scroll="scroll">
      <slot />
    </scroller>
    <!-- #endif -->
    <!-- #ifndef APP-NVUE -->
    <scroll-view class="em-scroller" scroll-y @scroll="scroll" :scroll-top="scrollTop">
      <slot />
    </scroll-view>
    <!-- #endif -->
  </view>
</template>

<script>
  // #ifdef APP-NVUE
  const dom = uni.requireNativePlugin('dom')
  // #endif

  export default {
    name: 'em-scroller',
    props: {
      scrollTop: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {

      }
    },
    methods: {
      scroll(e) {
        // 不使用scroller自带loadmore
        // #ifdef APP-NVUE
        dom.getComponentRect(this.$refs.scroller, options => {
          let scrollTop = -e.contentOffset.y
          let scrollBottom = Math.floor(e.contentSize.height - scrollTop - options.size.height)
          this.$emit('scroll', {
            scrollTop,
            scrollBottom
          })
        })
        // #endif
        // #ifndef APP-NVUE
        uni.createSelectorQuery().in(this).selectAll('.em-scroller').boundingClientRect(rects => {
          let scrollTop = e.detail.scrollTop
          let scrollBottom = Math.floor(e.detail.scrollHeight - scrollTop - rects[0].height)
          this.$emit('scroll', {
            scrollTop,
            scrollBottom
          })
        }).exec()
        // #endif
      }
    }
  }
</script>

<style>
  .em-scroller-wrap {
    /* position: relative; */
  }

  /* #ifdef MP-WEIXIN */

  .em-scroller-wrap {
    flex: 1;
  }

  :host {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    align-content: flex-start;
  }

  /* #endif */

  .em-scroller {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
