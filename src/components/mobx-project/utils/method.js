import {  notification } from 'antd';
export const openNotificationWithIcon = ({type,message,description}) => {
    if(type==="success"){
        message = message||"请求成功！";
    }else if(type==="error"){
        message = message||"请求失败！"
    }
    notification[type]({
        message:message||"提示",
        description:
            description||"",
    });
};