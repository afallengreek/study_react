import React from "react";
import  img1 from "./img/normal1.jpg"
import img1Small from "./img/small1.jpg"
import {my$} from "../common/commonUtil";



class apiTest1 extends React.Component{
    constructor(props) {
        super(props);
        this.state={
          clickedFlag:false,
        };
       this.clickedFlag=false;
    }
    componentDidMount() {
        my$("ak").onclick=function () {
            my$("big").src=img1;
            return false;
        };
    }
    // my$("ak").onclick=function () {
    //     my$("big").src=this.href;
    //     return false;
    // };
    // handleClick=()=>{
    //     this.setState({
    //         clickedFlag:true,
    //     })
    //     this.clickedFlag=true;
    //     console.log("我的数据234")
    //     // this.img.src=img1;
    // };
    render=()=>{
        console.log("我的标记",this.clickedFlag);
        return(
            <span>
            <a  id="ak" ref={ref=>this.link=ref} ><img src={img1Small} alt=""/></a>
             <img src={this.clickedFlag?img1:""} alt="" id="big" ref={ref=>this.img=ref}/>
            </span>
        )
    }
}
export default apiTest1;