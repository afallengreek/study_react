import React from "react";
import _ from "lodash"
export function getList(dataStore,key,toStringCover) {
    if(!_.isArray(dataStore)){
        dataStore=dataStore.data||dataStore.rows;
    }
    toStringCover=toStringCover||toString;
    return new List(dataStore,key,dataStore.length,toStringCover);
}
function List(dataStore,key,size) {
    this.dataStore = dataStore;
    this.listSize = size;
    this.key=key||"id";
    this.pos = 0;
    this.clear = clear;
    this.findIndex = findIndex;
    this.toString = toString;
    this.insertByElementBefore = insertByElementBefore;
    this.insertByElementAfter = insertByElementAfter;
    this.getListData = getListData;
    this.append = append;
    this.remove = remove;
    this.front = front;
    this.end = end;
    this.prev = prev;
    this.next = next;
    this.length = length;
    this.currPos = currPos;
    this.moveTo = moveTo;
    this.getElement = getElement;
    this.findContainByKey = findContainByKey;
    this.contains = contains;
    this.findKey = findKey;
    this.sortBy = sortBy;
    this.removeByKey = removeByKey;
    this.insertByIndex =insertByIndex;
    this.getFront = getFront;
    this.getLast = getLast;
    this.findElementByKey = findElementByKey;
    this.getItemByIndex = getItemByIndex;
    this.findByCondition = findByCondition;
    this.splitByContion = splitByContion;
    this.falseBack = undefined;
}
function getListData (){
    return this.dataStore;
}
function getItemByIndex (index) {
    if(index>=0&&index<=this.dataStore) {
        return this.dataStore[index];
    }else{
        return false;
    }
}
function append(element){
    this.dataStore[this.listSize++] = element;
}
function front() {
    this.pos = 0;
}
function end() {
    this.pos = this.listSize-1;
}
function getFront() {
    if(this.dataStore.length>0){
         return this.dataStore[0];
    }else{
         return this.falseBack;
    }
}
function getLast() {
    if(this.dataStore.length>0){
        return this.dataStore[this.dataStore.length-1];
    }else{
        return this.falseBack;
    }
}

function findIndex(element) {
    let key=this.key;
    for(let i = 0; i < this.dataStore.length; i++) {
        if (_.isEqual(this.dataStore[i],element)
            ||this.dataStore[i][key]===element[key]) {
            return i;
        }
    }
    return -1;
}
function prev() {
    if (this.pos > 0) {
        --this.pos;
        return true;
    }else{
        return false;
    }
}
function next() {
    if (this.pos < this.listSize-1) {
        ++this.pos;
        return true;
    }else{
        return false;
    }
}
function currPos() {
    return this.pos;
}
function moveTo(position) {
    this.pos = position;
}
function getElement() {
    return this.dataStore[this.pos];
}
//返回排序好的对象数组
//changeOriginData:是否修改List里面的原数据
//condition
// 单个条件：['user', 'age']
// 自定义条件：[function(o) { return o.user; }]
function sortBy(condition,notChangeOriginData) {
    if(condition instanceof String || condition instanceof Function){
        condition=[condition]
    }
    let data =notChangeOriginData?_.cloneDeep(this.dataStore):this.dataStore;
    return _.sortBy(data,condition)
}
function remove(element){
    let foundAt = this.findIndex(element);
    if(foundAt > -1) {
        this.dataStore.splice(foundAt,1);
        --this.listSize;
        return true;
    }
    return false;
}

//返回删除了数据的对象数组
//condition:接受一个对象
//{name:"px"}
//{name:["px"]}
//{name:"px",code:["10002"]}
function removeByKey(condition , notChangeOriginData){
    let data =notChangeOriginData?_.cloneDeep(this.dataStore):this.dataStore;
    if(_.isString(condition)){
        condition = {[this.key]:condition};
    }
    Object.keys(condition).forEach((key)=> {
            let filter = [];
            if (_.isArray(condition[key])){
                for(let i=0;i<condition[key].length;i++){
                    filter.push({[key]:condition[key][i]});
                }
            }else if(_.isString(condition[key])||_.isNumber(condition[key])){
                filter.push({[key]:condition[key]});
            }
            if(notChangeOriginData) {
                data = _.differenceBy(data, filter, key);
                filter = [];
            }else{
                this.dataStore = _.differenceBy(this.dataStore, filter, key);
                filter = [];
            }

       }
    );

    return notChangeOriginData?data:this.dataStore;
}

