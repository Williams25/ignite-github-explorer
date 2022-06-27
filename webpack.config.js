const path = require("path");
const htmlWebpckPlugin = require("html-webpack-plugin");
const reactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "eval-source-map" : "source-map", // configurando saida dos logs de erros
  entry: path.resolve(__dirname, "src", "index.tsx"), // arquivo de entrada da aplicação
  output: {
    path: path.join(__dirname, "dist"), // caminho para salvar o arquivo gerado
    filename: "bundle.js", // nome do webapack gerado
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // passando formatos de aqruivos da aplicação
  },
  devServer: {
    static: path.resolve(__dirname, "public"), // local que fica armazanado o html estatico
    hot: true,
  },
  plugins: [
    // injetando o js compilado no html estatico
    new htmlWebpckPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),

    // configurando fast refresh no webpack
    isDevelopment && new reactRefreshWebpackPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(j|t)sx$/, // identificando arquivos que terminam com jsx
        exclude: /node_modules/, // removendo arquivos da node_modules para que o react lide com o processo de build por completo
        use: {
          loader: "babel-loader", // integrando o babel com webpack
          options: {
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.scss$/, // identificando arquivos que terminam com scss
        exclude: /node_modules/, // removendo arquivos da node_modules para que o react lide com o processo de build por completo
        use: ["style-loader", "css-loader", "sass-loader"], // configurando o webpack para aceitar aquivos css
      },
    ],
  },
};
