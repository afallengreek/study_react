import axios from 'axios';
import {cache} from "./CommonUtils";
import {message} from "antd/lib/index";
import {appkey} from "../../configs/DefaultConfig";
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
    get (url,param={},needCache=false,paramsInBody=false){
        if(url.includes("/api")){

        }else{
           param.appkey = appkey;
        }
        let res = null;
        if(needCache){
            res = cache.get(buildUrl(url,param));
            if(res){
                return new Promise((resolve) => {
                    resolve(res);
                });
            }
        }
        let config = {
            method: 'get',
            url
        };
        if(paramsInBody){
            config.data =  param;
        }else{
            config.params =  param;
        }
        return new Promise((resolve,reject) => {
            axios(config).then(res => {
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
}