function  length() {
    return this.listSize;

}
//支持复写
function toString(){
    // return this.dataStore;
}

function insertByElementAfter(element,theElementBefore,notChangeOriginData){
    let data =notChangeOriginData?_.cloneDeep(this.dataStore):this.dataStore;
    let  insertPos = this.findIndex(theElementBefore);
    if (insertPos > 0){
        data.splice(insertPos-1,0,element);
        ++this.listSize;
        return true;
    }
    return false;
}
function insertByElementBefore(element,theElementBefore,notChangeOriginData){
    let data =notChangeOriginData?_.cloneDeep(this.dataStore):this.dataStore;
    let  inserPos = this.findIndex(theElementBefore);
    if (inserPos > -1){
        data.splice(inserPos+1,0,element);
        ++this.listSize;
        return true;
    }
    return false;
}

function insertByIndex (element,index,notChangeOriginData) {
    let data =notChangeOriginData?_.cloneDeep(this.dataStore):this.dataStore;
    if(index<=this.dataStore.length){
        data.splice(index,0,element);
        return true;
    }else{
        return false;
    }

}
function contains(element) {
    for(let i = 0;i < this.dataStore.length;++i){
        if(_.isEqual(this.dataStore[i],element)){
            return true;
        }
    }
    return false;
}
//key:关键字
function findElementByKey(element) {
    let key = this.key;
    let searchKey = _.isString(element)?element:element[key];
    for(let i=0;i < this.dataStore.length;++i){

        if(this.dataStore[i][key]===searchKey){
            return this.dataStore[i];
        }
    }
    return false;
}
//key:关键字
function findContainByKey(element,key) {
     key=key||this.key;
    for(let i=0;i < this.dataStore.length;++i){
        if(this.dataStore[i][key]===element[key]){
            return true;
        }
    }
    return false;
}
//  获取第一个查询到的值
//  condition:
// 支持对象{a:"a",b:"b",...}
// 单个条件数组：[a:"a"]
// 字符串(用来查单个key是true还是false)："a"
//fuc: function(o) { return o.age < 40; }
function findKey(condition){
      return _.findKey(this.dataStore,condition)
}
function findByCondition(condition,notChangeOriginData){
    return this.splitByContion(condition,notChangeOriginData)[0];
}
function splitByContion(condition,notChangeOriginData) {
    let data =notChangeOriginData?_.cloneDeep(this.dataStore):this.dataStore;
    return _.partition(data, condition);
}
function clear(){
    delete this.dataStore;
    this.dataStore = [];
    this.license = this.pos =0;
}
class ListTest extends React.Component{

    render=()=>{
        const dataSource = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        }, {
            key: '3',
            name: '张飞',
            age: 45,
            address: '西湖区湖底公园1号'
        }, {
            key: '4',
            name: '李四',
            age: 23,
            address: '西湖区湖底公园1号'
        }, {
            key: '5',
            name: '王企鹅',
            age: 66,
            address: '西湖区湖底公园1号'
        }, {
            key: '6',
            name: '王霸',
            age: 47,
            address: '西湖区湖底公园1号'
        }, {
            key: '7',
            name: '王子殿',
            age: 42,
            address: '西湖区湖底公园1号'
        }, {
            key: '8',
            name: '胡彦祖1',
            age: 42,
            address: '西湖区湖底公园1号'
        }, {
            key: '9',
            name: '胡彦祖2',
            age: 42,
            address: '西湖区湖底公园1号'
        }, {
            key: '10',
            name: '胡彦祖3',
            age: 42,
            address: '西湖区湖底公园1号'
        }];
        let list=getList(dataSource,"key");
        console.log("我的值",list);
        let result=list.findByCondition(function (o) {
            return o.age>42;
        });
        console.log("我的result",list.getListData())
        let insertTest={
            key: '0',
            name: '胡彦',
            age: 42,
            address: '西湖区湖底公园1号'
        }
        list.insertByIndex(insertTest,0)
        console.log("我的值",list.getListData());
        list.removeByKey({key:["1","2","3"]});
        console.log("我的值43",list.getListData());
        return(
            <span>423</span>
        )
    }
}
export default ListTest;