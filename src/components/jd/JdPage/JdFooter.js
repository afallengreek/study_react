import React from "react";
import '../JdCss/JdFooter.css';

class JdFooter extends React.Component{
    render=()=>{
        return(
            <span>
                   {/*页面底部分*/}
                <div className="footer">
                   <div className="w footer-service-inner">
                       <ul className="clearfix">
                            <li>
                                <div className="service_unit">
                                    <h5>多</h5>
                                    <p>品类齐全，轻松购物</p>
                                </div>
                            </li>

                            <li>
                                <div className="service_unit">
                                    <h5 className="kuai">快</h5>
                                    <p>多仓直发，极速配送</p>
                                </div>
                            </li>

                            <li>
                                <div className="service_unit">
                                    <h5 className="hao">好</h5>
                                    <p>正品行货，精致服务</p>
                                </div>
                            </li>

                            <li>
                                <div className="service_unit">
                                    <h5 className="sheng">省</h5>
                                    <p>天天低价，畅选无忧</p>
                                </div>
                            </li>

                        </ul>
                   </div>
                    {/*帮助模块 */}
                    <div className="w help clearfix">
                        <dl>
                            <dt>购物指南</dt>
                            <dd className=""><a href="#">购物流程</a></dd>
                            <dd><a href="#">会员介绍</a></dd>
                            <dd><a href="#">生活旅行</a></dd>
                            <dd><a href="#">常见问题</a></dd>
                            <dd><a href="#">大家电</a></dd>
                            <dd><a href="#">联系客服</a></dd>
                        </dl>
                        <dl>
                            <dt>购物指南</dt>
                            <dd><a href="#">购物流程</a></dd>
                            <dd><a href="#">会员介绍</a></dd>
                            <dd><a href="#">生活旅行</a></dd>
                            <dd><a href="#">常见问题</a></dd>
                            <dd><a href="#">大家电</a></dd>
                            <dd><a href="#">联系客服</a></dd>
                        </dl>
                        <dl>
                            <dt>购物指南</dt>
                            <dd><a href="#">购物流程</a></dd>
                            <dd><a href="#">会员介绍</a></dd>
                            <dd><a href="#">生活旅行</a></dd>
                            <dd><a href="#">常见问题</a></dd>
                            <dd><a href="#">大家电</a></dd>
                            <dd><a href="#">联系客服</a></dd>
                        </dl>
                        <dl>
                            <dt>购物指南</dt>
                            <dd><a href="#">购物流程</a></dd>
                            <dd><a href="#">会员介绍</a></dd>
                            <dd><a href="#">生活旅行</a></dd>
                            <dd><a href="#">常见问题</a></dd>
                            <dd><a href="#">大家电</a></dd>
                            <dd><a href="#">联系客服</a></dd>
                        </dl>
                        <dl>
                            <dt>购物指南</dt>
                            <dd><a href="#">购物流程</a></dd>
                            <dd><a href="#">会员介绍</a></dd>
                            <dd><a href="#">生活旅行</a></dd>
                            <dd><a href="#">常见问题</a></dd>
                            <dd><a href="#">大家电</a></dd>
                            <dd><a href="#">联系客服</a></dd>
                        </dl>
                        <dl className="cover">
                            <dt>京东自营覆盖区县</dt>
                            <dd className="info">京东已向全国2661个区县提供自营配送服务，支持货到付款、POS机刷卡和售后上门服务。
                            </dd>
                            <dd className="more"><a href="#">查看详情 > </a></dd>

                        </dl>
                  </div>
                     {/*版权模块 */}
                    <div className="w copyright">
                            <div className="links">
                                <a href="#">关于我们</a>
                                <span>|</span>
                                <a href="#">关于我们</a>
                                <span>|</span>
                                <a href="#">关于我们</a>
                                <span>|</span>
                                <a href="#">关于我们</a>
                                <span>|</span>
                                <a href="#">关于我们</a>
                                <span>|</span>
                                <a href="#">关于我们</a>
                                <span>|</span>
                                <a href="#">关于我们</a>
                                <span>|</span>
                                <a href="#">关于我们</a>
                                <span>|</span>
                                <a href="#">关于我们</a>
                                <span>|</span>
                                <a href="#">关于我们</a>
                                <span>|</span>
                                <a href="#">关于我们</a>
                                <span>|</span>

                                <a href="#">English</a>
                                <span>|</span>
                                <a href="#">Site</a>
                                <span>|</span>
                                <a href="#">Media & IR</a>
                                <span>|</span>
                            </div>

                            <div className="c-info">
                                <p>京公网安备 11000002000088号|京ICP证070359号|互联网药品信息服务资格证编号(京)-经营性-2014-0008|新出发京零 字第大120007号</p>
                                <p>互联网出版许可证编号新出网证(京)字150号|出版物经营许可证|网络文化经营许可证京网文[2014]2148-348号|违法和不良信息举报电话：4006561155</p>
                                <p>Copyright © 2004 - 2017  京东JD.com 版权所有|消费者维权热线：4006067733经营证照</p>
                                <p>京东旗下网站：京东支付|京东云</p>
                            </div>
                            <div className="tupian">
                                <a href="#"></a>
                                <a href="#" className="kexin"></a>
                                <a href="#"></a>
                                <a href="#"></a>
                                <a href="#"></a>
                                <a href="#"></a>
                            </div>
                    </div>
                </div>
            </span>
        )
    }
}
export default JdFooter;