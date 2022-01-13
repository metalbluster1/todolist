const currentTash = process.env.npm_lifecycle_event
const path = require("path")

let config = {
    entry: "./app/Main.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-react", ["@babel/preset-env", { targets: { node: "12" } }]]
                    }
                }
            }
        ]
    }
}

if (currentTash == 'dev') {
    config.output = {
        publicPath: "/",
        path: path.resolve(__dirname, "app"),
        filename: "bundled.js"
    }
    config.devServer = {
        port: 3000,
        contentBase: path.join(__dirname, "app"),
        hot: true,
        historyApiFallback: { index: "index.html" }
    }
    config.mode = 'development'
}

if (currentTash == 'build') {
    config.output = {
        publicPath: "/",
        path: path.resolve(__dirname, "build"),
        filename: "bundled.js"
    }
    config.mode = 'production'

}

module.exports = {
    entry: "./app/Main.js",
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "app"),
        filename: "bundled.js"
    },
    mode: "build",
    devtool: "source-map",
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, "app"),
        hot: true,
        historyApiFallback: { index: "index.html" }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-react", ["@babel/preset-env", { targets: { node: "12" } }]]
                    }
                }
            }
        ]
    }
}

module.exports = config