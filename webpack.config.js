var webpack = require("webpack");
module.exports = {
    entry: {
        main:["webpack/hot/dev-server",__dirname + "/app/main.js"]
    },
    output:{
        path: __dirname + "/build",
        filename:"[name].js"
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:"babel-loader"
            },
             {
                test:/\.css$/,
                loader:"style-loader!css-loader"
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
}