// const { createProxyMiddleware } = require("http-proxy-middleware");
// module.exports = function (app) {
//   const API_SOURCE_URL = "https://themoviedbapp.herokuapp.com/";
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: API_SOURCE_URL,
//       changeOrigin: true,
//     })
//   );
// };

const proxy = require("http-proxy-middleware");
const port = process.env.PORT || 5000;

module.exports = function (app) {
  app.use(proxy("/api", { target: `http://localhost:${port}/` }));
};
