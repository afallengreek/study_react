import React from "react";
import './whirligig.css';
import  slidepic1 from "./images/slidepic1.jpg"
import  slidepic2 from "./images/slidepic2.jpg"
import  slidepic3 from "./images/slidepic3.jpg"
import  slidepic4 from "./images/slidepic4.jpg"
import  slidepic5 from "./images/slidepic5.jpg"
import {animate, my$} from "../common/commonUtil";
class whirligig extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hidden:true,
        };
    }
    componentDidMount() {
        let config = [
            {
                width: 400,
                top: 20,
                left: 50,
                opacity: 0.2,
                zIndex: 2
            },//0
            {
                width: 600,
                top: 70,
                left: 0,
                opacity: 0.8,
                zIndex: 3
            },//1
            {
                width: 800,
                top: 100,
                left: 200,
                opacity: 1,
                zIndex: 4
            },//2
            {
                width: 600,
                top: 70,
                left: 600,
                opacity: 0.8,
                zIndex: 3
            },//3
            {
                width: 400,
                top: 20,
                left: 750,
                opacity: 0.2,
                zIndex: 2
            }//4
        ];

        var flag=true;//假设所有的动画执行完毕了---锁====================================================
        var list = my$("slide").getElementsByTagName("li");
        //1---图片散开
        function assign() {
            for (var i = 0; i < list.length; i++) {
                //设置每个li,都要把宽,层级,透明度,left,top到达指定的目标位置
                animate(list[i], config[i],function () {
                    flag=true;//===============================================
                });
            }
        }
        assign();
        //右边按钮
        my$("arrRight").onclick = function () {
            if(flag){//==========================================================
                flag=false;
                config.push(config.shift());
                assign();//重新分配
            }

        };
        // 左边按钮
        my$("arrLeft").onclick = function () {
            if(flag){//==================================================
                flag=false;
                config.unshift(config.pop());
                assign();
            }

        };
        //鼠标进入,左右焦点的div显示
        my$("slide").onmouseover = function () {
            animate(my$("arrow"), {"opacity": 1});
        };
        //鼠标离开,左右焦点的div隐藏
        my$("slide").onmouseout = function () {
            animate(my$("arrow"), {"opacity": 0});
        };

    }

    componentWillUnmount() {

    }
    render=()=>{
        return(
            <span className="whirlingig">
            <div className="wrap" id="wrap">
              <div className="slide" id="slide">
                <ul>
                  <li><a href="#"><img src={slidepic1} alt=""/></a></li>
                  <li><a href="#"><img src={slidepic2} alt=""/></a></li>
                  <li><a href="#"><img src={slidepic3} alt=""/></a></li>
                  <li><a href="#"><img src={slidepic4} alt=""/></a></li>
                  <li><a href="#"><img src={slidepic5} alt=""/></a></li>
                </ul>
                <div className="arrow" id="arrow">
                  <a href="javascript:;" className="prev" id="arrLeft"> </a>
                  <a href="javascript:;" className="next" id="arrRight"> </a>
                </div>
              </div>
            </div>

            </span>
        )
    }
}
export default whirligig;