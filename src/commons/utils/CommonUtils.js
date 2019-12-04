import moment from 'moment';
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
//获得随机数id
export const  getUserItemId=()=>{
    let value;
    let res = [], hv;
    let rgx = new RegExp("[2345]");
    for (let i = 0; i < 8; i++) {
        hv = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        if (rgx.exec(i.toString()) != null) {
            if (i ===3) { hv = "6" + hv.substr(1, 3); }
            res.push("-");
        }
        res.push(hv.toUpperCase());
    }
    value = res.join('');
    return value;
}
//将xlsx读取为日期格式
export const formatDate=(numb, format = "-")=> {
    const time = new Date((numb - 1) * 24 * 3600000 + 1)
    time.setYear(time.getFullYear() - 70);
    const year = time.getFullYear() + '';
    const month = time.getMonth() + 1 + '';
    const date = time.getDate()  + '';
    if (format && format.length === 1) {
        return year + format + month + format + date
    }
    let dateStr =  year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date);
    return  dateStr;
}
//将map转换成数组
export const convertToArray=(mapObj)=>{
    let data = [];
    for(let item of mapObj.values()){
        data.push(item)
    }
    return data;
};
//获得唯一标志值
export const  getOnlyItemId=()=>{
    let value;
    let res = [], hv;
    let rgx = new RegExp("[2345]");
    for (let i = 0; i < 8; i++) {
        hv = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        if (rgx.exec(i.toString()) != null) {
            if (i ===3) { hv = "6" + hv.substr(1, 3); }
            res.push("-");
        }
        res.push(hv.toUpperCase());
    }
    value = res.join('');
    return value;
}
/**
 * 列表本地搜索,返回数据源，数据源每个子项上加搜索结果的 tag
 * @param {源数据} data
 * @param {搜索条件，对象，如；{key:'123'} } searchParam
 * @param {自定义搜索字段，如未填会全字段搜索，排除 id和租户代码字段} keys
 */
export async function searchListByKeyWithTag(data, searchParam, keys = []) {
  let list
  if (data.rows) {
    list = data.rows
  } else {
    list = data;
  }
  let excludeKey = [];
  if (keys.length === 0) {
    excludeKey = ['id', 'tenantCode']
  }
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    item.tag=false
    if (keys.length === 0) {
      keys = Object.keys(item)
    }
    for (let j = 0; j < keys.length; j++) {
      let key = keys[j]
      if (excludeKey.indexOf(key) !== -1) {
        continue;
      }
      let value ;
      if(key.includes('.')){
        let subKey = key.split('.')
        value=item;
        for (let i=0;i<subKey.length;i++) {
          value=getSubValue(value,subKey[i])
        }
      }else{
        value = item[key]
      }
      if(isEmpty(searchParam.keyword)){
        item.tag=true
      }
      if (value && !isEmpty(searchParam.keyword)) {
        if (typeof value === 'string' && typeof searchParam.keyword === 'string'
          && value.toLowerCase().includes(searchParam.keyword.toLowerCase())) {
          item.tag=true;
          break;
        }
        if (typeof value === 'string' && typeof searchParam.keyword=="object"
          && value.toLowerCase().includes(searchParam.keyword.key.toLowerCase())) {
          item.tag=true;
          break;
        }
      }
    }
  }
  return list;
}



/**
 * 列表本地搜索,返回过滤结果
 * @param {源数据} data
 * @param {搜索条件，对象，如；{key:'123'} } searchParam
 * @param {自定义搜索字段，如未填会全字段搜索，排除 id和租户代码字段} keys
 */
