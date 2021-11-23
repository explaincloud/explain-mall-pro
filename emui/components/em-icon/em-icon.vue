<template>
  <text class="em-icon" :class="[name]">{{unicode}}</text>
</template>

<script>
  // Remix Icon v2.5.0
  // #ifdef APP-NVUE
  import remixicon from './iconfont/remixicon/remixicon.js'

  const dom = uni.requireNativePlugin('dom')
  dom.addRule('fontFace', {
    'fontFamily': 'remixicon',
    'src': `url('${remixicon}')`
  })
  // #endif

  export default {
    name: 'em-icon',
    props: {
      name: {
        type: String,
        default: 'remixicon'
      },
      unicode: String
    }
  }
</script>

<style>
  /* 引入remixicon图标库 */
  /* #ifndef APP-NVUE */
  @import './iconfont/remixicon/remixicon.css';
  /* #endif */

  /* #ifdef APP-NVUE */

  .remixicon {
    font-family: remixicon !important;
    font-style: normal;
  }

  /* #endif */

  /* #ifdef MP-WEIXIN */
  
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* #endif */
</style>
