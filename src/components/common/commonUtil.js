export function my$(id) {
    return document.getElementById(id);
}

function withinErrorMargin(left,right){
    return Math.abs(left-right) < Number.EPSILON;
}
function trusty(left,right,result){
    if(Number.isSafeInteger(left)&&
    Number.isSafeInteger(right)&&
    Number.isSafeInteger(result)){
        return result;
    }
    throw new RangeError("Operation cannot be trusted!")
}
//设置任意的标签中间的任意文本内容
export function setInnerText(element,text) {
    //判断浏览器是否支持这个属性
    if(typeof element.textContent =="undefined"){//不支持
        element.innerText=text;
    }else{//支持这个属性
        element.textContent=text;
    }
}

//获取任意标签中间的文本内容
export function getInnerText(element) {
    if(typeof element.textContent=="undefined"){
        return element.innerText;
    }else{
        return element.textContent;
    }
}

//设置标签中的文本内容,应该使用textContent属性,谷歌,火狐支持,IE8不支持
//设置标签中的文本内容,应该使用innerText属性,谷歌,火狐,IE8都支持

//如果这个属性在浏览器中不支持,那么这个属性的类型是undefined
//判断这个属性的类型 是不是undefined,就知道浏览器是否支持

//兼容代码
//总结:如果使用innerText主要是设置文本的,设置标签内容,是没有标签的效果的
//总结:innerHTML是可以设置文本内容
//总结:innerHTML主要的作用是在标签中设置新的html标签内容,是有标签效果的

//总结:想要设置标签内容,使用innerHTML,想要设置文本内容,innerText或者textContent,或者innerHTML,推荐用innerHTML


//获取的时候:
//innerText可以获取标签中间的文本内容,但是标签中如果还有标签,那么最里面的标签的文本内容也能获取.---获取不到标签的,文本可以获取
//innerHTML才是真正的获取标签中间的所有内容

/*
   *
   * 根据id属性的值获取元素,返回来的是一个元素对象
   * document.getElementById("id属性的值");
   *
   * 根据标签名字获取元素,返回来的是一个伪数组,里面保存了多个的DOM对象
   * document.getElementsByTagName("标签名字");
   *
   * 下面的几个,有的浏览器不支持
   *
   * 根据name属性的值获取元素,返回来的是一个伪数组,里面保存了多个的DOM对象
   * document.getElementsByName("name属性的值")
   * 根据类样式的名字来获取元素,返回来的是一个伪数组,里面保存了多个的DOM对象
   * document.getElementsByClassName("类样式的名字")
   * 根据选择器获取元素,返回来的是一个元素对象
   * document.querySelector("选择器的名字");
   *
   * 根据选择器获取元素,返回来的是一个伪数组,里面保存了多个的DOM对象
   * document.querySelectorAll("选择器的名字")
   *
   *
   * */

// my$("btn").onclick=function () {
    //my$("dv").innerText="哈哈";//设置文本
    //my$("dv").innerText="<p>这是一个p</p>";//设置html标签的代码

    //my$("dv").innerHTML="哈哈";
    //my$("dv").innerHTML="<p>这是一个p</p>";//设置Html标签的
// };

//html标签中有没有什么自带的属性可以存储成绩的----没有
//本身html标签没有这个属性,自己(程序员)添加的,----自定义属性---为了存储一些数据

//在html标签中添加的自定义属性,如果想要获取这个属性的值,需要使用getAttribute("自定义属性的名字")才能获取这个属性的值

//获取所有的li标签
// var list=document.getElementsByTagName("li");
// for(var i=0;i<list.length;i++){
//     list[i].onclick=function () {
//         //alert(this.score);//不能
//         //可以
//         alert(this.getAttribute("score"));
//     };
// }

//总结:设置自定义属性:setAttribute("属性的名字","属性的值");
//获取自定义属性的值:getAttribute("属性的名字")

//获取所有的li标签,然后为每个标签中动态的添加自定义属性和值
//点击的时候获取该标签的自定义属性的值

//根据id获取ul标签,并且或者该标签中所有的li
// var list=my$("uu").getElementsByTagName("li");
//循环遍历
// for(var i=0;i<list.length;i++){
//     //先为每个li添加自定义属性
//     //list[i].score=(i+1)*10;//此方式,自定义属性在DOM对象上,不在标签中
//     list[i].setAttribute("score",(i+1)*10);
//     //点击每个li标签,显示对应的自定义属性值
//     list[i].onclick=function(){
//         alert(this.getAttribute("score"));
//     };
// }

//移除自定义属性:removeAttribute("属性的名字")

