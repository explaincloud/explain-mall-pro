<template>
  <em-page class="tab-demo" :em-styles="pageStyles">
    <em-scroller class="scroller">
      <em-header-inset></em-header-inset>
      <text :style="[$em.$getThemeStyle(['color-1'])]">demo tab基本页面结构</text>
      <em-tab-bar-inset></em-tab-bar-inset>
    </em-scroller>
    <em-header class="header" title="示例" :em-styles="headerStyles"></em-header>
  </em-page>
</template>

<script>
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

      }
    },
    computed: {
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
      }
    },
    created() {
      // 因为nvue不支持挂载vue实例方法，但是又可以通过getApp()获取到vue实例和所挂载的方法，然后将this.$em替换，这样模板中就可以使用$em调用vue实例方法了
      this.$em = app.$em
    },
    methods: {
      load() {
        console.log('demo on load')
      },
      show() {
        console.log('demo on show')
      },
      hide() {
        console.log('demo on hide')
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
</style>
