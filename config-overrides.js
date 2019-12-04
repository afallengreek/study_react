const {override, fixBabelImports, addLessLoader,addDecoratorsLegacy} = require('customize-cra');
const polyfillEntry = () => config => {
    config.entry= ["babel-polyfill",'./src/index.js'];
    return config;
};
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            "@menu-dark-color": "white",
            "@menu-dark-bg": "#364760",
            "@menu-dark-arrow-color": "#fff",
            "@menu-dark-submenu-bg": "rgba(46, 61, 83, 1)",
            "@menu-dark-highlight-color": "#fff",
            "@text-color": "rgba(0, 0, 0, 0.9)"
        }
    }),
    polyfillEntry(),
    addDecoratorsLegacy()
);