const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const client_config = {
  entry: "reaxt/client_entry_addition",
  mode: (process.env.MIX_ENV != 'prod') ? 'development' : 'production',
  target: 'web',
  // devtool: (process.env.MIX_ENV != 'prod') ? 'source-map' : false,
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, '../priv/static'), //typical output on the default directory served by Plug.Static
    filename: '[name].[fullhash].js', // dynamic name for long term caching, or code splitting, use WebPack.file_of(:main) to get it
    publicPath: '/public/'
  },
  // use cacheGroups to aggregate all css chunks into one main.css file
  optimization: {
    splitChunks: {cacheGroups: {styles: {name: 'styles', test: /\.css$/, chunks: 'all', enforce: true}}},
    minimizer: (process.env.MIX_ENV != 'prod') ? [`...`] : [`...`, new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({insert: "", filename: 'css/[name].css'}),
  ],
  module: {
    rules: [
      {
        test: /.+\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              ['@babel/preset-env', {targets: 'defaults'}],
              '@babel/preset-react',
            ],
            sourceType: 'unambiguous',
          },
        },
      },
    ],
  }
}

const server_config = Object.assign(Object.assign({},client_config),{
  target: "node",
  entry: "reaxt/react_server",
  externals: {},
  output: {
    // typical output on the default directory served by Plug.Static
    path: path.join(__dirname, '../priv/react_servers'),
    filename: 'server.js',
    chunkFilename: 'chunk/server.[id].js',
  },
})

// optimisation : ONLY EMIT files for client compilation, all file-loader should not emit files on server compilation
server_config.module = {
  rules: server_config.module.rules.map(rule => {
    return {
      ...rule,
      use: ((Array.isArray(rule.use)) ? rule.use : [rule.use]).map(use => ({
        ...use,
        options: (use.loader === 'file-loader') ? {...use.options, emitFile: false} : use.options,
      }))
    }
  }),
}

// css management : MiniCssExtractPlugin on client build but ignore on server side

client_config.module.rules.push(
  {test: /\.css$/, use: [{loader: MiniCssExtractPlugin.loader}, {loader: 'css-loader'}]}
)

server_config.module.rules.push(
  {test: /\.css$/, use: [{loader: 'null-loader'}]}
)

module.exports = [client_config,server_config]
