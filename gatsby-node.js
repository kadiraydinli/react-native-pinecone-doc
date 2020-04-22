const path = require('path')

exports.onCreateWebpackConfig = args => {
  args.actions.setWebpackConfig({
    resolve: {
      alias: {
        'react-native': 'react-native-web',
        'react-native-vector-icons': 'react-native-vector-icons/dist',
        '@': path.resolve(__dirname, '../src/components/'),
      },

    },
    module: {
      rules: [
        {
          test: /\.ttf$/,
          loader: "url-loader", // or directly file-loader
          include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
        },
      ]
    }
  })
}