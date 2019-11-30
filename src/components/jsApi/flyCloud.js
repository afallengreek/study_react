import React from "react";
import './flyCloud.css';
import {my$} from "../common/commonUtil";
class flyCloud extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hidden:true,
        };
    }
    componentDidMount() {
        document.body.className="bodyCssFlyCloud";
        //匀速动画
        function animate(element, target) {
            //清理定时器
            clearInterval(element.timeId);
            element.timeId = setInterval(function () {
                //获取元素的当前位置
                var current = element.offsetLeft;
                //移动的步数
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style.left = current + "px";
                if (current == target) {
                    //清理定时器
                    clearInterval(element.timeId);
                }
                //测试代码:
                console.log("目标位置:" + target + ",当前位置:" + current + ",每次移动步数:" + step);
            }, 20);
        }


        //获取云彩
        var cloud = my$("cloud");
        //获取所有的li标签
        var list = my$("navBar").children;
        //循环遍历分别注册鼠标进入,鼠标离开,点击事件
        for (var i = 0; i < list.length; i++) {
            //鼠标进入事件
            list[i].onmouseover = mouseoverHandle;
            //点击事件
            list[i].onclick = clickHandle;
            //鼠标离开事件
            list[i].onmouseout = mouseoutHandle;
        }
        function mouseoverHandle() {//进入
            //移动到鼠标此次进入的li的位置
            animate(cloud, this.offsetLeft);
        }
        //点击的时候,记录此次点击的位置
        var lastPosition = 0;
        function clickHandle() {//点击
            lastPosition = this.offsetLeft;
        }
        function mouseoutHandle() {//离开
            animate(cloud, lastPosition);
        }

    }

    componentWillUnmount() {

    }
    render=()=>{
        return(
            <div className="flyCloud">
                <div className="nav">
                    <span id="cloud"></span>
                    <ul id="navBar">
                        <li>北京校区</li>
                        <li>上海校区</li>
                        <li>广州校区</li>
                        <li>深圳校区</li>
                        <li>武汉校区</li>
                        <li>关于我们</li>
                        <li>联系我们</li>
                        <li>招贤纳士</li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default flyCloud;