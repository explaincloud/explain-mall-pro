<script>
  export default {
    onLaunch: function(options) {
      console.log('App Launch')
      // #ifdef H5
      this.startup({
        appOptions: options
      })
      // #endif
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    },
    methods: {
      startup({
        appOptions,
        notInitPages = [], // 不需要初始化的页面，例如只作单页显示，不会返回到其他业务页面的页面
        notEnterPages = [] // 不作为入口页的页面
      }) {
        notInitPages.push('pages/init/init') // 可以防止init页面onLoad调用两次
        notEnterPages.push('pages/init/init')
        // 验证集合是否存在页面，不存在则该页面作为入口页，否则入口页为首页
        if (!notInitPages.includes(appOptions.path) && !notEnterPages.includes(appOptions.path)) {
          let path = appOptions.path
          let query = appOptions.query
          let queryString = ''
          for (let key in query) {
            queryString += `${key}=${query[key]}&`
          }
          if (queryString) {
            queryString = `?${queryString.replace(/&$/, '')}`
          }
          let redirectPath = encodeURIComponent('/' + path + queryString)
          let url = `/pages/init/init?redirect=${redirectPath}`
          uni.reLaunch({
            url
          })
        }
      }
    }
  }
</script>

<style>
  /* 引入全局样式 */
  @import 'common/css/app.css';

  /*每个页面公共css */
</style>
