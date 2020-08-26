const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  // Don't use "production"; this minifies the code and makes it less reviewable by
  // extension site maintainers.
  mode: "production",
  // mode: "development",
  // Use source-map to avoid illegal eval()s in the generated code, cf.
  // <https://github.com/webpack/webpack/issues/4899#issuecomment-609737316>.
  devtool: "source-map"
});
