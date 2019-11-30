import React from "react";
import './RotationChart1.css';
import  img1 from "./images/1.jpg"
import  img2 from "./images/2.jpg"
import  img3 from "./images/3.jpg"
import  img4 from "./images/4.jpg"
import  img5 from "./images/5.jpg"
import  img6 from "./images/6.jpg"
import {my$} from "../common/commonUtil";
class RotationChart1 extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hidden:true,
        };
    }
    componentDidMount() {
        //获取最外面的div
        var box=my$("box");
        //获取相框
        var inner=box.children[0];
        //获取相框的宽度
        var imgWidth=inner.offsetWidth;
        //获取ul
        var ulObj=inner.children[0];
        //获取所有的span标签
        var spanObjs=inner.children[1].children;
        //循环遍历所有的span标签,注册鼠标进入的事件
        for(var i=0;i<spanObjs.length;i++){
            //循环的时候把索引值保存在每个span的自定义属性中
            spanObjs[i].setAttribute("index",i);
            //注册鼠标进入事件
            spanObjs[i].onmouseover=function () {
                //先干掉所有的span的背景颜色
                for(var j=0;j<spanObjs.length;j++){
                    //移除了每个span的类样式
                    spanObjs[j].removeAttribute("class");
                }
                //设置当前的span的背景颜色
                this.className="current";
                //移动ul(每个图片的宽*鼠标放在这个按钮的索引值)
                //获取当前鼠标进入的span的索引
                var index=this.getAttribute("index");
                animate(ulObj,-index*imgWidth);
            };
        }
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
            // 相框
            <span className="Chart1">
            <div className="box" id="box">
                <div className="inner">
                    <ul>
                        <li><a href="#"><img src={img1} alt=""/></a></li>
                        <li><a href="#"><img src={img2} alt=""/></a></li>
                        <li><a href="#"><img src={img3} alt=""/></a></li>
                        <li><a href="#"><img src={img4} alt=""/></a></li>
                        <li><a href="#"><img src={img5} alt=""/></a></li>
                        <li><a href="#"><img src={img6} alt=""/></a></li>
                    </ul>
                    <div className="square">
                        <span className="current">1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                    </div>
                </div>
            </div>
            </span>
        )
    }
}
export default RotationChart1;