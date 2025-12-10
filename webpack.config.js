//this path object has the resolve() function we use to put the dist folder in its place
const path = require("path");

//HTMLWebpackPlugin is a class I can use to make webpack generate me an html file in dist and link the js to it.
//it's mostly used when you can't manually write the js script tag because the js name changes

module.exports = {
    mode: "development",
    entry: "./src/index.js",//tells webpack the starting source file
    //object that describes where webpack's output file
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "docs"),
    },
    //object that contains the rules for loaders, which is basically how webpack deals with non js files
    module: {
        rules: [
            {
                test: /\.css$/i,//tests for a certain extension
                use: ["style-loader", "css-loader"]//then uses these loaders from right to left
                //css-loader turns the css to js and style loader puts it in the html via style tag
            }
        ]
    },
    //dev Server rebuilds webpack for you after every change.
    //so you don't have to run npx webpack over and over
    //this tells the dev server where to look and serve from
    devServer: {
        static: {
            directory: path.resolve(__dirname, "docs")
        }
    }
}
