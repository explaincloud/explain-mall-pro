<template>
  <view class="em-tab-bar-wrap" :style="[{'box-shadow': styles.wrap['box-shadow']}]">
    <view class="em-tab-bar" :style="[{'background-color': styles.wrap['background-color']}]">
      <view class="em-tab-bar-item" v-for="(x, xi) in tabBarList" :key="xi" @click="clickTabBar(x, xi)">
        <view class="em-tab-bar-item-box" v-if="isSelected(x)">
          <text class="em-tab-bar-item-text-active" :style="[styles.itemTextActive]">{{x.text}}</text>
          <view class="em-tab-bar-item-oval-active" :style="[styles.itemOvalActive]"></view>
        </view>
        <view class="em-tab-bar-item-box" v-else>
          <em-icon class="em-tab-bar-item-icon" :style="[styles.itemIcon]" :name="x.iconName" :unicode="x.iconUnicode"></em-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'em-tab-bar',
    props: {
      list: {
        type: Array,
        default: () => {
          return []
        }
      },
      current: {
        type: Number,
        default: 0
      },
      /* 底部导航栏启用分组，启用后当导航项数量超出每组所设数量时会出现切换底部导航栏按钮，点击会对底部导航栏切换组 */
      enableGroup: {
        type: Boolean,
        default: false
      },
      /* 底部导航栏分组每组导航项数量 */
      eachGroupQuantity: {
        type: Number,
        default: 4
      },
      /* 切换组的图标库名称 */
      switchGroupIconName: {
        type: String,
        default: 'remixicon'
      },
      /* 切换组的图标字符编码 */
      switchGroupIconUnicode: {
        type: String,
        default: '\uea62'
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
        tabs: [],
        currentIndex: 0,
        groupCurrentIndex: 0,
        styles: {
          wrap: {
            // 'background-color': '#FFFFFF',
            'background-color': 'rgba(0,0,0,0)',
            'box-shadow': '0 0 4px #E0E0E0'
          },
          itemTextActive: {
            'color': '#F76842'
          },
          itemOvalActive: {
            // 'background-color': '#F76842'
            'background-color': 'rgba(0,0,0,0)'
          },
          itemIcon: {
            'color': '#292929'
          }
        }
      }
    },
    watch: {
      list: {
        handler(val) {
          let tabs = []
          val.forEach(tab => {
            tabs.push({
              ...tab
            })
          })
          this.tabs = tabs
        },
        immediate: true,
        deep: true
      },
      current: {
        handler(index) {
          this.switchTabBar(index)
          this.switchGroup(Math.ceil((index + 1) / this.eachGroupQuantity) - 1)
        },
        immediate: true,
        deep: true
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
    computed: {
      tabBarList() {
        let list = this.tabs
        if (this.enableGroup) {
          list = this.tabs.slice(
            this.groupCurrentIndex * this.eachGroupQuantity,
            (this.groupCurrentIndex + 1) * this.eachGroupQuantity
          )
          list.push({
            name: 'switch',
            text: '切换',
            iconName: this.switchGroupIconName,
            iconUnicode: this.switchGroupIconUnicode,
            noSelect: true
          })
        }
        return list
      }
    },
    methods: {
      switchTabBar(index) {
        this.currentIndex = index
      },
      clickTabBar(item, index) {
        if (item.name === 'switch') {
          this.switchGroup()
          this.$emit('clickSwitch')
          return
        }
        // 获取到tabs的index
        let tabIndex = this.tabs.indexOf(this.tabs.filter(x => x.name === item.name)[0])
        // noSelect为true为不可被选中状态
        if (!item.noSelect) {
          this.currentIndex = tabIndex
        }
        this.$emit('click', {
          index: tabIndex,
          detail: item
        })
      },
      switchGroup(index) {
        if (typeof index != 'number') {
          index = this.groupCurrentIndex
          index++
          let groupQuantity = Math.ceil(this.tabs.length / this.eachGroupQuantity)
          if (index >= groupQuantity) {
            index = 0
          }
        }
        this.groupCurrentIndex = index
      },
      isSelected(tab) {
        return this.tabs.indexOf(this.tabs.filter(x => x.name === tab.name)[0]) == this.currentIndex
      }
    }
  }
</script>

<style>
  .em-tab-bar-wrap {
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
    overflow: hidden;
    box-shadow: 0 0 4px #E0E0E0;
  }

  .em-tab-bar {
    flex-direction: row;
    justify-content: space-between;
    height: 70px;
    padding: 0 28px;
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
    overflow: hidden;
    /* 在安卓nvue，如果在样式中写了transition-property: background-color;会导致改变box-shadow样式失效，又是一个神奇的坑。解决方法是将它们分为两个层来写样式 */
    transition-property: background-color;
    transition-duration: 0.25s;
    /* background-color: #FFFFFF; */
  }

  .em-tab-bar-item {
    flex: 1;
  }

  .em-tab-bar-item-box {
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  .em-tab-bar-item-icon {
    font-size: 20px;
    font-weight: 700;
    color: #292929;
  }

  .em-tab-bar-item-text-active {
    font-size: 16px;
    font-weight: 700;
    color: #F76842;
  }

  .em-tab-bar-item-oval-active {
    width: 5px;
    height: 5px;
    margin-top: 5px;
    border-radius: 5px;
    /* background-color: #F76842; */
  }
</style>
