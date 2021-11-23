export default {

  getCartList() {
    /* 模拟请求，真实请求请直接替换以下代码，但要保证返回对象是Promise，并保证数据格式，如数据格式不一致则需要重写格式 */
    return new Promise((resolve, reject) => {
      resolve({
        code: 0,
        data: [{
          id: '10000001',
          image: '/static/img/goods/1.png',
          title: '时尚女士鞋',
          price: 192.00,
          spec: '颜色米白 尺码41',
          quantity: 10,
          stock: 5
        }, {
          id: '10000001',
          image: '/static/img/goods/2.png',
          title: '时尚女士鞋',
          price: 192.00,
          spec: '颜色米白 尺码41',
          quantity: 1
        }, {
          id: '10000001',
          title: '时尚女士鞋',
          image: '/static/img/goods/1.png',
          price: 192.00,
          spec: '颜色米白 尺码41',
          quantity: 1
        }, {
          id: '10000001',
          image: '/static/img/goods/2.png',
          title: '时尚女士鞋',
          price: 192.00,
          spec: '颜色米白 尺码41',
          quantity: 1
        }, {
          id: '10000001',
          image: '/static/img/goods/1.png',
          title: '时尚女士鞋',
          price: 192.00,
          spec: '颜色米白 尺码41',
          quantity: 1
        }, {
          id: '10000001',
          image: '/static/img/goods/2.png',
          title: '时尚女士鞋',
          price: 192.00,
          spec: '颜色米白 尺码41',
          quantity: 1
        }, {
          id: '10000001',
          image: '/static/img/goods/1.png',
          title: '时尚女士鞋',
          price: 192.00,
          spec: '颜色米白 尺码41',
          quantity: 1
        }, {
          id: '10000001',
          image: '/static/img/goods/2.png',
          title: '时尚女士鞋',
          price: 192.00,
          spec: '颜色米白 尺码41',
          quantity: 1
        }, {
          id: '10000001',
          image: '/static/img/goods/1.png',
          title: '时尚女士鞋',
          price: 192.00,
          spec: '颜色米白 尺码41',
          quantity: 1
        }],
        total: 10
      })
    })
  }

}
