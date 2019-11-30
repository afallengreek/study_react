import React from "react";
import './apiTest2.css';
import  small1 from "./img/1.jpg"
import  small2 from "./img/2.jpg"
import  small3 from "./img/3.jpg"
import  small4 from "./img/4.jpg"
import  placeholder from "./img/placeholder.png"
import {my$} from "../common/commonUtil";
class apiTest2 extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            clickedFlag:false,
        };
        this.clickedFlag=false;
    }
    // my$("ak").onclick=function () {
    //     my$("big").src=this.href;
    //     return false;
    // };
    handleClick=()=>{
        this.setState({
            clickedFlag:true,
        })
        this.clickedFlag=true;
        console.log("我的数据234")
        // this.img.src=img1;
    };
    componentDidMount() {
        // 点击a标签,把a标签中的href的属性值给id为image的src属性
        // 把a的title属性的值给id为des的p标签赋值

        //从ul中标签获取获取所有的a标签
        let aObjs=my$("imagegallery").getElementsByTagName("a");
        //循环遍历所有的a标签
        for(let i=0;i<aObjs.length;i++) {
            //为每个a标签注册点击事件
            aObjs[i].onclick = function () {
                //为id为image的标签的src赋值
                my$("image").src = this.href;
                //为p标签赋值
                my$("des").innerText = this.title;
                //阻止超链接默认的跳转
                return false;
            };
        }
    }
    handleClickIt=(param)=>{
        console.log(param)
    };
    render=()=>{
        return(
            <span className="apiTest2">
              <div className="test2Body">
              <h2 className="test2h2">美女画廊</h2>

                <ul id="imagegallery">
                  <li><a href={small1} name="wangqie125" title="美女A" onClick={()=>this.handleClickIt("王企鹅大人")}>
                    <img src={small1} width={100} alt="美女1"/>
                  </a></li>
                  <li><a href={small2} title="美女B">
                    <img src={small2} width={100} alt="美女2"/>
                  </a></li>
                  <li><a href={small3} title="美女C">
                    <img src={small3}  width={100} alt="美女3"/>
                  </a></li>
                  <li><a href={small4} title="美女D">
                    <img src={small4} width={100}  alt="美女4"/>
                  </a></li>
                </ul>


                <div className="test2Clear"></div>
                         <img id="image" src={placeholder} width={400} alt="" />
                <p id="des">选择一个图片</p>
              </div>
            </span>
        )
    }
}
export default apiTest2;