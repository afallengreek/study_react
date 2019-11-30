import React from "react";
import './fixedTop.css';
import  top from "./img/top.png"
import  nav from "./img/nav.png"
import  main from "./img/main.png"
import {my$} from "../common/commonUtil";
class fixedTop extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hidden:true,
        };
    }
    componentDidMount() {
        //获取页面向上或者向左卷曲出去的距离的值
        function getScroll() {
            return {
                left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft||0,
                top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
            };
        }
        //滚动事件
        window.onscroll=function () {
            //向上卷曲出去的距离和最上面的div的高度对比
            if(getScroll().top>=my$("topPart").offsetHeight){
                //设置第二个div的类样式
                my$("navBar").className="nav fixed";
                //设置第三个div的marginTop的值
                my$("mainPart").style.marginTop=my$("navBar").offsetHeight+"px";
            }else{
                my$("navBar").className="nav";
                my$("mainPart").style.marginTop="10px";
            }
        };


    }

    componentWillUnmount() {

    }
    render=()=>{
        return(
            <div className="fixedTop">
                <div className="top" id="topPart">
                    <img src={top} alt=""/>
                </div>
                <div className="nav" id="navBar">
                    <img src={nav} alt=""/>
                </div>
                <div className="main" id="mainPart">
                    <img src={main} alt=""/>
                </div>
            </div>
        )
    }
}
export default fixedTop;