export async function searchListByKey(data, searchParam, keys = []) {
  let result = []
  let list
  let flag = true
  if (data.rows) {
    list = data.rows
  } else {
    list = data;
  }
  let excludeKey = [];
  if (keys.length === 0) {
    excludeKey = ['id', 'tenantCode']
  }
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    if (keys.length === 0) {
      keys = Object.keys(item)
    }
    for (let j = 0; j < keys.length; j++) {
      let key = keys[j]
      if (excludeKey.indexOf(key) !== -1) {
        continue;
      }
      let value ;
      if(key.includes('.')){
        let subKey = key.split('.')
        value=item;
        for (let i=0;i<subKey.length;i++) {
          value=getSubValue(value,subKey[i])
        }
      }else{
        value = item[key]
      }
      if (value && searchParam.keyword && !isEmpty(searchParam.keyword)) {
        flag = false
        if (typeof value === 'string' && typeof searchParam.keyword === 'string'
          && value.toLowerCase().includes(searchParam.keyword.toLowerCase())) {
          result.push(item)
          break;
        }
        if (typeof value === 'string' && typeof searchParam.keyword=="object"
          && value.toLowerCase().includes(searchParam.keyword.key.toLowerCase())) {
          result.push(item)
          break;
        }
      }
    }
  }
  return flag ? list : result;
}

function getSubValue(item,nextKey) {
  return item?item[nextKey]:null
}

export function isEmpty(val) {
  return val === undefined || val === null || val === '' || val === "" || (typeof val === 'string' && val.trim() === '')
}

export function checkRight(rightName) {
  if(!rightName){
    return true;
  }
  let rights = cache.get('Right');
  if (rights == null) {
    return false;
  }
  return rights.indexOf(rightName) !== -1;
}

export function checkOperateAuth(operateAuthority, operateCode) {

  if (operateAuthority === 'admin' ||
    (Array.isArray(operateAuthority) &&
      operateAuthority.includes(operateCode))
  )
  {
    return true;
  } else {
    return false;
  }
}

export function getUserInfo() {
  return cache.get('Authorization');
}

export function getUserId() {
  let userInfo = cache.get('Authorization');
  if(userInfo){
    return userInfo.userId
  }else{
    return null;
  }
}


export function openNewTab(uri, title, closeCurrent = false, id = undefined,webAddress) {
  let element = window.parent.document.getElementsByClassName('child_item');
  webAddress = webAddress||"/react-bdm-web/";
  let currentId = null;
  if (element) {
    for (let i = 0; i < element.length; i++) {
      let e = element[i];
      if (e.textContent === title) {
        id = e.id
      }
    }
    if (closeCurrent) {
      let currentTab = window.parent.document.getElementsByClassName('ux-tab-actived')
      if (currentTab && currentTab.length > 0) {
        currentId = currentTab[0].getAttribute('tabId');
      }
    }
    if (window.top.homeView) {
      if (!id) {
        id = getUUID()
      }
      if(uri.indexOf('http://')===0){
        window.top.homeView.add({
          title: title,
          url: uri,
          id: id
        });
      }else{
        window.top.homeView.add({
          title: title,
          url: "http://"+window.location.host+webAddress + uri,
          id: id
        });
      }
    } else {
      window.open("http://"+window.location.host+webAddress + uri);
    }
    if (currentId) {
      window.top.homeView.getTabPanel().close(currentId);
    }
    return id;
  }
}

/**
 *  当前页面展示时回调，主要用于更新
 * @param {页签获取焦点时的回调方法} callBack
 */
export function tabForceCallBack(callBack){
  let con = window.top.homeView;
  if(con){
    let currentId = con.currentTabId
    if(!window.top.homeView.tabListener[currentId]){
      currentId && con.addTabListener(currentId, function (id, win) {
        callBack()
      });
    }
  }
}

export const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.1/8 is considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);


export  function getUUID() {
  return Math.random().toString(36).substr(2);;
}

