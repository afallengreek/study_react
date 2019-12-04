/**
 * @Description:react-scripts升级到2.0.1后的代理配置
 * @Author: CHEHSHUANG
 * @Date: 2019/2/16
 */
const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(proxy('/bbc', {
        target: 'https://d.apicloud.com/mcm/api',
        changeOrigin: true,
        pathRewrite: {
            "^/bbc": "/" // 把/api 变成空
        }
    }));
    app.use(proxy('/recipe', {target: 'https://api.jisuapi.com/', changeOrigin: true}));
};
