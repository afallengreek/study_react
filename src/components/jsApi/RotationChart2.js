import React from "react";
import './RotationChart2.css';
import  img1 from "./images/1.jpg"
import  img2 from "./images/2.jpg"
import  img3 from "./images/3.jpg"
import  img4 from "./images/4.jpg"
import  img5 from "./images/5.jpg"
import  img6 from "./images/6.jpg"
import {my$} from "../common/commonUtil";
class RotationChart2 extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hidden:true,
        };
    }
    componentDidMount() {

        //获取最外面的div
        var box = my$("box");
        //获取相框
        var ad = box.children[0];
        //获取相框的宽度
        var imgWidth = ad.offsetWidth;
        //获取ul
        var ulObj = ad.children[0];
        //获取左右焦点的div
        var focusD = my$("focusD");

        //显示和隐藏左右焦点的div----为box注册事件
        box.onmouseover = function () {
            focusD.style.display = "block";
        };
        box.onmouseout = function () {
            focusD.style.display = "none";
        };


        //点击右边按钮
        var index=0;
        my$("right").onclick = function () {
            if(index<ulObj.children.length-1){
                index++;
                animate(ulObj,-index*imgWidth);
            }

        };
        //点击左边按钮
        my$("left").onclick = function () {
            if(index>0){
                index--;
                animate(ulObj,-index*imgWidth);
            }
        };


        //设置任意的一个元素,移动到指定的目标位置
        function animate(element, target) {
            clearInterval(element.timeId);
            //定时器的id值存储到对象的一个属性中
            element.timeId = setInterval(function () {
                //获取元素的当前的位置,数字类型
                var current = element.offsetLeft;
                //每次移动的距离
                var step = 10;
                step = current < target ? step : -step;
                //当前移动到位置
                current += step;
                if (Math.abs(current - target) > Math.abs(step)) {
                    element.style.left = current + "px";
                } else {
                    //清理定时器
                    clearInterval(element.timeId);
                    //直接到达目标
                    element.style.left = target + "px";
                }
            }, 20);
        }
    }

    componentWillUnmount() {

    }
    render=()=>{
        return(
            <span className="Chart2">
            <div id="box" className="all">
                <div className="ad">
                    <ul id="imgs">
                        <li><img src={img1}/></li>
                        <li><img src={img2}/></li>
                        <li><img src={img3}/></li>
                        <li><img src={img4}/></li>
                        <li><img src={img5}/></li>
                    </ul>
                </div>
                <div id="focusD"><span id="left">&lt;</span><span id="right">&gt;</span>
                </div>
            </div>
            </span>
        )
    }
}
export default RotationChart2;