export function convertDataToFormData(data) {
  let formData = new FormData();
  if (isEmpty(data)) {
    return formData;
  }
  //如果传进对象为数组  返回数组
  if (data instanceof Array) {
    return data;
  }
  Object.keys(data).forEach((item) => {
    if (data[item] instanceof Array) {
      for (let value of data[item].values()) {
        formData.append(item, value);
      }
    } else if (data[item] instanceof Object) {
      for (let key of Object.keys(data[item])) {
        formData.append(item + '.' + key, data[item][key]);
      }
    } else if(data[item]){
      formData.append(item, data[item]);
    }
  });
  return formData;
}

moment.prototype.toJSON = function () {
  return moment(this).format("YYYY-MM-DD HH:mm:ss")
}

// 数据存储
export const cache = {
  set (key, data) {
      sessionStorage.setItem(key, JSON.stringify(data))
  },
  get (key) {
    return JSON.parse(sessionStorage.getItem(key))
  },
  clear (key) {
      sessionStorage.removeItem(key)
  }
}
//非负小数
export const checkNumber = (rule,value,callback)=>{
  let reg = /^\d+(\.\d+)?$/;
  if(!reg.test(value)||value===0){
    callback({message: seiIntl.get({key: 'gwmBdm_000031', desc: '请输入大于0的数字'})});
    return false;
  }
  callback();
}

export function isInclude (array, obj){
  if (array.size < 1 || array.length < 1) {
    return false;
  }
  let res = [];
  for (let e of array) {
    if (this.objectIsEqual(e, obj)){
      res.push(true)
    }
  }
  if (res.includes(true)) {
    return true
  } else {
    return false
  }
};


export function objectIsEqual (obj1, obj2){
  let map1 = this.objToStrMap(obj1);
  let map2 = this.objToStrMap(obj2);
  if (map1.length !== map2.length) {
    return false
  }
  let validateMap1Result = [];
  map1.forEach((value, key) =>{
    if ([...map2.keys()].includes(key)) {
      if (map2.get(key) === value) {
        validateMap1Result.push(true)
      } else {
        validateMap1Result.push(false)
      }
    } else {
      validateMap1Result.push(false)
    }
  });
  let validateMap2Result = [];
  map2.forEach((value, key) =>{
    if ([...map1.keys()].includes(key)) {
      if (map1.get(key) === value) {
        validateMap2Result.push(true)
      } else {
        validateMap2Result.push(false)
      }
    } else {
      validateMap2Result.push(false)
    }
  });
  if (validateMap1Result.includes(false)) {
    return false
  }
  if (validateMap2Result.includes(false)) {
    return false
  }
  return true
};

//计算时间几天前
export const countDate =(startTime) => {
  if (!startTime) {
    return;
  }
  const date = new Date();
  const endTime = date.getTime();
  startTime = startTime.replace(new RegExp("-", "gm"), "/");
  startTime = new Date(startTime).getTime();
  const time = endTime - startTime;
  if (time <= 60000) {//如果结束时间小于开始时间
    return seiIntl.get({key: 'gwmBdm_000050', desc: '刚刚'});
  } else {
    //计算出相差天数
    const days = Math.floor(time / (24 * 3600 * 1000));
    if (days > 0) {
      return days + seiIntl.get({key: 'gwmBdm_000051', desc: '天前'});
    }
    //计算出小时数
    const leave1 = time % (24 * 3600 * 1000);   //计算天数后剩余的毫秒数
    if (leave1 === 0) {//如果leave1=0就不需要在做计算，直接把0赋给hours
      return 0;
    } else {
      const hours = Math.floor(leave1 / (3600 * 1000));
      if (hours > 0) {
        return hours + seiIntl.get({key: 'gwmBdm_000052', desc: '小时前'});
      }
    }
    //计算相差分钟数
    const leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    const minutes = Math.floor(leave2 / (60 * 1000));
    return minutes + seiIntl.get({key: 'gwmBdm_000053', desc: '分钟前'});
  }
}
//分页查询参数转换
//页面参数格式：
// params = {
//    quickSearchProperties: [],//快速查询的字段
//    quickValue:"", 快速查询
//    Q_EQ_frozen1_Boolean: false,//查询字段1
//    Q_EQ_frozen2_String: "",//查询字段2
//    S_id_DESC,//排序
//    pageInfo：{page:1,rows:15}
// }

