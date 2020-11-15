<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll" 
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control"
                :titles="['流行', '新款', '精选']" 
                @tabClick="tabClick"/>
      <!-- 下面这里改成了计算属性 -->
      <goods-list :goods="showGoods"/>
    </scroll>
    <!-- 监听组件的原生事件需要使用.native这个修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from './childComps/FeatureView';

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll';
  import BackTop from 'components/content/backTop/BackTop'


  import {
    getHomeMultidata, 
    getHomeGoods
  } from "network/home";
  
  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,

    },
    data() {
        FeatureView
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    // computed: {
    //   showGoods() {
    //     return this.goods[pop].list
    //   }
    // },
    // 使用生命周期函数，在组件创建好以后就马上发送网络请求
    // 生命函数中的this指的是当前组件的对象
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()
      // 2.请求商品数据
      this.getHomeGoods('pop')

      this.getHomeGoods('new')

      this.getHomeGoods('sell')
    },
    methods: {
      /**
       * 事件监听的相关方法
       */
      tabClick(index) {
        switch(index) {
          case 0: 
            this.currentType = 'pop'
            break
          case 1: 
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        // scrollTo的三个参数分别是位置和返回这个位置的时间ms
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        // console.log(position);
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore() {
        // console.log('上拉加载');
        this.getHomeGoods(this.currentType)
      },
      /**
       * 网络请求的相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // res => pop前30 page:1 
          // 取出数组，然后将数组里的元素取出来放在goods的数组中
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      },
    },

  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    /* 设置显示优先级 */
    z-index: 9;
  }
  
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  /* 方法一 */
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* 方法二 */
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }  */

</style>


// 怎么将一个数组添加到另一个数组
// let totalNums = []
// const nums1 = [20,12,21]
// const nums2 = [23,351,1]

// 方法一
// for(let n of nums2) {
//   totalNums.push(n)
// }

//方法二
// totalNums.push(...nums1)