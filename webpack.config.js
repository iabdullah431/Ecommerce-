var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
module.exports = {

  entry: {
    app: './src/index.js'
  },

  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: '',
    filename: "main.js"
  },

  mode: "development",

  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 9000,
    devMiddleware: {
      writeToDisk: true,// لانتاج مجلد build
    },
    hot: false, //تساعد في التحديث التلقائي
    liveReload: true,//تساعد في التحديث التلقائي
    open: true,// لفتح المشروع مباشرة بعد تنفيذ الأمر
  },



  module: {

    rules: [{
        test: /\.(sa|sc|c)ss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
        ]
      },
      {

        test: /\.(png|svg|jpe?g|gif)$/,

        use: [

          {

            loader: "file-loader", 

            options: {

              name: '[name].[ext]', // اسم الملف الناتج

              outputPath: "images",

            }

          }

        ]

      },
      {
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          // options: {
          //   minimize: true,
          // }
        }]
      }
    ]
  },

  plugins: [

    new HtmlWebpackPlugin({

      filename: "index.html",

      template: "./src/index.html",

    }),

    new MiniCssExtractPlugin({
      filename: "css/style.css"
    }),

    new OptimizeCSSAssetsPlugin({}),
  ],
};