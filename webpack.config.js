const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');

const optimization = () => {                                               //     optimizacyaneri hamara
    config = {
        splitChunks: {                                                     //
            chunks: 'all'                                                  //     nayuma ete mi js @ mi qnai texa import arac amen meki hamar chi buildum taza fila sarqum mejna dnum mnacacin kpcnuma et fil@ aracn sra bulduma amen meki hamar
        }                                                                  //
    };

    if (isProd) {                                                           // ete prduction a uremn minify ara cssner@
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),                          // cssner@ minify anelu hamaren
            new TerserWebpackPlugin()                                      // cssner@ minify anelu hamaren
        ]
    }
    return config;
};


const fileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;   //     [name] anunna entry i , [contenthash] - contenti hash@ ete poxvela kpoxvi cashingic xusapelu hamar


const cssLoaders = (extra) => {
    let loaders = [                                                         //     wepback@ kartuma ajic dzax css-loader@ toxuma jsum css import anel, style-loader@ htmuli hedum avelacnuma et cssner@
        {                                                                   //     ['style-loader', 'css-loader'] css save a num jsneri mej heto dnuma html headi mej
            //     [MiniCssExtractPlugin.loader, 'css-loader'] cssner@ arandzin fili meja pahum petqa pluginnerumel import anel
            loader: MiniCssExtractPlugin.loader,                            //     [
            options: {                                                      //       {
                hmr: isDev,                                                 //         loader: MiniCssExtractPlugin.loader,
                reloadAll: true                                             //         options:
            }                                                               //           {
        },                                                                  //              hmr: isDev     nra hamara vor css poxeluc sax buld chani menak css ani u et ktor@ poxvi (hot module replacement),
        'css-loader'                                                        //              reloadAll: true
    ];                                                                      //           }
                                                                            //        }
    if (extra) {                                                             //     ]
        loaders.push(extra)
    }

    return loaders
};


babelOptions = (preset) => {
    let options = {//
        presets: [                                      //  @babel/plify async await i hamar maini meja drvum
            "@babel/preset-env",                        //  bubeli plugnneri texna
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    };

    if (preset) options.presets.push(preset)

    return options;

};


jsTsLoaders = (preset) => {
    let loaders = [
        {
            loader: "babel-loader",
            options: preset ? babelOptions(preset) : babelOptions(),
        }
    ];

    if (isDev) loaders.push('eslint-loader');

    return loaders;
};

plugins = () => {
    plugins = [                                                           //     pluginner
        new HTMLWebpackPlugin({                                          //     htmlna qo talis u sax scripner@ kpcnuma iran
            template: './index.html',                                    //     ete taliuses qo index@ qonna anum ete che iranna sarqum ete talises qon@ title ches kara tas
            minify: {
                collapseWhitespace: false //isProd                       //     karanq uxaki tanq true misht minify kani isk ete sernc tanq menak productioni jamanak
            }

        }),                                                              //
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [                                                  //     filer@ kam papkeq@ build i papkiu mej qcelu hamara
                {                                                        //
                    from: path.resolve(__dirname, 'src/favicon.ico'),    //     vortexic copy ani (absolute path)
                    to: path.resolve(__dirname, 'dist')                  //     ur copy ani (absolute path)
                }                                                        //
            ]
        }),
        new MiniCssExtractPlugin({                                       //
            filename: fileName('css')                                //    cssner@ arandzin filova pahum
        })                                                               //
    ];

    if (isProd) {
        plugins.push(new WebpackBundleAnalyzer.BundleAnalyzerPlugin())  //  analyze anelu hamra buildt
    }

    return plugins;
}

const isDev = process.env.NODE_ENV === 'development';                    //     ete --mode developmenta esi trua ete che false flag a inch vor baner anelu hamar orinak hmr@ petqa menak devum miacac lini
const isProd = !isDev;
console.log('isDev:', isDev);                                            //     windows "set NODE_ENV=development" isk mac kam ubuntu  "export NODE_ENV=development"


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',                                                 //     build i mod@ kam development(no minified js) kam production(minified js)
    entry: {                                                             //
        main: ['@babel/polyfill', './index.js'],                         //     skzbnakan ket@ karanq aranc object grenq menak main khaskana , @babel/plify async await i hamar maini meja drvum
        analytics: './analytics.ts'                                      //     mnacac@ senc petqa import anel
    },                                                                   //
    output: {                                                            //
        filename: fileName('js'),
        path: path.resolve(__dirname, 'dist')                            //     build i papki anun@ u ira absolute path@
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.ts'],                            //     default extentionnser kan vor import aneluc karas chgres orinak js, json esi haytarareluc heto dranq jnjvuma u qon@ pti sax gres dzerov
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),           //     aboslute patheri hamara vor ./../../models chgres gres @models import aneluc
            '@': path.resolve(__dirname, 'src'),
        },
    },
    optimization: optimization(),                                     //     optimizacyaneri hamara
    devServer: {                                                         //
        port: 4200,                                                        //     servera miacnum 4200 portov u amen save aneluc mianqamic poxvuma(build chi anum ramuma pahum) live aranc ej@ reload anelu isk watch i depqum  menak builduma isk refresh chi anum ejt
        hot: isDev                                                         //     lini dev server menak development modum
    },                                                                   //
    devtool: isDev ? 'source-map' : '',                                  //     developmenti hamar tooleres miacnum oriunak soruce-map erp vor consolum baccumes fil@ compile arac@ chi cuc talis ayl qo grac@ henc
    plugins: plugins(),
    module: {                                                            //     urishi tipi fileri het ashxatelu hamar orinak css
        rules: [                                                         //     asuma inch orenqnerov petqa arvi amen loader@ (object@)
            {                                                            //     laodera-css i
                test: /\.css$/,                                          //     henc tena .css ka uremn use imeji loaderner@ ani
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,                                       //  sass@ linuma kam sass kam scss [ac] talisenq vor kam kara lini a kam c
                use: cssLoaders('sass-loader')
            },
            {                                                            //
                test: /\.(png|jpg|svg|jpeg|gif|ico)$/,                   //    nkarner kam urish cankacac filer load anelu hamara file-loader
                use: ['file-loader']                                     //
            },                                                           //
            {                                                            //
                test: /\.(ttf|woff|woff2|eot)$/,                         //    nkarner kam urish cankacac filer load anelu hamara file-loader
                use: ['file-loader']                                     //
            },
            {
                test: /\.xml$/,                                          //    xml load anelu hamar xml-loader
                use: ['xml-loader']                                      //
            },
            {
                test: /\.csv$/,                                          //    csv load anelu hamar csv-loader
                use: ['csv-loader']                                      //
            },
            {                                                            //    babelnenq miacnum vor code compile ani es5 vor browserner@ bolor haskanan
                test: /\.js$/,                                           //
                exclude: /node_modules/,                                 //
                use: jsTsLoaders()
            },
            {                                                            //
                test: /\.ts$/,                                           //   typescripti hamar
                exclude: /node_modules/,                                 //
                use: [
                    {
                        loader: "babel-loader",
                        options: babelOptions("@babel/preset-typescript"),
                    }
                ]
            }

        ]
    }
};
