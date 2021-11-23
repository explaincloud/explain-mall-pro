export default {
  /* 模拟线程睡眠，类似C#中的Thread.Sleep */
  threadSleep: (duration) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, duration)
    })
  }
}
