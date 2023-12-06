// This is only a dev server, used for proxying request on local machine.
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
      '/api',
      createProxyMiddleware({
        target: 'https://wedolist-backend.gentledune-a5a44295.westus2.azurecontainerapps.io',
        changeOrigin: true,
      })
    );
};