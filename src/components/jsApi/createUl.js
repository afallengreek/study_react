import React from "react";
import {my$} from "../common/commonUtil";
class createUl extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hidden:true,
        };
    }
    componentDidMount() {
        //  my$("btn").onclick=function () {
        //    my$("dv").innerHTML="<ul><li>杨过</li><li>小龙女</li><li>张无忌</li>  <li>张三丰</li></ul>";
        //  };


        // var names = ["杨过", "郭靖", "张无忌", "张三丰", "乔峰", "段飞", "丁棚"];
        // my$("btn").onclick = function () {
        //     var str = "<ul style='list-style-type: none;cursor: pointer'>";
        //     //根据循环创建对应对数的li
        //     for (var i = 0; i < names.length; i++) {
        //         str += "<li>" + names[i] + "</li>";
        //     }
        //     str += "</ul>";
        //     my$("dv").innerHTML = str;
        //
        //     //代码执行到这里,li已经有了
        //     //获取所有的li,遍历,添加鼠标进入事件,鼠标离开事件
        //     var list = my$("dv").getElementsByTagName("li");
        //     for (var i = 0; i < list.length; i++) {
        //         //鼠标进入
        //         list[i].onmouseover = function () {
        //             this.style.backgroundColor = "yellow";
        //         };
        //         //鼠标离开
        //         list[i].onmouseout = function () {
        //             this.style.backgroundColor = "";
        //         };
        //
        //     }

                //第三种方式创建元素
                //创建元素
                //document.createElement("标签名字");对象
                //把元素追加到父级元素中
                //点击按钮,在div中创建一个p

            //     my$("btn").onclick = function () {
            //     //创建元素的
            //     var pObj = document.createElement("p");
            //     window.setInnerText(pObj, "这是一个p");
            //     //把创建后的子元素追加到父级元素中
            //     my$("dv").appendChild(pObj);
            // };
        var kungfu = ["降龙十八掌", "黯然销魂掌", "葵花宝典", "九阴真经", "吸星大法", "如来神掌", "化骨绵掌", "玉女心经", "极乐神功", "辟邪剑谱"];

        //点击按钮动态的创建列表,把列表加到div中
        my$("btn").onclick = function () {
            //创建ul,把ul立刻加入到父级元素div中
            var ulObj = document.createElement("ul");
            my$("dv").appendChild(ulObj);
            //动态的创建li,加到ul中
            for (var i = 0; i < kungfu.length; i++) {
                var liObj = document.createElement("li");
                //设置li中间的文字内容
                liObj.innerHTML = kungfu[i];
                ulObj.appendChild(liObj);
                //为li添加鼠标进入事件
                liObj.onmouseover = mouseoverHandle;
                //为li添加鼠标离开事件
                liObj.onmouseout = mouseoutHandle;
            }
        };

        //此位置.按钮的点击事件的外面
        function mouseoverHandle() {
            this.style.backgroundColor = "red";
        }
        function mouseoutHandle() {
            this.style.backgroundColor = "";
        }

        //如果是循环的方式添加事件,推荐用命名函数
        //如果不是循环的方式添加事件,推荐使用匿名函数

        // var i=0;
        // my$("btn").onclick=function () {
        //     i++;
        //     var obj= document.createElement("input");
        //     obj.type="button";
        //     obj.value="按钮"+i;
        //     //my$("dv").appendChild(obj);//追加子元素
        //     //把新的子元素插入到第一个子元素的前面
        //     my$("dv").insertBefore(obj,my$("dv").firstElementChild);
        //     //my$("dv").replaceChild();---自己玩
        // };
        //
        // my$("btn2").onclick=function () {
        //     //移除父级元素中第一个子级元素
        //     my$("dv").removeChild(my$("dv").firstElementChild);
        // };
        //
        // my$("btn3").onclick=function () {
        //     //点击按钮删除div中所有的子级元素
        //     //判断父级元素中有没有第一个子元素
        //     while(my$("dv").firstElementChild){
        //         my$("dv").removeChild(my$("dv").firstElementChild);
        //     }
        //
        // };
    }

    componentWillUnmount() {

    }
    handleOnClick=()=>{
        this.select1.checked=!this.select1.checked;
    }
    render=()=>{
        let value={title:["菜名","饭店"],}
        return(
            <span>
            <input type="button" value="创建列表" id="btn"/>
            <div id="dv"></div>
            </span>
        )
    }
}
export default createUl;