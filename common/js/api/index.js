import carousel from './services/carousel'
import column from './services/column'
import special from './services/special'
import goods from './services/goods'
import category from './services/category'
import cart from './services/cart'
import user from './services/user'
import favorite from './services/favorite'
import address from './services/address'
import order from './services/order'
import history from './services/history'
import hot from './services/hot'

export default {
  ...carousel,
  ...column,
  ...special,
  ...goods,
  ...category,
  ...cart,
  ...user,
  ...favorite,
  ...address,
  ...order,
  ...history,
  ...hot
}