//点击按钮移除元素的自定义属性
// my$("btn").onclick=function () {
//     //my$("dv").removeAttribute("score");
//     //移除元素的类样式
//     //值没有了,但是属性还是有的
//     //my$("dv").className="";
//     //也可以移除元素的自带的属性
//     my$("dv").removeAttribute("class");
// };


//  var dvObj=document.getElementById("dv");
//  //获取里面的每个子节点
//  for(var i=0;i<dvObj.childNodes.length;i++){
//    var node=dvObj.childNodes[i];
//    //nodeType--->节点的类型:1---标签,2---属性,3---文本
//    //nodeName--->节点的名字:大写的标签--标签,小写的属性名---属性,#text---文本
//    //nodeValue-->节点的值:标签---null,属性--属性的值,文本--文本内容
//    console.log(node.nodeType+"====="+node.nodeName+"===="+node.nodeValue);
//  }

//div
//  var dvObj=document.getElementById("dv");
//  //获取的是属性的节点
//  var node=dvObj.getAttributeNode("id");
//  console.log(node.nodeType+"----"+node.nodeName+"===="+node.nodeValue);


//element.firstChild--->谷歌和火狐获取的是第一个子几点
//element.firstChile--->IE8获取的是第一个子元素
//element.firstElementChild------>谷歌和火狐是第一个子元素,IE8不支持
//获取任意一个父级元素的第一个子级元素
export function getFirstElementChild(element) {
    if(element.firstElementChild){//true--->支持
        return element.firstElementChild;
    }else{
        var node=element.firstChild;//第一个节点
        while (node&&node.nodeType!=1){
            node=node.nextSibling;
        }
        return node;
    }
}
//获取任意一个父级元素的最后一个子级元素
export function getLastElementChild(element) {
    if(element.lastElementChild){//true--->支持
        return element.lastElementChild;
    }else{
        var node=element.lastChild;//第一个节点
        while (node&&node.nodeType!=1){
            node=node.previousSibling;
        }
        return node;
    }
}

/*
   *
   * 元素创建-----为了提高用户的体验
   * 元素创建的三种方式:
   * 1. document.write("标签的代码及内容");
   * 2. 对象.innerHTML="标签及代码";
   * 3. document.createElement("标签的名字");
   *
   *
   *
   *
   *
   * */


// //为任意元素.绑定任意的事件, 任意的元素,事件的类型,事件处理函数
// function addEventListener(element,type,fn) {
//     //判断浏览器是否支持这个方法
//     if(element.addEventListener){
//         element.addEventListener(type,fn,false);
//     }else if(element.attachEvent){
//         element.attachEvent("on"+type,fn);
//     }else{
//         element["on"+type]=fn;
//     }
// }
//
// //解绑事件的兼容
// //为任意的一个元素,解绑对应的事件
// function removeEventListener(element,type,fnName) {
//     if(element.removeEventListener){
//         element.removeEventListener(type,fnName,false);
//     }else if(element.detachEvent){
//         element.detachEvent("on"+type,fnName);
//     }else{
//         element["on"+type]=null;
//     }
// }

/**
 * 格式化日期
 * @param dt 日期对象
 * @returns {string} 返回值是格式化的字符串日期
 */
function getDates(dt) {
    var str = "";//存储时间的字符串
    //获取年
    var year = dt.getFullYear();
    //获取月
    var month = dt.getMonth() + 1;
    //获取日
    var day = dt.getDate();
    //获取小时
    var hour = dt.getHours();
    //获取分钟
    var min = dt.getMinutes();
    //获取秒
    var sec = dt.getSeconds();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    str = year + "年" + month + "月" + day + "日 " + hour + ":" + min + ":" + sec;
    return str;
}

//在style标签中设置的样式属性获取不到
//style属性中设置的样式属性是可以获取到的
//获取元素的样式,下面的方式废了
//console.log(my$("dv1").style.width);
//console.log(my$("dv1").style.height);

//以后获取元素的宽和高,应该使用offset系列来获取
/*
*
* offsetWidth :获取元素的宽
* offsetHeight :获取元素的高
* offsetLeft :获取元素距离左边位置的值
* offsetTop :获取元素距离上面位置的值
*
* */

