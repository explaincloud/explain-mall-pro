export default {

  getHotList() {
    /* 模拟请求，真实请求请直接替换以下代码，但要保证返回对象是Promise，并保证数据格式，如数据格式不一致则需要重写格式 */
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: [{
            id: '10000001',
            image: '/static/img/hot/1.jpg',
            title: 'Burberry 女士连衣裙',
            referencePrice: 2300.00,
            price: 1800.00
          }, {
            id: '10000001',
            image: '/static/img/hot/2.jpg',
            title: 'Capulet 束腰连衣裙',
            referencePrice: 251.65,
            price: 196.00
          }, {
            id: '10000001',
            image: '/static/img/hot/1.jpg',
            title: 'Burberry 女士连衣裙',
            referencePrice: 2300.00,
            price: 1800.00
          }, {
            id: '10000001',
            image: '/static/img/hot/2.jpg',
            title: 'Capulet 束腰连衣裙',
            referencePrice: 251.65,
            price: 196.00
          }, {
            id: '10000001',
            image: '/static/img/hot/1.jpg',
            title: 'Burberry 女士连衣裙',
            referencePrice: 2300.00,
            price: 1800.00
          }, {
            id: '10000001',
            image: '/static/img/hot/2.jpg',
            title: 'Capulet 束腰连衣裙',
            referencePrice: 251.65,
            price: 196.00
          }, {
            id: '10000001',
            image: '/static/img/hot/1.jpg',
            title: 'Burberry 女士连衣裙',
            referencePrice: 2300.00,
            price: 1800.00
          }, {
            id: '10000001',
            image: '/static/img/hot/2.jpg',
            title: 'Capulet 束腰连衣裙',
            referencePrice: 251.65,
            price: 196.00
          }],
          total: 8
        })
      }, 1000)
    })
  }
  
}
