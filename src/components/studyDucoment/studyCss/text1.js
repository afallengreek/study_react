import React from "react";
import './css2.css';
import logo from "../img/logo.png"
import footer from "../img/ser.png"
class text1 extends React.Component{
    render=()=>{
        return(
            <span>
                   <div className="head">
                       <div className="in">
                           <div className="logo">
                               <a><img src={logo}/></a></div>
                           <div className="menu">
                               <ul>
                                  <li><a href="#">首页</a></li>
                                    <li><a href="#">云道商城</a></li>
                                    <li><a href="#">智慧门店</a></li>
                                    <li><a href="#">营销平台</a></li>
                                    <li><a href="#">媒体联盟</a></li>
                                    <li><a href="#">关于云道</a></li>
                               </ul>
                           </div>
                       </div>
                   </div>
                <div className="banner1">
                </div>
                <div className="sevice">
                    <div className="se-hd">
                  <h3>
                        <img src={footer}/>
                  </h3>
                        <br/>
                 <p>shopcmd云道，国内领先的独立电商解决方案及全渠道营销平台。完整的产品体系，简约的系统，个性化前端，全覆盖多渠道营销体系...
                        我们致力于打造一个服务于品牌商城/独立电商的完整生态，让企业的独立电商之路变得更简单，也更有价值！</p>

                    </div>
                </div>
            </span>
        )
    }
}
export default text1;