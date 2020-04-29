module.exports = {
  publicPath: './',
  pluginOptions: {
    moment: {
      locales: [
        'moment'
      ]
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.173:8080/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
