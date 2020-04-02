const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");

module.exports = {
  entry: {
    content_script: path.join(__dirname, "src/content_script.js"),
    background: path.join(__dirname, "src/background.js"),
    mathjax: path.join(__dirname, "src/mathjax.js"),
    popup: path.join(__dirname, "src/popup.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  plugins: [
        new CopyWebpackPlugin([
            { from: 'src/manifest.json' },
            { from: 'src/popup.html' },
            { from: 'src/popup.css' },
            { from: './node_modules/mathjax-full/ts/output/chtml/fonts/tex-woff-v2/', to: 'fonts/' },
            { from: './images/*.png' },
            { from: './images/logo.svg', to: 'images/' }
        ])
    ]
};