export const convertSearchFilter = (params = {}) => {
    const {
        quickSearchProperties = [],
        pageInfo = {page: 1, rows: 15},
        ...search
    } = params;
    const keys = Object.keys(search);
    const quickSearchValue = keys.includes("quickValue") ? search["quickValue"] : "";
    const filtersKeys = keys.filter(item => item.includes("Q_"));
    const filters = filtersKeys.map(item => {
        let itemArr = item.split("_");//Q_EQ_id_String
        return {
            operator: itemArr.length >= 2 ? itemArr[1] : "EQ",//操作类型
            fieldName: itemArr.length >= 3 ? itemArr[2] : "",//筛选字段
            fieldType: itemArr.length >= 4 ? itemArr[3] : "String",//筛选类型
            value: search[item]//筛选值
        };
    });
    const sortOrdersKeys = keys.filter(item => item.includes("S_"));
    const sortOrders = sortOrdersKeys.map(item => {
        let itemArr = item.split("_");//S_id
        return {
            property: itemArr.length >= 2 ? itemArr[1] : "",//排序字段
            direction: search[item]//排序类型 ASC DESC
        };

    });
    let otherParams = {};
    keys.filter(key=>{
        //otherParams = [];
        const bool = key.includes("Q_")||key.includes("S_")||key.includes("quickValue");
        if(!bool){
            otherParams[key] = search[key]
        }
    });

    let resParams = {
        quickSearchProperties,
        quickSearchValue,
        filters,
        sortOrders,
        pageInfo,
        ...otherParams
    };
    return resParams;
}
/**数组根据数组对象中的某个属性值进行排序的方法
 * 使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
 * @param attr 排序的属性 如number属性
 * @param rev true表示升序排列，false降序排序
 * */
export function sortBy(attr,rev){
    //第二个参数没有传递 默认升序排列
    if(rev ===  undefined){
        rev = 1;
    }else{
        rev = (rev) ? 1 : -1;
    }

    return function(a,b){
        a = a[attr];
        b = b[attr];
        if(a < b){
            return rev * -1;
        }
        if(a > b){
            return rev * 1;
        }
        return 0;
    }
}
//金额格式化
export const formatCurrency = (cellvalue) => {
    return formatAmount(cellvalue, 2);
}
export const formatAmount = (amount, precision) => {
    // if(!amount){
    //     return 0;
    // }
    let negative = amount < 0;
    amount = parseFloat(amount).toFixed(precision);
    let numarr = amount.split(".");
    amount = numarr[0];
    var result = "";
    if (negative) {
        amount = amount.slice(1, amount.length);
    }
    while (amount.length > 3) {
        result = "," + amount.slice(-3) + result;
        amount = amount.slice(0, amount.length - 3);
    }
    if (amount) {
        result = amount + result;
    }
    if (negative) {
        result = "-" + result + "." + numarr[1];
    } else {
        result = result + "." + numarr[1];
    }
    return result
}
export function onMoneyCheck(rule, value, callback,limit,hint,text){
    if ((!value&&value!==0) || value === "") {
        callback(hint||seiIntl.get({key: 'gwmBdm_000054', desc: '请填写金额'}));
    }
    else if (value>limit) {
        callback(text||seiIntl.get({key: 'gwmBdm_000055', desc: '金额不能大于{0}!'},{0:limit}));
    } else {
        callback();
    }
}
export const checkInputCode = () => {
    return {validator: checkCode};
};
//校验输入的code不能是双字节字符
export const checkCode = (rule, value, callback) => {
    const reg = /[^\x00-\xff]/g;
    if (value&&reg.test(value)) {
        callback(seiIntl.get({key: 'gwmBdm_000056', desc: '不能输入中文字符'}));
        return false;
    }
    callback();
};
