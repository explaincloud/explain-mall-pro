<template>
  <view class="em-number-box-wrap">
    <view class="em-number-box" :style="[{'background-color': styles.wrap['background-color']}]">
      <view class="em-number-box-plus" :style="[plusBtn.styles.btn]" @click="plus">
        <em-icon class="em-number-box-plus-icon" :style="[plusBtn.styles.icon]" :unicode="plusBtn.iconUnicode"></em-icon>
      </view>
      <!-- input很影响微信小程序性能，打开性能面板调试发现初次渲染耗时久，能感觉到明显卡顿，所以先用text显示数量，点击时再触发input -->
      <input class="em-number-box-input" :style="[styles.input]" type="number" v-model="number" v-if="inputting" :focus="inputting" @blur="blurInput" />
      <view class="em-number-box-input" v-else @click="clickInput">
        <text class="em-number-box-input-text" :style="[{'color': styles.input['color']}]">{{number}}</text>
      </view>
      <view class="em-number-box-minus" :style="[minusBtn.styles.btn]" @click="minus">
        <em-icon class="em-number-box-minus-icon" :style="[minusBtn.styles.icon]" :unicode="minusBtn.iconUnicode"></em-icon>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'em-number-box',
    props: {
      value: {
        type: Number,
        default: 0
      },
      plusBtn: {
        type: Object,
        default: () => {
          return {
            iconUnicode: '\uea13',
            styles: {
              btn: {
                // 'background-color': '#F6F6F6'
              },
              icon: {
                'color': '#F76842'
              }
            }
          }
        }
      },
      minusBtn: {
        type: Object,
        default: () => {
          return {
            iconUnicode: '\uf1af',
            styles: {
              btn: {
                // 'background-color': '#F6F6F6'
              },
              icon: {
                'color': '#393939'
              }
            }
          }
        }
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
        styles: {
          wrap: {
            // 'background-color': '#F6F6F6'
          },
          input: {
            'color': '#393939'
          }
        },
        number: 0,
        inputting: false
      }
    },
    watch: {
      value: {
        handler(val) {
          this.number = val
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
    methods: {
      plus() {
        this.number++
        this.$emit('input', this.number)
      },
      minus() {
        this.number--
        this.$emit('input', this.number)
      },
      clickInput() {
        this.inputting = true
      },
      blurInput() {
        this.inputting = false
        try {
          this.number = parseInt(this.number)
          if (isNaN(this.number)) {
            throw ''
          }
        } catch (e) {
          this.number = this.value
        }
        this.$emit('input', this.number)
      }
    }
  }
</script>

<style>
  .em-number-box {
    width: 48px;
    border-radius: 12px;
    overflow: hidden;
    transition-property: background-color;
    transition-duration: 0.25s;
  }

  .em-number-box-plus {
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 35px;
  }

  .em-number-box-plus-icon {
    font-size: 18px;
    font-weight: 700;
  }

  .em-number-box-minus {
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 35px;
  }

  .em-number-box-minus-icon {
    font-size: 18px;
    font-weight: 700;
    color: #9093A2;
  }

  .em-number-box-input {
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 18px;
    margin: 0 4px;
    text-align: center;
    font-size: 13px;
    color: #666666;
    overflow: hidden;
    text-overflow: ellipsis;
    /* #ifndef APP-NVUE */
    min-height: 18px;
    display: block;
    white-space: nowrap;
    /* #endif */
  }

  .em-number-box-input-text {
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: #666666;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    lines: 1;
    /* #ifndef APP-NVUE */
    display: block;
    white-space: nowrap;
    /* #endif */
  }
</style>
