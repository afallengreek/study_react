import React from "react";
import './ShutdownAnimation.css';
import  imgT from "./images/t.jpg"
import  imgB from "./images/b.jpg"
import {animate, my$} from "../common/commonUtil";
class ShutdownAnimation extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hidden:true,
        };
    }
    componentDidMount() {
        my$("closeButton").onclick=function () {
            console.log("打印我的历史")
            //设置最下面的div的高渐渐的变成0
            animate(my$("bottomPart"),{"height":0},function () {
                animate(my$("box"),{"width":0});
            });
        };
    }

    componentWillUnmount() {

    }
    render=()=>{
        return(
            <span className="shutdownAnimation">
            <div className="box" id="box">
              <span id="closeButton"></span>
              <div className="hd" id="headPart">
                <img src={imgT} alt=""/>
              </div>
              <div className="bd" id="bottomPart">
                <img src={imgB} alt=""/>
              </div>
            </div>
            </span>
        )
    }
}
export default ShutdownAnimation;