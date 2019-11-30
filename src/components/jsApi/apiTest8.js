import React from "react";
import './apiTest8.css';
import  img1 from "./img/1.jpg"
import  img2 from "./img/2.jpg"
import  img3 from "./img/3.jpg"
import {my$} from "../common/commonUtil";
class apiTest8 extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hidden:true,
        };
    }
    componentDidMount() {
        document.body.className="bodyCss";
        var imgObjs=my$("mask").children;//获取的所有的子元素
        //循环遍历所有img,注册点击事件
        for(var i=0;i<imgObjs.length;i++){
            imgObjs[i].onclick=function () {
                document.body.style.backgroundImage="url("+this.src+")";
            };
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mouseover', this.handleClickOutside);
    }
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
             <div id="mask">
              <img src={img1} alt=""/>
              <img src={img2} alt=""/>
              <img src={img3} alt=""/>
            </div>
        )
    }
}
export default apiTest8;