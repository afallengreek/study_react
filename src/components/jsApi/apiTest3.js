import React from "react";
import {my$} from "../common/commonUtil";
class apiTest3 extends React.Component{
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
         //奇红偶黄
        //点击按钮
        //  my$("btn").onclick=function () {
        //      //获取所有的li标签
        //    var list=my$("uu").getElementsByTagName("li");
        //    for(var i=0;i<list.length;i++){
        //      if(i%2==0){
        //        //偶数
        //        list[i].style.backgroundColor="red";
        //      }else{
        //        //奇数
        //        list[i].style.backgroundColor="yellow";
        //      }
        //    }
        //  };


        my$("btn").onclick = function () {
            //获取所有的li标签
            var list = my$("uu").getElementsByTagName("li");
            for (var i = 0; i < list.length; i++) {
                list[i].style.backgroundColor = i % 2 == 0 ? "red" : "yellow";
            }
        };
    }
    handleClickIt=(param)=>{
        console.log(param)
    };
    render=()=>{
        return(
            <span >
           <input type="button" value="隔行变色" id="btn"/>
            <ul id="uu">
              <li>红旗</li>
              <li>五菱宏光</li>
              <li>奔驰</li>
              <li>兰博基尼</li>
              <li>哈弗</li>
              <li>奥拓</li>
              <li>奥迪</li>
              <li>悍马</li>
            </ul>
            </span>
        )
    }
}
export default apiTest3;