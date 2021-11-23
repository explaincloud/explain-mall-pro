import util from './common/util'

module.exports = {
  install(Vue) {
    let em = Vue.prototype.$em = Vue.prototype.$em || {}
    Object.keys(util).forEach(x => {
      em[`$${x}`] = Vue.prototype[`$${x}`] = util[x]
    })
  }
}
