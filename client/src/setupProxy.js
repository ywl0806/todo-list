const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/user", "/task"],
    createProxyMiddleware({
      target:
        process.env.REACT_APP_SERVER_HOST + process.env.REACT_APP_SERVER_PORT,
      changeOrigin: true,
    })
  );
};
