<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="topTabControl"
                 class="tab-control" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl"/>
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

  import { getHomeMultidata, getHomeGoods } from "network/home";
  // import {debounce} from "common/utils"
  import {itemListenerMixin} from 'common/mixin'

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
      BackTop
    },
    mixins:[itemListenerMixin],
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
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        // 放到mixin混入中了
        // itemImgListener: null
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
    destroyed() {
      console.log('home destroyed');
    },
    activated() {
      console.log('activated');
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      console.log('deactived');
      // 1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      // 2.取消全局事件的监听  告诉系统需要取消哪一个函数
      this.$bus.$off('itemImageLoad', this.itemImgListener)

    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      // 最后直接使用mixin(混入)来解决
      // 1.图片加载完成的事件监听
      // 防抖操作
      // const refresh = debounce(this.$refs.scroll.refresh, 50)
      // 3.监听item中图片加载完成
      // this.itemImgListener = () => {
      //   refresh()
      // }
      // this.$bus.$on('itemImageLoad', this.itemImgListener)
      // this.$bus.$on('itemImageLoad', () => {
      //   console.log('-------');
      //   this.scroll && this.$refs.scroll.refresh()
      // })

      // 2.获取tabControl的offsetTop
      // 所有组件都有一个属性$el：用于获取组件中的元素,获取的属性不对因高度是图片撑起来的
      // console.log(this.$refs.tabControl.$el.offsetTop);
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
        console.log(index)
        this.$refs.topTabControl.currentIndex = index;
        this.$refs.tabControl.currentIndex = index;
      },
      backClick() {
        // scrollTo的三个参数分别是位置和返回这个位置的时间ms
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        // console.log(position);
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        // 2.决定tabControl是否吸顶(position:fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        console.log('监听到了加载等多的信息');
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad () {
        // console.log(this.$refs.tabControl2.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
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
          // res => pop前30 page:1  下面的this指的是当前的组件对象
          // 取出数组，然后将数组里的元素取出来放在goods的数组中
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
    },

  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* 使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
/*  position: fixed;
    left: 0;
    right: 0;
    top: 0;
    设置显示优先级
    z-index: 9; */
  }

/* 引用better-scroll框架之后无效   */
  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  } */
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
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
