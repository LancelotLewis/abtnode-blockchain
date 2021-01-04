module.exports = {
  transpileDependencies: ['vuetify'],
  publicPath: './',
  devServer: {
    port: 8000,
    compress: true,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'https://blockchain.info',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '/api': '/',
        },
      },
    },
  },
};
