var Elixir = require('laravel-elixir'),
    gulp = require('gulp'),
    webpack = require('webpack'),
    gutil = require('gutil'),
    del = require('del'),
    vue = require("vue-loader"),
    livereload = require('laravel-elixir-livereload'),
    Q = require('q'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    WebpackManifestPlugin = require('webpack-manifest-plugin'),
    WebpackNotifierPlugin = require('webpack-notifier');

var Task = Elixir.Task;

Elixir.extend('clean', function(options) {
    new Task('clean', function() {
        return del(options);
    });
});

Elixir.extend('webpack', function(options) {
    new Task('webpack', function() {
        var deferred = Q.defer();

        gulp.task('webpack', function(callback) {
            webpack(options, function(err, stats) {
                if (err) {
                    deferred.reject(callback());

                    throw new gutil.PluginError("webpack", err);
                }else{
                    gutil.log("[Webpack]", stats.toString({
                        // colors: gutil.colors.supportsColor,
                        // hash: false,
                        // timings: false,
                        // chunks: false,
                        // chunkModules: false,
                        // modules: false,
                        // children: true,
                        // version: true,
                        // cached: false,
                        // cachedAssets: false,
                        // reasons: false,
                        // source: false,
                        // errorDetails: false
                    }));

                    deferred.resolve(callback());
                }
            })
        });

        return deferred.promise;
    })
    .watch(config.get('assets.js.folder') + '/*.js')
    .watch(config.get('assets.js.folder') + '/**/*.js')
    .watch(config.get('assets.js.folder') + '/**/*.scss')
    .watch(config.get('assets.js.folder') + '/**/*.html')
    .watch(config.get('assets.js.folder') + '/**/*.vue');
});

Elixir(function(mix) {
    mix
        .clean([
            'public/build',
        ])
        .webpack({
            entry: [
                './resources/assets/js/main.js',
            ],
            output: {
                path      : __dirname + '/public/build',
                publicPath: '/build/',
                filename  : "bundle-[hash].js",
                pathinfo  : true
            },
            devtool: "#source-map",
            module: {
                loaders: [{
                    test: require.resolve('jquery'),
                    loader: 'expose?jQuery'
                }, {
                    test: /\.js$/,
                    loader: "babel-loader?sourceMap",
                    exclude: /node_modules/
                }, {
                    test: /\.css$/,
                    loader: "style-loader!css-loader?sourceMap!postcss-loader?sourceMap"
                }, {
                    test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader?limit=10000&minetype=application/font-woff"
                }, {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader?limit=10000&mimetype=application/octet-stream"
                }, {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "file-loader"
                }, {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader?limit=10000&mimetype=image/svg+xml"
                }, {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader?sourceMap!less-loader?sourceMap")
                }, {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap')
                }, {
                    test: /\.html$/,
                    loader: "html-loader"
                }, {
                    test: /\.vue$/,
                    loader: "vue-loader"
                }]
            },
            vue: {
                css: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader")
            },
            babel: {
                presets: ['es2015'],
                plugins: ['transform-runtime']
            },
            plugins: [
                new ExtractTextPlugin('bundle-[hash].css', { disable: false }),
                new WebpackNotifierPlugin(),
                new WebpackManifestPlugin({
                    fileName: 'rev-manifest.json',
                }),
            ],
        })
        .livereload()
});
