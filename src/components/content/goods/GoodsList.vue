<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods" :key="index"
                     :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'

  export default {
    name: 'GoodsList',
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    /* 元素就不会叠在一起 */
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 3px;
  }
</style>
