# EXPLAIN-MALL-PRO

## [点击加群交流反馈：970799055](https://jq.qq.com/?_wv=1027&k=KFkDL5gp)

## [使用帮助、答疑请加QQ交流群：970799055](https://jq.qq.com/?_wv=1027&k=KFkDL5gp)

## 有定制需求的加作者QQ：540000228

## 前言
时隔一年又和大家见面了~ 那该版本与上一版explain-mall有什么区别呢？
* 支持nvue，在App端性能更好，最明显的区别就是深色主题下打开二级页面背景不闪白；
* 在开发上一版时，才刚接触nvue，所以遇到许多的坑，经过一年的经验积累，现在对nvue掌握更加熟练，所以新版相比较于旧版来说更加的稳定，应用体验更好；
* 默认主题配色方面进行了调整，现在看起来更加的协调；
* 主题控制现在基于js，可以动态控制，而上一版是基于css，只支持静态。且主题控制为独立开发，可移植到其他项目中使用；
* 封装了独立组件。

目前只出了商城端，未来还将继续开发配套的后台管理，并结合uniCloud打造成一个云端一体项目，还请大家多多支持和关注哟~

上一版explain-mall地址：[https://ext.dcloud.net.cn/plugin?id=3637](https://ext.dcloud.net.cn/plugin?id=3637)

## 特点
* 沿用上一版的设计风格，简洁，多端支持：安卓Android、苹果iOS、H5、微信小程序；
* 支持nvue，大部分页面都是nvue编写；
* 自定义tabBar底部导航示例；不闪屏；已实现`load`页面加载、`show`页面显示、`hide`页面隐藏等生命周期；切换返回后还将保留原页面数据，保持原滚动位置，而不是重新加载组件，类似`keep-alive`；
* 主题样式切换，换肤功能，可自由扩展主题配色方案；
* 一款好的学习参考案例。

## 页面开发进度
* [x] 初始化页 pages/init/init.vue
* [x] 首页 pages/index/tabs/index/index.vue
* [x] 搜索&分类 pages/index/tabs/search/search.vue
* [x] 购物车 pages/index/tabs/cart/cart.vue
* [x] 我的 pages/index/tabs/my/my.vue
* [x] 商品详情 pages/goods/goods.nvue
* [x] 收藏 pages/favorite/favorite.nvue
* [x] 创建订单 pages/order/create.nvue
* [x] 支付结果 pages/pay/result.nvue
* [x] 我的地址 pages/address/address.nvue
* [x] 添加地址 pages/address/add.nvue
* [x] 我的订单 pages/order/order.nvue
* [x] 订单详情 pages/order/detail.nvue
* [x] 商品类别 pages/category/category.nvue
* [x] 我的足迹 pages/history/history
* [x] 热门商品 pages/hot/hot
* [x] 用户评论 pages/goods/comment