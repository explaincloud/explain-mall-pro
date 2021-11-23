<template>
  <view class="em-page-wrap">
    <view class="em-page" :style="[styles.wrap]">
      <slot></slot>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'em-page', // em全称，explain-mall，表示explain商城UI组件库
    props: {
      emStyles: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        styles: {
          wrap: {
            'background-color': 'rgba(0,0,0,0)'
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
    }
  }
</script>

<style>
  .em-page-wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  /* #ifdef MP-WEIXIN */

  :host {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    align-content: flex-start;
  }

  /* #endif */

  .em-page {
    flex: 1;
    transition-property: background-color;
    transition-duration: 0.25s;
  }
</style>
