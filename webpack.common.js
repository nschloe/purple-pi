const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: {
    content_script: path.join(__dirname, "src/content_script.js"),
    background: path.join(__dirname, "src/background.js"),
    // katex_less: path.join(__dirname, "./node_modules/katex/src/katex.less"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    // The rules for building the CSS is getting a little tricky.
    //
    // The idea is:
    //
    //  1. Replace the font-folder in `./node_modules/katex/src/fonts.less` by the
    //     appropriate chrome-extension:// path.
    //  2. Run lessc on katex.less to generate the CSS
    //  3. Copy that over to the output folder
    //  4. Use injectCSS() in the background script.
    //
    // The way this is implemented here:
    //
    //  1. require() katex.less from background.js.
    //  2. When webpack parses it as a dependency, make sure the less-loader is called
    //     (see below)
    //  3. Use less-loaders' modifyVars option to adapt the font-folder
    //
    // This generates the CSS in background.js itself, so
    //
    //  4. Use MiniCssExtractPlugin to extract the CSS code into its own file,
    //     background.css
    //
    rules: [
      {
        test: /\.less$/i,
        use: [
          // {
          //   loader: "style-loader",
          // },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              // don't try to resolve the url paths
              url: false,
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: {
                  "font-folder":
                    "'chrome-extension://__MSG_@@extension_id__/fonts'",
                  "use-ttf": false,
                  "use-woff": false,
                  "use-woff2": true,
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/manifest.json" },
        { from: "src/popup.html" },
        { from: "./node_modules/katex/dist/katex.js" },
        { from: "./node_modules/katex/dist/contrib/auto-render.js" },
        // https://stackoverflow.com/a/67084208/353337
        {
          from: "./node_modules/katex/dist/fonts/*.woff2",
          to: "fonts/[name].woff2",
        },
        { from: "./images/*.png" },
        { from: "./images/logo.svg", to: "images/" },
        { from: "./images/logo-gray.svg", to: "images/" },
      ],
    }),
  ],
};
