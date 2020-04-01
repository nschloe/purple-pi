const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");

module.exports = {
  entry: {
    mathjax: path.join(__dirname, "src/content_script.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  plugins: [
        new CopyWebpackPlugin([
            { from: 'src/manifest.json' },
            { from: './node_modules/mathjax-full/ts/output/chtml/fonts/tex-woff-v2/', to: 'fonts/' },
        ])
    ]
};
