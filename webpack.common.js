const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");

module.exports = {
  entry: {
    content_script: path.join(__dirname, "src/content_script.js"),
    background: path.join(__dirname, "src/background.js"),
    // katex: path.join(__dirname, "src/katex.js")
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  plugins: [
        new CopyWebpackPlugin({
          patterns: [
            { from: 'src/manifest.json' },
            { from: './node_modules/katex/dist/katex.js' },
            { from: './node_modules/katex/dist/contrib/auto-render.js' },
            { from: './node_modules/katex/dist/katex.css' },
            { from: './node_modules/katex/dist/fonts/*.woff2', to: 'fonts/' },
            { from: './images/*.png' },
            { from: './images/logo.svg', to: 'images/' },
            { from: './images/logo-gray.svg', to: 'images/' }
        ]
      })
    ]
};