//获取兄弟元素
export function getsiblings(ele) {
    if(!ele)return;//判断当前的ele这个元素是否存在
    var elements=[];//定义数组的目的就是存储当前这个元素的所有的兄弟元素
    var el=ele.previousSibling;//当前元素的前一个节点
    while (el){
        if (el.nodeType===1){//元素
            elements.push(el);//加到数组中
        }
        el=el.previousSibling;
    }
    el=ele.nextSibling;
    while(el){
        if(el.nodeType===1){
            elements.push(el);
        }
        el=el.nextSibling;
    }
    return elements;
}
//    //能力检测多个浏览器为同一个对象注册多个事件
export var EventTools= {
    //为对象添加注册事件
    addEventListener: function (element, eventName, listener) {
        if (element.addEventListener) {
            element.addEventListener(eventName, listener, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + eventName, listener)
        } else {
            element["on" + eventName] = listener;
        }
    },
    //为对象移除事件
    removeEventListener: function (element, eventName, listener) {
        if (element.removeEventListener) {
            element.removeEventListener(eventName, listener, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + eventName, listener);
        } else {
            element["on" + eventName] = null;
        }
    },
    //获取参数e
    getEvent: function (e) {
        return e || window.event;
    },
    getPageX: function (e) {
        if (e.pageX) {
            return e.pageX;
        } else {
            //有的浏览器把高度设计在了文档的第一个元素中了
            //有的浏览器把高度设计在了body中了
            //document.documentElement.scrollTop;//文档的第一个元素
            //document.body.scrollTop;
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            return e.clientX + scrollLeft;
        }
    },
    getPageY: function (e) {
        if (e.pageY) {
            return e.pageY;
        } else {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            return e.clientY + scrollTop;
        }
    }
};
/**
 * 返回当前浏览器是什么类型的浏览器
 */
export function userBrowser() {
    var browserName = navigator.userAgent.toLowerCase();
    if (/msie/i.test(browserName) && !/opera/.test(browserName)) {
        console.log("IE");
    } else if (/firefox/i.test(browserName)) {
        console.log("Firefox");
    } else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) {
        console.log("Chrome");
    } else if (/opera/i.test(browserName)) {
        console.log("Opera");
    } else if (/webkit/i.test(browserName) && !(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))) {
        console.log("Safari");
    } else {
        console.log("不知道什么鬼!");
    }
}

// 获取任意一个元素的任意一个样式属性的值
//  export function getStyle(element,attr) {
//    //判断浏览器是否支持这个方法
//    if(window.getComputedStyle){
//      return window.getComputedStyle(element,null)[attr];
//    }else{
//      return element.currentStyle[attr];
//    }
//  }

//获取任意的一个属性的当前的属性值: left--->此时的left属性的值,width---当前的元素的宽
export function getStyle(element,attr) {
    //判断浏览器是否支持这个方法
    return window.getComputedStyle? window.getComputedStyle(element,null)[attr]:element.currentStyle[attr];
}

// //element---元素
// //attr---属性名字
// //target---目标位置
// export function animate(element,attr ,target) {
//     //清理定时器
//     clearInterval(element.timeId);
//     element.timeId = setInterval(function () {
//         //获取元素的当前位置
//         var current = parseInt(getStyle(element,attr));//数字类型//===============================
//         //移动的步数
//         var step = (target-current)/10;
//         step = step>0?Math.ceil(step):Math.floor(step);
//         current += step;
//         element.style[attr] = current + "px";//============================================
//         if(current==target) {
//             //清理定时器
//             clearInterval(element.timeId);
//         }
//         //测试代码:
//         console.log("目标位置:"+target+",当前位置:"+current+",每次移动步数:"+step);
//     }, 20);
// }


export function animate(element, json, fn) {
    clearInterval(element.timeId);//清理定时器
    //定时器,返回的是定时器的id
    element.timeId = setInterval(function () {
        var flag = true;//默认,假设,全部到达目标
        //遍历json对象中的每个属性还有属性对应的目标值
        for (var attr in json) {
            //判断这个属性attr中是不是opacity
            if (attr == "opacity") {
                //获取元素的当前的透明度,当前的透明度放大100倍
                var current = getStyle(element, attr) * 100;
                //目标的透明度放大100倍
                var target = json[attr] * 100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;//移动后的值
                element.style[attr] = current / 100;
            } else if (attr == "zIndex") { //判断这个属性attr中是不是zIndex
                //层级改变就是直接改变这个属性的值
                element.style[attr] = json[attr];
            } else {
                //普通的属性
                //获取元素这个属性的当前的值
                var current = parseInt(getStyle(element, attr));
                //当前的属性对应的目标值
                var target = json[attr];
                //移动的步数
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;//移动后的值
                element.style[attr] = current + "px";
            }
            //是否到达目标
            if (Math.abs(current- target)>1) {
                flag = false;
            }
        }
        if (flag) {
            //清理定时器
            clearInterval(element.timeId);
            //所有的属性到达目标才能使用这个函数,前提是用户传入了这个函数
            if (fn) {
                fn();
            }
        }
        //测试代码
        console.log("目标:" + target + ",当前:" + current + ",每次的移动步数:" + step);
    }, 20);
}

//获取页面向上或者向左卷曲出去的距离的值
export function getScroll() {
    return {
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft||0,
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    };
}