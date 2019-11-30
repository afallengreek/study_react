import React from "react";
import './apiTest9.css';
import {my$} from "../common/commonUtil";
class moreEvent extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hidden:true,
        };
    }
    componentDidMount() {
        //为同一个元素绑定多个不同的事件,指向相同的事件处理函数
        my$("btn").onclick = f1;
        my$("btn").onmouseover = f1;
        my$("btn").onmouseout = f1;
        function f1(e) {
            switch (e.type) {
                case "click":
                    alert("好帅哦");
                    break;
                case "mouseover":
                    this.style.backgroundColor = "red";
                    break;
                case "mouseout":
                    this.style.backgroundColor = "green";
                    break;
            }
        }
        //  my$("btn").onmouseover=function (e) {
        //    console.log(e);
        //  };

    }

    componentWillUnmount() {

    }
    handleOnClick=()=>{
        this.select1.checked=!this.select1.checked;
    }
    render=()=>{
        return(
            <input type="button" value="小苏" id="btn"/>
        )
    }
}
export default moreEvent;