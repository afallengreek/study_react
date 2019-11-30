import React from "react";
import {my$} from "../common/commonUtil";
class apiTest4 extends React.Component{
    constructor(props) {
        super(props);
        this.state={

        };

    }
    // my$("ak").onclick=function () {
    //     my$("big").src=this.href;
    //     return false;
    // };
    componentDidMount() {


        //鼠标进入和鼠标离开两个事件
        //获取所有的li标签
        var list = document.getElementsByTagName("li");
        for (var i = 0; i < list.length; i++) {
            //为li注册鼠标进入事件
            list[i].onmouseover = function () {
                this.style.backgroundColor = "yellow";
            };
            //为li注册鼠标离开事件
            list[i].onmouseout = function () {
                //恢复到这个标签默认的颜色
                this.style.backgroundColor = "";
            };

        }
    }
    handleClickIt=(param)=>{
        console.log(param)
    };
    render=()=>{
        return(
            <span >
         <ul>
              <li>金士百</li>
              <li>雪花</li>
              <li>百威</li>
              <li>燕京</li>
              <li>青岛</li>
              <li>崂山</li>
              <li>珠江</li>
              <li>华丹</li>
            </ul>
            </span>
        )
    }
}
export default apiTest4;