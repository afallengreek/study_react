/**
 * Created by liusonglin on 2018/7/13.
 */
import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';
import { defaultPageSize,gatewayHost }from '../../configs/DefaultConfig';
import { isLocalhost,cache } from "./CommonUtils";
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
const instance = axios.create({
    //当创建实例的时候配置默认配置
    xsrfCookieName: 'xsrf-token'
});

export function getHeader() {
    const authHeader = {
        'Content-Type':'application/json;charset=UTF-8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
    };

    return authHeader;
}
instance.defaults.timeout = 100001

// //添加请求拦截器
// instance.interceptors.request.use(function(config){
//     if(config.url.indexOf('ByPage')!==-1) {
//         if (config.params !== undefined) {
//             config.params = {
//                 pageInfo: config.params.pageInfo ? config.params.pageInfo : {
//                     'page': 1,
//                     'rows': defaultPageSize
//                 }, ...config.params
//             }
//         } else if (config.data !== undefined) {
//             config.data = {
//                 pageInfo: config.data.pageInfo ? config.data.pageInfo : {
//                     'page': 1,
//                     'rows': defaultPageSize
//                 }, ...config.data
//             }
//         }
//     }
//     // config.url=gatewayHost+config.url;
//     if(!isLocalhost || config.url.indexOf('http')===-1){
//         config.url=gatewayHost+config.url
//     }
//     return config;
// },function(error){
//     return Promise.reject(error);
// });
//
// //添加一个响应拦截器
// instance.interceptors.response.use(function (response) {
//     // 1.成功
//     if (response.status===200) {
//         if(response.data.status===401){
//             window.location.replace(window.location.origin)
//             return Promise.reject(response.data);
//         }
//         return response.data;
//     }
//     if (response.status===204) {
//         return ;
//     }
//     // 3.其他失败，比如校验不通过等
//     message.error(response.msg)
//     return Promise.reject(response.data);
// }, function (err) {
//     console.log("fdsfasdf",err);
//     if (err && err.response) {
//         switch (err.response.status) {
//             case 400: err.message =seiIntl.get({key: 'gwmBdm_000001', desc: '请求错误(400)'}) ; break;
//             case 401: err.message =seiIntl.get({key: 'gwmBdm_000002', desc: '未授权，请重新登录(401)'}); break;
//             case 403: err.message =seiIntl.get({key: 'gwmBdm_000003', desc: '拒绝访问(403)'}); break;
//             case 404: err.message =seiIntl.get({key: 'gwmBdm_000004', desc: '请求出错(404)'}); break;
//             case 408: err.message =seiIntl.get({key: 'gwmBdm_000005', desc: '请求超时(408)'}); break;
//             case 500: err.message =seiIntl.get({key: 'gwmBdm_000006', desc: '服务器错误(500)'}); break;
//             case 501: err.message =seiIntl.get({key: 'gwmBdm_000007', desc: '服务未实现(501)'}); break;
//             case 502: err.message =seiIntl.get({key: 'gwmBdm_000008', desc: '网络错误(502)'}); break;
//             case 503: err.message =seiIntl.get({key: 'gwmBdm_000009', desc: '服务不可用(503)'}); break;
//             case 504: err.message =seiIntl.get({key: 'gwmBdm_000010', desc: '网络超时(504)'}); break;
//             case 505: err.message =seiIntl.get({key: 'gwmBdm_000011', desc: 'HTTP版本不受支持(505)'}); break;
//             default: err.message = `${seiIntl.get({key: 'gwmBdm_000012', desc: '连接出错({0})!'},{0:err.response.status})}`;
//         }
//         if(err.response.status === 401){
//             cache.clear('Authorization');
//             cache.clear('Right');
//             cache.clear('_s');
//             cache.clear('authHeader');
//             return;
//         }
//         if(err.response.data){
//             err.message = err.message+"  "+err.response.data.msg
//         }
//     }else{
//         // err.message =seiIntl.get({key: 'gwmBdm_000013', desc: '连接服务器失败!'})
//     }
//     return Promise.reject({
//         messageCode: err.message
//     });
// });

// 建立唯一的key值
function buildUrl (url, params = {}) {
    const sortedParams = Object.keys(params).sort().reduce((result, key) => {
        result[key] = params[key]
        return result
    }, {})

    url += `?${JSON.stringify(sortedParams)}`
    return url
}

export default {
    deleteParam (url,param={}) {
        return new Promise((resolve,reject) => {
            instance({
                method: 'delete',
                headers: getHeader(),
                url,
                params: param,
            }).then(res => {
                resolve(res)
            }).catch(err =>{
                message.error(err.messageCode)
                reject(err)
            })
        })
    },
    getArray (url, param={}) {

        return instance.get(url, {
                params: param,
                headers: getHeader(),
                paramsSerializer: params => {
                    return qs.stringify(params, { indices: false });
                }
            }
        );
    },
    get (url,param={},needCache=false,paramsInBody=false) {
        let res;
        if(res){
            return new Promise((resolve,reject) => {
                resolve(res);
            });
        }else{
            let config = {
                method: 'get',
                url
            }
            if(paramsInBody){
                config.data =  param;
            }else{
                config.params =  param;
            }
            return new Promise((resolve,reject) => {
                instance(config).then(res => {
                    if(needCache){
                        cache.set(buildUrl(url,param),res)
                    }
                    resolve(res)
                }).catch(err =>{
                    message.error(err.messageCode)
                    reject(err)
                })
            })
        }
    },
    post (url,param={}) {
        return new Promise((resolve,reject) => {
            instance({
                method: 'post',
                headers: getHeader(),
                url,
                params: param,
            }).then(res => {
                resolve(res)
            }).catch(err =>{
                message.error(err.messageCode)
                reject(err)
            })
        })
    },
    postJson(url,data={}){
        return new Promise((resolve,reject) => {
            instance({
                method: 'post',
                headers: getHeader(),
                url,
                data: data,
            }).then(res => {
                resolve(res)
            }).catch(err =>{
                message.error(err.messageCode)
                reject(err)
            })
        })
    },
    delete (url,param="") {
        return new Promise((resolve,reject) => {
            instance({
                method: 'delete',
                headers: getHeader(),
                url,
                data: param,
            }).then(res => {
                resolve(res)
            }).catch(err =>{
                message.error(err.messageCode)
                reject(err)
            })
        })
    },
}

