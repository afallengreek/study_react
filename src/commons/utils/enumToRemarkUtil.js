import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
export const getPaymentMethodRemark=(text)=>{
    if(text==="Telegraphic"){
        return seiIntl.get({key: 'gwmBdm_000014', desc: '电汇'});
    }else if(text==="Commercial"){
        return seiIntl.get({key: 'gwmBdm_000015', desc: '商业承兑'});
    }else if(text==="Bank"){
        return seiIntl.get({key: 'gwmBdm_000016', desc: '银行承兑'});
    }else if(text==="Credit"){
        return seiIntl.get({key: 'gwmBdm_000017', desc: '信用证'});
    }else if(text==="PassiveDeduction"){
        return seiIntl.get({key: 'gwmBdm_000018', desc: '被动扣款'});
    }else{
        return "";
    }
}
export const getAcceptancePeriodRemark=(text)=>{
    if(text===seiIntl.get({key: 'gwmBdm_000019', desc: '3个月'})){
        return seiIntl.get({key: 'gwmBdm_000019', desc: '3个月'});
    }else if(text===seiIntl.get({key: 'gwmBdm_000020', desc: '6个月'})) {
        return seiIntl.get({key: 'gwmBdm_000020', desc: '6个月'});
    }
}
export const getNatureOfRemittanceRemark=(text)=>{
    if(text==="A"){
        return seiIntl.get({key: 'gwmBdm_000021', desc: '预付款'});
    }else if(text===seiIntl.get({key: 'gwmBdm_000020', desc: '6个月'})) {
        return seiIntl.get({key: 'gwmBdm_000020', desc: '6个月'});
    }else if(text==="B") {
        return seiIntl.get({key: 'gwmBdm_000022', desc: '延期付款'});
    }else if(text==="C") {
        return seiIntl.get({key: 'gwmBdm_000023', desc: '尾款'});
    }else if(text==="D") {
        return seiIntl.get({key: 'gwmBdm_000024', desc: '货到付款'});
    }else if(text==="E") {
        return seiIntl.get({key: 'gwmBdm_000025', desc: '其他'});
    }
};
export const getAccountTypeRemark=(text)=>{
    if(text==="N"){
        return seiIntl.get({key: 'gwmBdm_000026', desc: '一般总账'});
    }else if(text==="C") {
        return seiIntl.get({key: 'gwmBdm_000027', desc: '客户'});
    }else if(text==="V") {
        return seiIntl.get({key: 'gwmBdm_000028', desc: '供应商'});
    }else if(text==="T") {
        return seiIntl.get({key: 'gwmBdm_000029', desc: '税金'});
    }else if(text==="A") {
        return seiIntl.get({key: 'gwmBdm_000030', desc: '资产'});
    }
};

