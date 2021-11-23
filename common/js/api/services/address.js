export default {

  getAddressList() {
    /* 模拟请求，真实请求请直接替换以下代码，但要保证返回对象是Promise，并保证数据格式，如数据格式不一致则需要重写格式 */
    return new Promise((resolve, reject) => {
      resolve({
        code: 0,
        data: [{
          id: '1',
          name: '德润·朗悦湾',
          province: '云南省',
          city: '昆明市',
          country: '五华区',
          detail: '银河大道与沣源路交汇处(和谐世纪往北200米)',
          consignee: '张三',
          mobile: '151****1111',
          longitude: 102.743655,
          latitude: 25.118518,
          default: true
        }, {
          id: '1',
          name: '德润·朗悦湾',
          province: '云南省',
          city: '昆明市',
          country: '五华区',
          detail: '银河大道与沣源路交汇处(和谐世纪往北200米)',
          consignee: '张三',
          mobile: '151****1111',
          longitude: 102.743655,
          latitude: 25.118518,
          default: false
        }, {
          id: '1',
          name: '德润·朗悦湾',
          province: '云南省',
          city: '昆明市',
          country: '五华区',
          detail: '银河大道与沣源路交汇处(和谐世纪往北200米)',
          consignee: '张三',
          mobile: '151****1111',
          longitude: 102.743655,
          latitude: 25.118518,
          default: false
        }],
        total: 3
      })
    })
  }

}
