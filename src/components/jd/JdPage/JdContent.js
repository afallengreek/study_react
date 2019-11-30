import React from "react";
import '../JdCss/JdContent.css';
import  pic1 from "../img/pic1.jpg"
import pic2 from "../img/pic2.jpg"
import banner from "../img/banner.jpg"

class JdContent extends React.Component{
    render=()=>{
        return(
            <span>
                <div className="jd">
                    <div className="w jd-inner">
                        <div className="jd-clo1">
                                <ul>
                                    <li><a href="#">家用电器</a></li>
                                    <li>
                                        <a href="#">手机</a>
                                        <span>/</span>
                                        <a href="#">运营商</a>
                                        <span>/</span>
                                        <a href="#">数码</a>
                                    </li>
                                    <li>
                                        <a href="#">电脑</a>
                                        <span>/</span>
                                        <a href="#">运营商</a>
                                        <span>/</span>
                                        <a href="#">数码</a>
                                    </li>
                                    <li>
                                        <a href="#">手机</a>
                                        <span>/</span>
                                        <a href="#">运营商</a>
                                        <span>/</span>
                                        <a href="#">数码</a>
                                    </li>
                                    <li>
                                        <a href="#">手机</a>
                                        <span>/</span>
                                        <a href="#">运营商</a>
                                        <span>/</span>
                                        <a href="#">数码</a>
                                    </li>
                                    <li>
                                        <a href="#">手机</a>
                                        <span>/</span>
                                        <a href="#">运营商</a>
                                        <span>/</span>
                                        <a href="#">数码</a>
                                    </li>
                                    <li>
                                        <a href="#">手机</a>
                                        <span>/</span>
                                        <a href="#">运营商</a>
                                        <span>/</span>
                                        <a href="#">数码</a>
                                    </li>
                                    <li>
                                        <a href="#">手机</a>
                                        <span>/</span>
                                        <a href="#">运营商</a>
                                        <span>/</span>
                                        <a href="#">数码</a>
                                    </li>
                                    <li>
                                        <a href="#">手机</a>
                                        <span>/</span>
                                        <a href="#">运营商</a>
                                        <span>/</span>
                                        <a href="#">数码</a>
                                    </li>
                                    <li>
                                        <a href="#">手机</a>
                                        <span>/</span>
                                        <a href="#">运营商</a>
                                        <span>/</span>
                                        <a href="#">数码</a>
                                    </li>
                                    <li>
                                        <a href="#">手机</a>
                                        <span>/</span>
                                        <a href="#">运营商</a>
                                        <span>/</span>
                                        <a href="#">数码</a>
                                    </li>
                                    <li>
                                        <a href="#">手机</a>
                                        <span>/</span>
                                        <a href="#">运营商</a>
                                        <span>/</span>
                                        <a href="#">数码</a>
                                    </li>
                                    <li>
                                        <a href="#">手机</a>
                                        <span>/</span>
                                        <a href="#">运营商</a>
                                        <span>/</span>
                                        <a href="#">数码</a>
                                    </li>
                                    <li>
                                        <a href="#">手机</a>
                                        <span>/</span>
                                        <a href="#">运营商</a>
                                        <span>/</span>
                                        <a href="#">数码</a>
                                    </li>
                                    <li>
                                        <a href="#">手机</a>
                                        <span>/</span>
                                        <a href="#">运营商</a>
                                        <span>/</span>
                                        <a href="#">数码</a>
                                    </li>
                                    <li>
                                        <a href="#">手机</a>
                                        <span>/</span>
                                        <a href="#">运营商</a>
                                        <span>/</span>
                                        <a href="#">数码</a>
                                    </li>
                                </ul>
                            </div>
                        <div className="jd-clo2">
                            <div className="jd-clo2-hd">

                                <a href="#" className="arr-l"></a>
                                <a href="#" className="arr-r"></a>

                                <ol>
                                    <li className="current"></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ol>


                                <ul>
                                    <li><a href="#"><img src={banner}/></a></li>
                                </ul>

                            </div>
                            <div className="jd-clo2-bd">
                                <div className="firstPic">
                                    <img src={pic1} />
                                </div>
                                <div>
                                    <img src={pic2} />
                                </div>
                            </div>
                        </div>
                        <div className="jd-clo3"></div>
                    </div>
                     {/*广告结束 */}
                    <div className="ad">
                        <a href="#"></a>
                    </div>
                </div>
            </span>
        )
    }
}
export default JdContent;