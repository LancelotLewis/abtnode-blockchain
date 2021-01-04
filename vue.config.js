module.exports = {
  transpileDependencies: ['vuetify'],
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
