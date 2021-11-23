<template>
  <view class="em-tab-wrap">
    <view class="em-tab" :style="[{'background-color': styles.wrap['background-color']}]">
      <view class="em-tab-box" :style="{'transform': `translateX(${(-(currentIndex-xi))*systemInfo.windowWidth}px)`}" v-for="(x, xi) in pages" :key="xi">
        <view class="em-tab-body" v-if="x.load">
          <slot :tab="x"></slot>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'em-tab',
    props: {
      list: {
        type: Array,
        default: () => []
      },
      current: {
        type: Number,
        default: 0
      },
      emStyles: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        systemInfo: uni.getSystemInfoSync(),
        tabs: [],
        pages: [],
        currentIndex: 0,
        previousIndex: 0,
        styles: {
          wrap: {
            // 'background-color': '#FFFFFF'
            'background-color': 'rgba(0,0,0,0)'
          }
        }
      }
    },
    watch: {
      current: {
        handler(index) {
          if (this.pages.length > 0) {
            let pageIndex = this.pages.indexOf(this.pages.filter(x => x.name === this.tabs[index].name)[0])
            this.switchTab(pageIndex)
          }
        }
      },
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
    mounted() {
      let tabs = []
      let pages = []
      // 组成pages
      this.list.forEach(tab => {
        tabs.push(tab)
        if (!tab.noPage) {
          pages.push({
            ...tab,
            load: false
          })
        }
      })
      this.tabs = tabs
      this.pages = pages
      // 得到current在pages中的索引，因为可能包含不带page的tab，要去除，去除后current不一定是pages中的索引，要重新获取一遍
      let pageIndex = this.pages.indexOf(this.pages.filter(x => x.name === this.tabs[this.current].name)[0])
      // 切换到对应page索引的tab
      this.switchTab(pageIndex)
    },
    methods: {
      switchTab(index) {
        this.previousIndex = this.currentIndex
        this.currentIndex = index
        this.pages[index].load = true
        this.changeTab(index)
      },
      changeTab(index) {
        // 此时的index是pages的index，所以要获取在tabs里的index
        let currIndex = this.tabs.indexOf(this.tabs.filter(x => x.name === this.pages[this.currentIndex].name)[0])
        let prevIndex = this.tabs.indexOf(this.tabs.filter(x => x.name === this.pages[this.previousIndex].name)[0])
        this.$emit('change', {
          detail: {
            current: currIndex,
            previous: prevIndex
          }
        })
      }
    }
  }
</script>

<style>
  .em-tab-wrap {
    flex: 1;
  }

  /* #ifdef MP-WEIXIN */

  :host {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    align-content: flex-start;
  }

  /* scoped-slots-default {
    height: 100%;
  } */

  .scoped-ref {
    height: 100%;
  }

  /* #endif */

  .em-tab {
    flex: 1;
    transition-property: background-color;
    transition-duration: 0.25s;
  }

  .em-tab-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .em-tab-body {
    flex: 1;
  }
</style>
