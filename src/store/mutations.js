import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations的每个方法功能尽量单一
  [ADD_COUNTER](state, payload) {
    payload.count++
    // 这里如果像老师一样只是将count属性加一，
    // 数组的长度其实没有改变，最后购物车里反复添加
    // 同一件商品的时候没办法正确读取实际购物车衣服的数量
    // state.cartList.push(payload)
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
