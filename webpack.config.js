const path = require("path");
const webpack = require("webpack");
//export the settings for webpack
module.exports = {
    mode: "production",
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};