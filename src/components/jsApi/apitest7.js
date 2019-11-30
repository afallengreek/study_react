import React from "react";
import './apitest7.css';
import {my$} from "../common/commonUtil";
class apiTest7 extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hidden:true,
        };
    }
    componentDidMount() {
        //获取最外面的div
        var box=my$("box");
        //获取的是里面的第一个div
        var hd=box.getElementsByTagName("div")[0];
        //获取的是里面的第二个div
        var bd=box.getElementsByTagName("div")[1];
        //获取所有的li标签
        var list=bd.getElementsByTagName("li");//=================================
        //获取所有的span标签
        var spans=hd.getElementsByTagName("span");
        //循环遍历的方式,添加点击事件
        for(var i=0;i<spans.length;i++){
            //在点击之前就把索引保存在span标签中
            spans[i].setAttribute("index",i);//================================
            spans[i].onclick=function () {
                //第一件事,所有的span的类样式全部移除
                for(var j=0;j<spans.length;j++){
                    spans[j].removeAttribute("class");
                }

                //第二件事,当前被点击的span应用类样式
                this.className="current";
                //span被点击的时候获取存储的索引值
                //alert(this.getAttribute("index"));
                var num=this.getAttribute("index");//==============================

                //获取所有的li标签,每个li标签先全部隐藏
                for(var k=0;k<list.length;k++){
                    list[k].removeAttribute("class");
                }
                //当前被点击的span对应的li标签显示
                list[num].className="current";
            };
        }
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
            <span className="apiTest7">
             <div className="box" id="box">
                  <div className="hd">
                    <span className="current">体育</span>
                    <span>娱乐</span>
                    <span>新闻</span>
                    <span>综合</span>
                  </div>
                  <div className="bd">
                    <ul>
                      <li className="current">我是体育模块</li>
                      <li>我是娱乐模块</li>
                      <li>我是新闻模块</li>
                      <li>我是综合模块</li>
                    </ul>
                  </div>
                </div>
            </span>
        )
    }
}
export default apiTest7;