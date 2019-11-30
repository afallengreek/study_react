import React from "react";
import {my$} from "../common/commonUtil";
class RandomSquare extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hidden:true,
        };
    }
    componentDidMount() {
         //产生随机数对象的
        (function (window) {
            function Random() {
            }
            Random.prototype.getRandom=function (min,max) {
                return Math.floor(Math.random()*(max-min)+min);
            };
            //把局部对象暴露给window顶级对象,就成了全局的对象
            window.Random=new Random();
        })(window);//自调用构造函数的方式,分号一定要加上


        //产生小方块对象
        (function (window) {
            //console.log(Random.getRandom(0,5));
            //选择器的方式来获取元素对象
            var map=document.querySelector(".map");

            //食物的构造函数
            function Food(width,height,color) {
                this.width=width||20;//默认的小方块的宽
                this.height=height||20;//默认的小方块的高
                //横坐标,纵坐标
                this.x=0;//横坐标随机产生的
                this.y=0;//纵坐标随机产生的
                this.color=color;//小方块的背景颜色
                this.element=document.createElement("div");//小方块的元素
            }
            //初始化小方块的显示的效果及位置---显示地图上
            Food.prototype.init=function (map) {
                console.log("执行过程");
                //设置小方块的样式
                var div=this.element;
                div.style.position="absolute";//脱离文档流
                div.style.width=this.width+"px";
                div.style.height=this.height+"px";
                div.style.backgroundColor=this.color;
                //把小方块加到map地图中
                map.appendChild(div);
                this.render(map);
            };
            //产生随机位置
            Food.prototype.render=function (map) {
                //随机产生横纵坐标
                var x=window.Random.getRandom(0,map.offsetWidth/this.width)*this.width;
                var y=window.Random.getRandom(0,map.offsetHeight/this.height)*this.height;
                this.x=x;
                this.y=y;
                var div=this.element;
                div.style.left=this.x+"px";
                div.style.top=this.y+"px";
            };

            //实例化对象
            var fd=new Food(20,20,"green");
            // fd.init(map);

            setInterval(function(){ fd.init(map); }, 1000);

            console.log(fd.x+"===="+fd.y);


        })(window);
    }

    componentWillUnmount() {

    }
    handleOnClick=()=>{

    }
   render=()=>{
        return(
            <div className="map" style={{width:"800px",height:"600px",backgroundColor:"#CCC",position:"relative"}}>

            </div>
        )
    }
}
export default RandomSquare;