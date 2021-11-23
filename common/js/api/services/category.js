export default {

  getCategoryList() {
    /* 模拟请求，真实请求请直接替换以下代码，但要保证返回对象是Promise，并保证数据格式，如数据格式不一致则需要重写格式 */
    return new Promise((resolve, reject) => {
      resolve({
        code: 0,
        data: [{
          id: '1',
          image: '/static/img/goods/1.png',
          name: '数码'
        }, {
          id: '1',
          image: '/static/img/goods/2.png',
          name: '配饰'
        }, {
          id: '1',
          image: '/static/img/goods/2.png',
          name: '家具'
        }, {
          id: '1',
          image: '/static/img/goods/1.png',
          name: '鞋类'
        }, {
          id: '1',
          image: '',
          name: '生活'
        }, {
          id: '1',
          image: '',
          name: '服饰'
        }, {
          id: '1',
          image: '',
          name: '家居'
        }, {
          id: '1',
          image: '',
          name: '背包'
        }, {
          id: '1',
          image: '',
          name: '生活'
        }, {
          id: '1',
          image: '',
          name: '服饰'
        }, {
          id: '1',
          image: '',
          name: '家居'
        }, {
          id: '1',
          image: '',
          name: '背包'
        }, {
          id: '1',
          image: '',
          name: '生活'
        }, {
          id: '1',
          image: '',
          name: '服饰'
        }, {
          id: '1',
          image: '',
          name: '家居'
        }, {
          id: '1',
          image: '',
          name: '背包'
        }, {
          id: '1',
          image: '',
          name: '生活'
        }, {
          id: '1',
          image: '',
          name: '服饰'
        }, {
          id: '1',
          image: '',
          name: '家居'
        }, {
          id: '1',
          image: '',
          name: '背包'
        }],
        total: 20
      })
    })
  }

}
