const CompressionWebpackPlugin = require("compression-webpack-plugin");
let path = require("path");
var vConsolePlugin = require("vconsole-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";
function resolve(dir) {
  return path.join(__dirname, dir);
}
const createProxy = require("./build/proxy");
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = {
  lintOnSave: false,
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  productionSourceMap: false,
  filenameHashing: true,
  devServer: {
    port: 80,
    hot: true,
    https: false,
    proxy: createProxy(JSON.parse(process.env.VUE_APP_PROXYS || "[]")),
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            hack: `true; @import "~@/styles/vant.less";`,
            javascriptEnabled: true,
          },
          globalVars: {
            hack: `true; @import '~@/styles/var.less';`,
          },
        },
      },
    },
  },
  configureWebpack(config) {
    if (isProd) {
      //生产环境下将资源压缩成gzip格式;
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          test: new RegExp("\\.(js|css)$"),
          threshold: 0,
          minRatio: 0.8,
        })
      );
      config.plugins.push(
        new FileManagerPlugin({
          events: {
            onEnd: {
              archive: [
                { source: "./dist", destination: "./dist.zip", format: "zip" },
              ],
            },
          },
        })
      );
    } else {
      // config.plugins.push(
      //   new vConsolePlugin({
      //     filter: [], // 需要过滤的入口文件
      //     enable: !isProd, // 发布代码前记得改回 false
      //   })
      // );
    }
  },
  chainWebpack(config) {
    config.module
      .rule("svg")
      .exclude.add(path.join(__dirname, "src/assets/icons")) // 排除自定义svg目录
      .end();
    config.module
      .rule("icons")
      .test(/\.(svg)(\?.*)?$/)
      .include.add(path.join(__dirname, "src/assets/icons"))
      .end() // 新规则应用于我们存放svg的目录
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" });
    config.plugin("html").tap((args) => {
      args[0].title = "辰星俱乐部";
      args[0].isProd = isProd;
      return args;
    });
    config.resolve.alias
      .set("components", resolve("./src/components")) //set第一个参数：设置的别名，第二个参数：设置的路径
      .set("icons", resolve("./src/assets/icons"))
      .set("http", resolve("./src/utils/http"));

    if (isProd) {
      config.module
        .rule("images")
        .test(/\.(png|jpe?g|gif|webp|avif)(\?.*)?$/)
        .set("parser", {
          dataUrlCondition: {
            maxSize: 0.5 * 1024, // 5KiB
          },
        })
        .set("generator", {
          filename: "img/[hash:8][ext]",
        });
      config.plugins.delete("prefetch").delete("preload");
      config.optimization.minimizer("terser").tap((args) => {
        // 注释console.*
        args[0].terserOptions.compress.drop_console = true;
        // remove debugger
        args[0].terserOptions.compress.drop_debugger = true;
        // 移除 console.log
        args[0].terserOptions.compress.pure_funcs = ["console.log"];
        // 去掉注释 如果需要看chunk-vendors公共部分插件，可以注释掉就可以看到注释了
        args[0].terserOptions.output = {
          comments: false,
        };
        return args;
      });

      config.optimization.splitChunks({
        chunks: "all",
        // minSize: 300000, // 依赖包超过300000bit将被单独打包
        cacheGroups: {
          libs: {
            name: "chunk-libs", //依赖的第三方
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial",
          },
          antdVueUI: {
            name: "chunk-vant", //拆分单包
            chunks: "all",
            priority: 20,
            test: /[\\/]node_modules[\\/]_?vant(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons", //公共页面
            test: resolve("src/components"),
            minChunks: 3, // 最小引用
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
    }
  },
};
