<template>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <!-- 因为href和src都是变量所以需要使用v-on -->
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper";

  export default {
    name: 'HomeSwiper',
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>

</style>