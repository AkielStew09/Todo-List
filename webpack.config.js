//this path object has the resolve() function we use to put the dist folder in its place
const path = require("path");

//this is a class I can use to make webpack generate me an html file in dist and link the js to it.
//it's mostly used when you can't manually link the js with script tag because the name changes

//const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    //this tells the dev server where to look and serve from
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist")
        }
    }
}
