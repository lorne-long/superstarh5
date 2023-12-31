<ref *2> {
  parent: <ref *1> {
    parent: {
      parent: undefined,
      store: [Map],
      devServer: [Object],
      entryPoints: [Object],
      module: [Circular *1],
      node: [Object],
      optimization: [Object],
      output: [Object],
      performance: [Object],
      plugins: [Object],
      resolve: [Object],
      resolveLoader: [Object],
      shorthands: [Array],
      amd: [Function (anonymous)],
      bail: [Function (anonymous)],
      cache: [Function (anonymous)],
      context: [Function (anonymous)],
      devtool: [Function (anonymous)],
      externals: [Function (anonymous)],
      loader: [Function (anonymous)],
      mode: [Function (anonymous)],
      name: [Function (anonymous)],
      parallelism: [Function (anonymous)],
      profile: [Function (anonymous)],
      recordsInputPath: [Function (anonymous)],
      recordsPath: [Function (anonymous)],
      recordsOutputPath: [Function (anonymous)],
      stats: [Function (anonymous)],
      target: [Function (anonymous)],
      watch: [Function (anonymous)],
      watchOptions: [Function (anonymous)]
    },
    store: Map(1) { 'noParse' => /^(vue|vue-router|vuex|vuex-router-sync)$/ },
    rules: { parent: [Circular *1], store: [Map] },
    defaultRules: { parent: [Circular *1], store: Map(0) {} },
    shorthands: [ 'noParse', 'strictExportPresence' ],
    noParse: [Function (anonymous)],
    strictExportPresence: [Function (anonymous)]
  },
  store: Map(3) {
    'test' => /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
    'type' => 'asset',
    'generator' => { filename: 'img/[name].[hash:8][ext]' }
  },
  name: 'images',
  names: [ 'images' ],
  ruleType: 'rule',
  ruleTypes: [ 'rule' ],
  uses: { parent: [Circular *2], store: Map(0) {} },
  include: { parent: [Circular *2], store: Set(0) {} },
  exclude: { parent: [Circular *2], store: Set(0) {} },
  rules: { parent: [Circular *2], store: Map(0) {} },
  oneOfs: { parent: [Circular *2], store: Map(0) {} },
  resolve: <ref *3> {
    parent: [Circular *2],
    store: Map(0) {},
    alias: { parent: [Circular *3], store: Map(0) {} },
    aliasFields: { parent: [Circular *3], store: Set(0) {} },
    descriptionFiles: { parent: [Circular *3], store: Set(0) {} },
    extensions: { parent: [Circular *3], store: Set(0) {} },
    mainFields: { parent: [Circular *3], store: Set(0) {} },
    mainFiles: { parent: [Circular *3], store: Set(0) {} },
    modules: { parent: [Circular *3], store: Set(0) {} },
    plugins: { parent: [Circular *3], store: Map(0) {} },
    shorthands: [
      'cachePredicate',
      'cacheWithContext',
      'concord',
      'enforceExtension',
      'enforceModuleExtension',
      'symlinks',
      'unsafeCache'
    ],
    cachePredicate: [Function (anonymous)],
    cacheWithContext: [Function (anonymous)],
    concord: [Function (anonymous)],
    enforceExtension: [Function (anonymous)],
    enforceModuleExtension: [Function (anonymous)],
    symlinks: [Function (anonymous)],
    unsafeCache: [Function (anonymous)]
  },
  shorthands: [
    'enforce',
    'issuer',
    'parser',
    'resource',
    'resourceQuery',
    'sideEffects',
    'test',
    'type'
  ],
  enforce: [Function (anonymous)],
  issuer: [Function (anonymous)],
  parser: [Function (anonymous)],
  resource: [Function (anonymous)],
  resourceQuery: [Function (anonymous)],
  sideEffects: [Function (anonymous)],
  test: [Function (anonymous)],
  type: [Function (anonymous)]
}
{
  mode: 'development',
  context: 'F:\\SuperStar\\client\\web\\H5',
  output: {
    hashFunction: 'xxhash64',
    path: 'F:\\SuperStar\\client\\web\\H5\\dist',
    filename: 'js/[name].js',
    publicPath: '/',
    chunkFilename: 'js/[name].js'
  },
  resolve: {
    alias: {
      '@': 'F:\\SuperStar\\client\\web\\H5\\src',
      vue$: 'vue/dist/vue.runtime.esm.js',
      components: 'F:\\SuperStar\\client\\web\\H5\\src\\components',
      icons: 'F:\\SuperStar\\client\\web\\H5\\src\\assets\\icons',
      http: 'F:\\SuperStar\\client\\web\\H5\\src\\utils\\http'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      'F:\\SuperStar\\client\\web\\H5\\node_modules',
      'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules'
    ]
  },
  resolveLoader: {
    modules: [
      'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-plugin-babel\\node_modules',
      'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\lib\\config\\vue-loader-v15-resolve-compat',
      'node_modules',
      'F:\\SuperStar\\client\\web\\H5\\node_modules',
      'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules'
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('esm') */
      {
        test: /\.m?jsx?$/,
        resolve: {
          fullySpecified: false
        }
      },
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          /* config.module.rule('vue').use('vue-loader') */
          {
            loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\vue-loader-v15\\lib\\index.js',
            options: {
              compilerOptions: {
                whitespace: 'condense'
              }
            }
          }
        ]
      },
      /* config.module.rule('vue-style') */
      {
        test: /\.vue$/,
        resourceQuery: /type=style/,
        sideEffects: true
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').oneOf('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              /* config.module.rule('pug').oneOf('pug-vue').use('pug-plain-loader') */
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').oneOf('pug-template') */
          {
            use: [
              /* config.module.rule('pug').oneOf('pug-template').use('raw') */
              {
                loader: 'raw-loader'
              },
              /* config.module.rule('pug').oneOf('pug-template').use('pug-plain-loader') */
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext]'
        },
        exclude: [
          'F:\\SuperStar\\client\\web\\H5\\src\\assets\\icons'
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:8][ext]'
        }
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'media/[name].[hash:8][ext]'
        }
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset',
        generator: {
          filename: 'fonts/[name].[hash:8][ext]'
        }
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('css').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('css').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('vue').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('css').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal') */
          {
            use: [
              /* config.module.rule('css').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('normal').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('postcss').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('postcss').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('vue').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('vue').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('postcss').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('postcss').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('normal').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('normal').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('scss').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('scss').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('scss').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('scss').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('sass').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('sass').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('sass').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal') */
          {
            use: [
              /* config.module.rule('sass').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('less').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('less-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  lessOptions: {
                    javascriptEnabled: true,
                    modifyVars: {
                      hack: 'true; @import "~@/styles/vant.less";',
                      javascriptEnabled: true
                    },
                    globalVars: {
                      hack: 'true; @import \'~@/styles/var.less\';'
                    }
                  }
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('less').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('vue').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('vue').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('vue').use('less-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  lessOptions: {
                    javascriptEnabled: true,
                    modifyVars: {
                      hack: 'true; @import "~@/styles/vant.less";',
                      javascriptEnabled: true
                    },
                    globalVars: {
                      hack: 'true; @import \'~@/styles/var.less\';'
                    }
                  }
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('less').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('less-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  lessOptions: {
                    javascriptEnabled: true,
                    modifyVars: {
                      hack: 'true; @import "~@/styles/vant.less";',
                      javascriptEnabled: true
                    },
                    globalVars: {
                      hack: 'true; @import \'~@/styles/var.less\';'
                    }
                  }
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal') */
          {
            use: [
              /* config.module.rule('less').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('normal').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('normal').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('normal').use('less-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  lessOptions: {
                    javascriptEnabled: true,
                    modifyVars: {
                      hack: 'true; @import "~@/styles/vant.less";',
                      javascriptEnabled: true
                    },
                    globalVars: {
                      hack: 'true; @import \'~@/styles/var.less\';'
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('stylus').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('stylus').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('stylus').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal') */
          {
            use: [
              /* config.module.rule('stylus').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('css-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('postcss-loader') */
              {
                loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          /* config.module.rule('js').use('babel-loader') */
          {
            loader: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\babel-loader\\lib\\index.js',
            options: {
              cacheCompression: false,
              cacheDirectory: 'F:\\SuperStar\\client\\web\\H5\\node_modules\\.cache\\babel-loader',
              cacheIdentifier: 'b6e9bf3e'
            }
          }
        ]
      },
      /* config.module.rule('icons') */
      {
        test: /\.(svg)(\?.*)?$/,
        include: [
          'F:\\SuperStar\\client\\web\\H5\\src\\assets\\icons'
        ],
        use: [
          /* config.module.rule('icons').use('svg-sprite-loader') */
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    realContentHash: false,
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      /* config.optimization.minimizer('terser') */
      new TerserPlugin(
        {
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          },
          parallel: true,
          extractComments: false
        }
      )
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          VUE_APP_GATHER_KEY: '"7b2f3a371eb25c367dad8a029ac02dc9"',
          VUE_APP_GATHER_PATH: '"/sdk"',
          VUE_APP_I18N_LOCALE: '"en"',
          VUE_APP_PROXYS: '"[[\\"/slg_api\\",\\"http://192.168.60.75:8080\\"],[\\"/sdk\\",\\"http://192.168.60.75:8080\\"]]"',
          VUE_APP_PROXYS1: '"[[\\"/slg_api\\",\\"https://superstarapp.hzmobi.com\\"],[\\"/sdk\\",\\"https://littlebee-server.qhlyou.com\\"]]"',
          VUE_APP_PUBLIC_PATH: '"/"',
          VUE_APP_URL_PREFIX: '"/slg_api"',
          VUE_APP_USER_INFO: '"XC_USERINFO"',
          VUE_APP_XSRF_NAME: '"Authorization"',
          BASE_URL: '"/"'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        title: '杈版槦淇变箰閮?,
        scriptLoading: 'defer',
        templateParameters: function () { /* omitted long function */ },
        template: 'F:\\SuperStar\\client\\web\\H5\\public\\index.html',
        isProd: false
      }
    ),
    /* config.plugin('copy') */
    new CopyPlugin(
      {
        patterns: [
          {
            from: 'F:\\SuperStar\\client\\web\\H5\\public',
            to: 'F:\\SuperStar\\client\\web\\H5\\dist',
            toType: 'dir',
            noErrorOnMissing: true,
            globOptions: {
              ignore: [
                '**/.DS_Store',
                'F:/SuperStar/client/web/H5/public/index.html'
              ]
            },
            info: {
              minimized: true
            }
          }
        ]
      }
    ),
    {
      options: {
        filter: [],
        enable: false
      }
    }
  ],
  entry: {
    app: [
      './src/main.js'
    ]
  }
}
