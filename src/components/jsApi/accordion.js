import React from "react";
import './accordion.css';
import  img1 from "./image/1.jpg"
import  img2 from "./image/2.jpg"
import  img3 from "./image/3.jpg"
import  img4 from "./image/4.jpg"
import  img5 from "./image/5.jpg"
import {my$} from "../common/commonUtil";
class accordion extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hidden:true,
        };
    }
    componentDidMount() {
        //获取任意一个元素的任意一个属性的当前的值---当前属性的位置值
        function getStyle(element, attr) {
            return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr] || 0;
        }
        function animate(element, json, fn) {
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
                    if (current != target) {
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

        //先获取所有的li标签
        var list = my$("box").getElementsByTagName("li");
        for (var i = 0; i < list.length; i++) {
            if(i===0) {
                list[i].style.backgroundImage = "url(http://localhost:3001" + img1 + ")";
            }else if(i===1){
                list[i].style.backgroundImage = "url(http://localhost:3001" + img2 + ")";
            }else if(i===2){
                list[i].style.backgroundImage = "url(http://localhost:3001" + img3 + ")";
            }else if(i===3){
                list[i].style.backgroundImage = "url(http://localhost:3001" + img4 + ")";
            }else if(i===4){
                list[i].style.backgroundImage = "url(http://localhost:3001" + img5 + ")";
            }

            //鼠标进入
            list[i].onmouseover = mouseoverHandle;
            //鼠标离开
            list[i].onmouseout = mouseoutHandle;
        }
        //进入
        function mouseoverHandle() {
            for (var j = 0; j < list.length; j++) {
                animate(list[j], {"width": 100});//动画效果
            }
            animate(this, {"width": 800});
        }
        //离开
        function mouseoutHandle() {
            for (var j = 0; j < list.length; j++) {
                animate(list[j], {"width": 240});//动画效果
            }
        }

    }


    render=()=>{
        return(
            <div className="accordion">
            <div id="box">
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            </div>
        )
    }
}
export default accordion;