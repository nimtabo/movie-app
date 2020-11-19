const { createProxyMiddleware } = require("http-proxy-middleware");
const API_URL = "https://themoviedbapp.herokuapp.com/";
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
    })
  );
};
