import React from "react";
import './apitest5.css';
import {my$} from "../common/commonUtil";
class apiTest6 extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hidden:true,
        };
    }
    /*
    *
    * 根据id属性的值获取元素,返回来的是一个元素对象
    * document.getElementById("id属性的值");
    *
    * 根据标签名字获取元素,返回来的是一个伪数组,里面保存了多个的DOM对象
    * document.getElementsByTagName("标签名字");
    *
    * 下面的几个,有的浏览器不支持
    *
    * 根据name属性的值获取元素,返回来的是一个伪数组,里面保存了多个的DOM对象
    * document.getElementsByName("name属性的值")
    * 根据类样式的名字来获取元素,返回来的是一个伪数组,里面保存了多个的DOM对象
    * document.getElementsByClassName("类样式的名字")
    * 根据选择器获取元素,返回来的是一个元素对象
    * document.querySelector("选择器的名字");
    *
    * 根据选择器获取元素,返回来的是一个伪数组,里面保存了多个的DOM对象
    * document.querySelectorAll("选择器的名字")
    *
    *
    * */
    componentDidMount() {

        // my$("btn").onclick=function () {
        //     //通过name属性值获取元素-------表单的标签
        //     var inputs=document.getElementsByName("name1");
        //     for(var i=0;i<inputs.length;i++){
        //         inputs[i].value="我很好";
        //     }
        // };
        //点击按钮弹出对话框
        //根据选择器的方式获取元素

        // // var btnObj= document.querySelector("#btn");
        // //  btnObj.onclick=function () {
        // //      alert("哈哈,我又变帅了");
        // //  };
        // var objs=document.querySelectorAll(".cls");
        // for(var i=0;i<objs.length;i++){
        //     objs[i].style.backgroundColor="green";
        // }



        //点击按钮,改变所有name属性值为name1的文本框中的value属性值

        my$("btn").onclick=function () {
            //通过name属性值获取元素-------表单的标签
            var inputs=document.getElementsByName("name1");
            for(var i=0;i<inputs.length;i++){
                inputs[i].value="我很好";
            }
        };
    }

    componentWillUnmount() {
        // document.removeEventListener('mouseover', this.handleClickOutside);
    }
    render=()=>{
        return(
            <span >
               <input type="button" value="显示效果" id="btn"/><br/>
                <input type="text" value="您好" name="name1"/><br/>
                <input type="text" value="您好" name="name2"/><br/>
                <input type="text" value="您好" name="name1"/><br/>
                <input type="text" value="您好" name="name3"/><br/>
                <input type="text" value="您好" name="name1"/><br/>
                <input type="text" value="您好" name="name1"/><br/>
            </span>
        )
    }
}
export default apiTest6;