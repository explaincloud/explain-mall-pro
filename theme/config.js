module.exports = {
  list: [{
    name: 'light',
    backgroundColor: '#FFFFFF',
    statusBarStyle: 'dark',
    style: require('./styles/light')
  }, {
    name: 'dark',
    backgroundColor: '#191919',
    statusBarStyle: 'light',
    style: require('./styles/dark')
  }]
}
