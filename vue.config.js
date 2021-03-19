module.exports = {
  publicPath: '/dist/',
  devServer: {
    proxy: {
      './': {
        target: 'http://152.136.185.210:8000/api/w6'
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
