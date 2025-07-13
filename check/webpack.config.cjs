// Generated using webpack-cli https://github.com/webpack/webpack-cli
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';


module.exports = {
    mode: isProduction ? 'production' : 'development',

    experiments: {
        asyncWebAssembly: true,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".wasm"]
    },
    entry: {
        "check-web": '../js/check-web.js',
        md5: '../pkg/dist/md5.js',
        sha1: '../pkg/dist/sha1.js',
        sha256: '../pkg/dist/sha256.js',
        sha512: '../pkg/dist/sha512.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "index.html" }],
        }),
    ],
    module: {
        rules: [
        ],
    },
};
