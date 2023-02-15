const path = require("path");
module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "/babeljs"),
    filename: `[name].js`,
    //saves the name of the js file with the entry name above
  },

  // stats: {
  //   errors: true, //This is an object that allows spitting error into console
  // },
  watchOptions: {
    poll: 200, // Check for changes every 0 second
    ignored: /node_modules/, // Ignore changes in the node_modules directory
  },
  module: {
    rules: [
      {
        test: /\.js$/, //This ask it ro search for any js file in directory
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", //This is a loader for babel compiler
          options: {
            presets: ["@babel/preset-env"], //This is an important babel preset also installed in package.json and included in .babelrc
          },
        },
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/, //This is to search for an image with ext or .....
        use: [
          {
            loader: "file-loader", //This is a loader for images,installed in dev-dependency,in pakage.json
            options: {
              name: "[name].[ext]", //Uses the name of the image and its extention
              // ouputPath: "images/",
            },
          },
        ],
      },
    ],
  },
  // plugins: [new HtmlWebpackPlugin()],
};
