const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        popup: path.resolve(__dirname, 'src/pages/PopupPage/index.tsx'),
        background: path.resolve(__dirname, 'src/chrome/background.ts'),
        contentScript: path.resolve(__dirname, 'src/chrome/contentScript.ts'),
    },
    mode: 'development',
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: { noEmit: false },
                        }
                    }],
                exclude: /node_modules/,
            },
            {
                loader: 'file-loader',
                type: 'asset/resource',
                options: {
                    name: '/images/[name].[ext]'
                },
                test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/,
            },
            {
                exclude: /node_modules/,
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'manifest.json', to: '../manifest.json' },
                {
                    from: path.resolve(__dirname, 'src/assets/images'),
                    to: path.resolve(__dirname, 'dist/images')
                }
            ],
        }),
        ...getHtmlPlugins(
            [
                'popup',
            ]),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].js',
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: 'React extension',
                filename: `${ chunk }.html`,
                chunks: [chunk],
            })
    );
}
