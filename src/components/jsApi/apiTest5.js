import React from "react";
import  img456 from "./img/456.png"
import './apitest5.css';
import {my$} from "../common/commonUtil";
class apiTest5 extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hidden:true,
        };
    }
    componentDidMount() {
        // document.addEventListener('mouseover', this.handleClickOutside);
        //获取鼠标要进入的a标签

        //先获取最外面的div
        var aObj=my$("node_small").getElementsByTagName("a")[0];
        console.log(aObj);
        //为a注册鼠标进入
        aObj.onmouseover=function () {
            console.log("我的进入");
            my$("er").className="erweima show";
        };
        //为a注册鼠标离开
        aObj.onmouseout=function () {
            my$("er").className="erweima hide";
        };
    }

    componentWillUnmount() {
        // document.removeEventListener('mouseover', this.handleClickOutside);
    }
    // componentDidMount() {
    //     //鼠标进入和鼠标离开两个事件
    //     //获取所有的li标签
    //     var list = document.getElementsByTagName("li");
    //     for (var i = 0; i < list.length; i++) {
    //         //为li注册鼠标进入事件
    //         list[i].onmouseover = function () {
    //             this.style.backgroundColor = "yellow";
    //         };
    //         //为li注册鼠标离开事件
    //         list[i].onmouseout = function () {
    //             //恢复到这个标签默认的颜色
    //             this.style.backgroundColor = "";
    //         };
    //
    //     }
    // }
    handleClickIt=(param)=>{
        console.log(param)
    };
    handleClickOutside = (e) => {
        if (this.erweima && this.erweima.contains(e.target)) {
                this.setState({hidden: false})
        }else{
            this.setState({hidden: true})
        }
    }
    render=()=>{
        return(
            <span >
                <div className="nodeSmall" ref={ref=>this.erweima=ref} id="node_small">
                  <a href="#"></a>
                            <div className="erweima hide" id="er">
                    <img src={img456} alt="" />
                  </div>
                </div>
            </span>
        )
    }
}
export default apiTest5;