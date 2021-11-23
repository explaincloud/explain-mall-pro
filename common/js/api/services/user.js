export default {

  getUserInfo() {
    /* 模拟请求，真实请求请直接替换以下代码，但要保证返回对象是Promise，并保证数据格式，如数据格式不一致则需要重写格式 */
    return new Promise((resolve, reject) => {
      resolve({
        code: 0,
        data: {
          name: 'Mina Davidson',
          avatar: '/static/img/user/avatar.jpg'
        }
      })
    })
  }

}
