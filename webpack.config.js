//this path object has the resolve() function we use to put the dist folder in its place
const path = require("path");

//this is a class I can use to make webpack generate me an html file in dist and link the js to it.
//don't think I can stop using it now because dev server seems to serve from that dist folder
//const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: "./src/template.html"
    //     })
    // ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
    // devtool: "eval-source-map",
    // devServer: {
    //     watchFiles: ["./src/project.html", "./src/style.css"],
    // },
}
