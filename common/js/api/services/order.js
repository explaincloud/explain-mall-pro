export default {

  getOrderList(data) {
    /* 模拟请求，真实请求请直接替换以下代码，但要保证返回对象是Promise，并保证数据格式，如数据格式不一致则需要重写格式 */
    return new Promise((resolve, reject) => {
      resolve({
        code: 0,
        data: [{
          id: '726766',
          createTime: '2020年12年09日',
          type: data.type,
          goods: [{
            id: '10000001',
            image: '/static/img/goods/1.png',
            title: '时尚女士鞋',
            spec: '颜色米白 尺码41',
            price: 192.00,
            quantity: 2
          }, {
            id: '10000001',
            image: '/static/img/goods/1.png',
            title: '时尚女士鞋',
            spec: '颜色米白 尺码41',
            price: 192.00,
            quantity: 3
          }]
        }, {
          id: '726766',
          createTime: '2020年12年09日',
          type: data.type,
          goods: [{
            id: '10000001',
            image: '/static/img/goods/1.png',
            title: '时尚女士鞋',
            spec: '颜色米白 尺码41',
            price: 192.00,
            quantity: 2
          }]
        }, {
          id: '726766',
          createTime: '2020年12年09日',
          type: data.type,
          goods: [{
            id: '10000001',
            image: '/static/img/goods/1.png',
            title: '时尚女士鞋',
            spec: '颜色米白 尺码41',
            price: 192.00,
            quantity: 1
          }, {
            id: '10000001',
            image: '/static/img/goods/1.png',
            title: '时尚女士鞋',
            spec: '颜色米白 尺码41',
            price: 192.00,
            quantity: 10
          }]
        }],
        total: 3
      })
    })
  },

  getOrderInfo(data) {
    /* 模拟请求，真实请求请直接替换以下代码，但要保证返回对象是Promise，并保证数据格式，如数据格式不一致则需要重写格式 */
    return new Promise((resolve, reject) => {
      resolve({
        code: 0,
        data: {
          id: data.id,
          createTime: '2020年12年09日',
          state: '待付款',
          goods: [{
            id: '10000001',
            image: '/static/img/goods/1.png',
            title: '时尚女士鞋',
            spec: '颜色米白 尺码41',
            price: 192.00,
            quantity: 2
          }, {
            id: '10000001',
            image: '/static/img/goods/1.png',
            title: '时尚女士鞋',
            spec: '颜色米白 尺码41',
            price: 192.00,
            quantity: 3
          }, {
            id: '10000001',
            image: '/static/img/goods/1.png',
            title: '时尚女士鞋',
            spec: '颜色米白 尺码41',
            price: 192.00,
            quantity: 3
          }]
        }
      })
    })
  }

}
