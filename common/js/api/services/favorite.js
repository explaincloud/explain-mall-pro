export default {

  getFavoriteList() {
    /* 模拟请求，真实请求请直接替换以下代码，但要保证返回对象是Promise，并保证数据格式，如数据格式不一致则需要重写格式 */
    return new Promise((resolve, reject) => {
      resolve({
        code: 0,
        data: [{
          id: '10000001',
					image: '/static/img/goods/1.png',
					title: '创意吊灯',
					price: 34.00
				}, {
          id: '10000001',
					image: '/static/img/goods/2.png',
					title: '电动牙刷',
					price: 73.00
				}, {
          id: '10000001',
					image: '/static/img/goods/1.png',
					title: '蓝牙音箱',
					price: 332.00
				}, {
          id: '10000001',
					image: '/static/img/goods/2.png',
					title: '创意桌子',
					price: 129.00
				}, {
          id: '10000001',
					image: '/static/img/goods/1.png',
					title: '创意吊灯',
					price: 34.00
				}, {
          id: '10000001',
					image: '/static/img/goods/2.png',
					title: '电动牙刷',
					price: 73.00
				}, {
          id: '10000001',
					image: '/static/img/goods/1.png',
					title: '蓝牙音箱',
					price: 332.00
				}, {
          id: '10000001',
					image: '/static/img/goods/2.png',
					title: '创意桌子',
					price: 129.00
				}],
        total: 8
      })
    })
  }

}
