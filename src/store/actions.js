import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  addCart(context, payload) {
    // payload是新添加的商品
    // 1.查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // 2.判断oldProduct是否存在
    if (oldProduct) {
      // oldProduct.count += 1
      // console.log('加');
      context.commit(ADD_COUNTER, oldProduct)
    }else {
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}