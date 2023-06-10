export default {
  mode: "production",
  resolve: {
    extensions: [".js", ".mjs"],
  },
  devtool: "source-map",
  output: {
    filename: "[name].js",
  },
  optimization: {
    minimize: false
  }
}