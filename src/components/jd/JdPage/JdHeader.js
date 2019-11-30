import React from "react";
import '../JdCss/JdHeader.css';
import  QRCode from "../img/erweima.png"
import computer from "../img/computer.jpg"
import {Button, Input} from "antd";
class JdHeader extends React.Component{
    state={
        closeFlag:false,
    };
    closeAd=()=>{

        this.setState({
            closeFlag:true,
        })
    };
    render=()=>{
        return(
            <span className="JdHeader">
                <div className="J_event" hidden={this.state.closeFlag}>
                    <a href="#" className="w">
                        <i onClick={this.closeAd}></i>
                    </a>
                </div>
                <div className="shortcut">
                   <div className="w">
                      <ul className="fl">
                           <li>
                           <i className="pos"></i>
                           北京
                           </li>
                       </ul>
                       <ul className="fr">
                            <li>
                               <a href="#">
                               你好，请登录&nbsp;&nbsp;
                               </a>
                               <a href="#" className="style-red">
                               免费注册
                               </a>
                           </li>
                           <li className="spacer"></li>
                           <li>
                               <a href="#">
                               我的订单
                               </a>
                           </li>
                           <li className="spacer"></li>
                           <li className="dropdown">
                               <a href="#">
                               我的京东
                               </a>
                               <i></i>
                           </li>
                           <li className="spacer"></li>
                           <li>
                               <a href="#">
                               京东会员
                               </a>
                           </li>
                           <li className="spacer"></li>
                           <li>
                               <a href="#">
                               企业采购
                               </a>
                           </li>
                           <li className="spacer"></li>
                           <li className="dropdown">
                               <a href="#">
                               客户服务
                               </a>
                               <i></i>
                           </li>
                           <li className="spacer"></li>
                           <li className="dropdown">
                               <a href="#">
                               网站导航
                               </a>
                               <i></i>
                           </li>
                           <li className="spacer"></li>
                           <li style={{position: "relative",zIndex:1}}>
                               <a href="#">
                               手机京东
                               </a>
                           <div className="erweima">
                           <img src={QRCode} alt=""/>
                           </div>
                           </li>
                       </ul>
                   </div>
                </div>
                <div className="header">
                     <div className="w inner">
                        {/*logo部分*/}
                        <div className="logo">
                        <h1>
                        <a href="#" title="京东网">京东</a>
                        </h1>
                        </div>
                        <div className="search">
                            <input type="text" value="单反相机"/>
                            <Button>
                            <i></i>
                            </Button>
                        </div>
                    </div>
                </div>
            </span>

        )
    }
}
export default JdHeader;