export default {

  getGoodsList({
    pageIndex,
    pageSize
  }) {
    /* 模拟请求，真实请求请直接替换以下代码，但要保证返回对象是Promise，并保证数据格式，如数据格式不一致则需要重写格式 */
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: [{
            id: '10000001',
            image: '/static/img/goods/1.png',
            title: '原创设计瓶子',
            price: 23.00
          }, {
            id: '10000001',
            image: '/static/img/goods/2.png',
            title: '原创设计瓶子',
            price: 23.00
          }, {
            id: '10000001',
            image: '/static/img/goods/2.png',
            title: '原创设计瓶子',
            price: 23.00
          }, {
            id: '10000001',
            image: '/static/img/goods/1.png',
            title: '原创设计瓶子',
            price: 23.00
          }, {
            id: '10000001',
            image: '/static/img/goods/1.png',
            title: '原创设计瓶子',
            price: 23.00
          }, {
            id: '10000001',
            image: '/static/img/goods/2.png',
            title: '原创设计瓶子',
            price: 23.00
          }, {
            id: '10000001',
            image: '/static/img/goods/2.png',
            title: '原创设计瓶子',
            price: 23.00
          }, {
            id: '10000001',
            image: '/static/img/goods/1.png',
            title: '原创设计瓶子',
            price: 23.00
          }],
          total: 24
        })
      }, 1000)
    })
  },

  getGoodsInfo() {
    /* 模拟请求，真实请求请直接替换以下代码，但要保证返回对象是Promise，并保证数据格式，如数据格式不一致则需要重写格式 */
    return new Promise((resolve, reject) => {
      resolve({
        code: 0,
        data: {
          pictures: [{
            url: '/static/img/goods/1.png'
          }, {
            url: '/static/img/goods/2.png'
          }],
          properties: [{
            label: '选择颜色',
            options: [{
              label: '白色'
            }, {
              label: '黑色',
              checked: true
            }, {
              label: '浅蓝色'
            }, {
              label: '支持nvue超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长换行'
            }]
          }, {
            label: '选择尺寸',
            options: [{
              label: '36',
              checked: true
            }, {
              label: '37'
            }, {
              label: '38'
            }, {
              label: '39'
            }, {
              label: '40'
            }, {
              label: '41'
            }, {
              label: '42'
            }]
          }],
          details: [{
            type: 'image',
            url: '/static/img/goods/1.png'
          }, {
            type: 'image',
            url: '/static/img/goods/1.png'
          }, {
            type: 'image',
            url: '/static/img/goods/1.png'
          }],
          score: 4
        }
      })
    })
  }

}
