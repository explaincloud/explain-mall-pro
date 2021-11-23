export default {

  getHistoryList() {
    /* 模拟请求，真实请求请直接替换以下代码，但要保证返回对象是Promise，并保证数据格式，如数据格式不一致则需要重写格式 */
    return new Promise((resolve, reject) => {
      resolve({
        code: 0,
        data: [{
          id: '10000001',
					image: '/static/img/goods/1.png',
					title: '创意吊灯',
					price: 34.00,
          browseTime: '2021-11-17 10:10:10'
				}, {
          id: '10000001',
					image: '/static/img/goods/2.png',
					title: '电动牙刷',
					price: 73.00,
          browseTime: '2021-11-17 09:10:10'
				}, {
          id: '10000001',
					image: '/static/img/goods/1.png',
					title: '蓝牙音箱',
					price: 332.00,
          browseTime: '2021-11-16 09:10:10'
				}, {
          id: '10000001',
					image: '/static/img/goods/2.png',
					title: '创意桌子',
					price: 129.00,
          browseTime: '2021-10-18 19:10:10'
				}, {
          id: '10000001',
					image: '/static/img/goods/1.png',
					title: '创意吊灯',
					price: 34.00,
          browseTime: '2021-10-18 18:10:10'
				}, {
          id: '10000001',
					image: '/static/img/goods/2.png',
					title: '电动牙刷',
					price: 73.00,
          browseTime: '2021-10-18 15:10:10'
				}, {
          id: '10000001',
					image: '/static/img/goods/1.png',
					title: '蓝牙音箱',
					price: 332.00,
          browseTime: '2021-10-18 13:10:10'
				}, {
          id: '10000001',
					image: '/static/img/goods/2.png',
					title: '创意桌子',
					price: 129.00,
          browseTime: '2021-10-17 20:10:10'
				}],
        total: 8
      })
    })
  }

}
