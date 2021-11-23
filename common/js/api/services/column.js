export default {

  getColumnList() {
    /* 模拟请求，真实请求请直接替换以下代码，但要保证返回对象是Promise，并保证数据格式，如数据格式不一致则需要重写格式 */
    return new Promise((resolve, reject) => {
      resolve({
        code: 0,
        data: [{
          title: '新品',
          goods: [{
            id: '10000001',
            image: '/static/img/goods/1.png',
            title: '原创设计女装',
            price: 23.00
          }, {
            id: '10000001',
            image: '/static/img/goods/2.png',
            title: '原创设计女装',
            price: 23.00
          }, {
            id: '10000001',
            image: '/static/img/goods/1.png',
            title: '原创设计女装',
            price: 23.00
          }, {
            id: '10000001',
            image: '/static/img/goods/2.png',
            title: '原创设计女装',
            price: 23.00
          }]
        }, {
          title: '女装',
          goods: [{
            id: '10000001',
            image: '/static/img/goods/2.png',
            title: '原创设计女装',
            price: 23.00
          }, {
            id: '10000001',
            image: '/static/img/goods/1.png',
            title: '原创设计女装',
            price: 23.00
          }, {
            id: '10000001',
            image: '/static/img/goods/2.png',
            title: '原创设计女装',
            price: 23.00
          }, {
            id: '10000001',
            image: '/static/img/goods/1.png',
            title: '原创设计女装',
            price: 23.00
          }]
        }],
        total: 2
      })
    })
  }

}
