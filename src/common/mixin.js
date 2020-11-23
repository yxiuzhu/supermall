import {debounce} from './utils'
import BackTop from '@/components/content/backTop/BackTop'

export const itemListenerMixin = {
  // components和methods也可以混入
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 防抖函数
    const refresh = debounce(this.$refs.scroll.refresh, 50)

    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    // console.log('我是混入的内容');
  }
}

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      // scrollTo的三个参数分别是位置和返回这个位置的时间ms
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}