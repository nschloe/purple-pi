const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  // Don't use "production"; this minifies the code and makes it less reviewable by
  // extension site maintainers.
  // mode: "production"
  mode: "development"
});
