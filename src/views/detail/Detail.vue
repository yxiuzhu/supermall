<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"
                         @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from '@/components/common/scroll/Scroll'
  import GoodsList from '@/components/content/goods/GoodsList'
  // import Toast from '@/components/common/toast/Toast'

  import { getDetail,
           Goods,
           Shop,
           GoodsParam,
           getRecommend } from 'network/detail'
  import { debounce } from 'common/utils'
  import { itemListenerMixin, backTopMixin } from 'common/mixin'
  import { mapActions } from 'vuex'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      // Toast,
    },
    mixins:[itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        // 放到mixin混入中了
        // itemImgListener: null
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        // message: '',
        // show: false

      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      // 2.根据iid请求详情页的数据
      getDetail(this.iid).then(res => {
        // console.log(res)
        const data = res.result
        // 1.获取顶部的图片轮播数据
        this.topImages = res.result.itemInfo.topImages
        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // console.log(this.goods);
        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        // console.log(this.shop);
        // 4.保存商品的详情数据(没有专门写类)
        this.detailInfo = data.detailInfo;
        // console.log(this.detailInfo);
        // 5.获取参数的信息
        this.paramInfo = new GoodsParam (data.itemParams.info, data.itemParams.rule)
        // console.log(this.paramInfo);
        // 6.取出评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
      // 3.获取推荐页数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
      // 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
      }, 100)
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    methods: {
      ...mapActions(['addCart']),
      // ...mapActions({
      //   add: addCart
      // }),
      imageLoad() {
        // console.log('----');
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 400)
      },
      contentScroll(position) {
        // console.log(position);
        // 1.获取y值
        const positionY = -position.y
        // 2.positionY和主题中值进行对比
        // [0, 7345, 8240, 8477, Number.MAX_VALUE]
        // positionY 在 0 和 7345 之间，index = 0
        // positionY 在 =7345 和 8240 之间，index = 1
        // positionY 在 =8240 和 8477 之间，index = 2
        // positionY 在 8477 和 一个很大的值 之间，index = 3
        let length = this.themeTopYs.length
        for(let i = 0; i < length - 1; i++) {
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i]
             && positionY < this.themeTopYs[i+1])) {
              this.currentIndex = i;
              console.log(this.currentIndex);
              this.$refs.nav.currentIndex = this.currentIndex
             }
        // 3.是否回到顶部
        // 1.判断BackTop是否显示
        this.listenShowBackTop(position)
        }
      },
      addToCart() {
        // console.log('已成功添加购物车');
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // 2.将商品添加到购物车里(vuex的补充：1、promise 2、mapActions)
        // 不要这样做，修改state属性，要使用mutations
        // this.$store.cartList.push(product)
        // mutations的调用方式
        // this.$store.commit('addCart', product)
        // actions的调用方式
        this.addCart(product).then(res => {
          // console.log(res);
          // this.show = true;
          // this.message = res;

          // setTimeout(() => {
          //   this.show = false;
          //   this.message = '';
          // }, 1500)
          this.$toast.show('成功加入购物车')
          console.log(this.$toast);
        })
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }

</style>
