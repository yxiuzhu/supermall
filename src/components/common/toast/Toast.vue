<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    props: {
      // message: {
      //   type: String,
      //   default: ''
      // },
      // show: {
      //   type: Boolean,
      //   default: false
      // }
    },
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message='默认文字', duration=2000) {
        // console.log('---');
        this.isShow = true;
        this.message = message;
        // console.log(message, duration);

        setTimeout(() => {
          this.isShow = false;
          this.message = '成功添加购物车';
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 8px 10px;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    z-index: 999;

    color: #fff;
    background-color: rgba(0, 0, 0, .75);
  }
</style>
