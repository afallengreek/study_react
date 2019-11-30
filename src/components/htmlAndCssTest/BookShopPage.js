import React from "react";
import  "./BookShopPage.css"
import logo from "./bookShopImg/logo.png"
import cart from "./bookShopImg/cart.gif"
import search from "./bookShopImg/serchbutton.gif"
import productlist from "./bookShopImg/productlist.gif"
import photo101 from "./bookShopImg/101.jpg"
class BookShopPage extends React.Component{
     render=()=>{
         return (
             <span className="bookShopPage">
                 	<div id="page" className="clearfix" >
                         {/*style={{overflow:"auto"}}>*/}
                        <div id="top">
                            <div id="top_left">
                                <img alt="" src={logo}/>
                            </div>
                            <div id="top_right">
                                <img alt="" src={cart}/>
                                <a href="#">购物车</a>|
                                <a href="#">帮助中心</a>|
                                <a href="#">我的账户</a>|
                                <a href="#">新用户注册</a>
                            </div>
                        </div>
                    </div>
                     {/*<div style={{clear:"both"}}></div>*/}
                     <div id="menu">
                        <a href="#">文学</a>
                        <a href="#">生活</a>
                        <a href="#">计算机</a>
                        <a href="#">外语</a>
                        <a href="#">经管</a>
                        <a href="#">励志</a>
                        <a href="#">社科</a>
                        <a href="#">学术</a>
                        <a href="#">少儿</a>
                        <a href="#">艺术</a>
                        <a href="#">原版</a>
                        <a href="#">科技</a>
                        <a href="#">考试</a>
                        <a href="#">生活百科</a>
                        <a className="all" href="#">全部目录商品</a>
                    </div>
                    <div id="search">
                        <span>Search</span>
                        <input type="text" />
                        <input type="image" src={search} />
                    </div>
		           <div id="content">
                        <div id="content_top">
                            <span>首页 > 旅游 > 图书列表 </span>
                        </div>
                       <div id="content_bottom">
                            <h1>商品目录</h1>
                            <hr/>
                            <h1>计算机类</h1>
                            <span>共100种商品</span>
                            <hr/>
                           	<div id="productlist">
                                <div id="productlist_img">
					        	<img alt="" src={productlist} width="100%"/>
                                </div>
                                <div id="booklist" className="clearfix">
                                    <div className="book">
                                        <div className="bookimg">
                                            <img alt="" src={photo101}/>
                                        </div>
                                        <div className="bookIntr">
                                            <span>书名：xxx</span><br/>
                                            <span>售价：xxx</span>
                                        </div>
                                    </div>
                                     <div className="book">
                                        <div className="bookimg">
                                            <img alt="" src={photo101}/>
                                        </div>
                                        <div className="bookIntr">
                                            <span>书名：xxx</span><br/>
                                            <span>售价：xxx</span>
                                        </div>
                                    </div>
                                     <div className="book">
                                        <div className="bookimg">
                                            <img alt="" src={photo101}/>
                                        </div>
                                        <div className="bookIntr">
                                            <span>书名：xxx</span><br/>
                                            <span>售价：xxx</span>
                                        </div>
                                    </div>
                                     <div className="book">
                                        <div className="bookimg">
                                            <img alt="" src={photo101}/>
                                        </div>
                                        <div className="bookIntr">
                                            <span>书名：xxx</span><br/>
                                            <span>售价：xxx</span>
                                        </div>
                                    </div>
                                     <div className="book">
                                        <div className="bookimg">
                                            <img alt="" src={photo101}/>
                                        </div>
                                        <div className="bookIntr">
                                            <span>书名：xxx</span><br/>
                                            <span>售价：xxx</span>
                                        </div>
                                    </div>
                                     <div className="book">
                                        <div className="bookimg">
                                            <img alt="" src={photo101}/>
                                        </div>
                                        <div className="bookIntr">
                                            <span>书名：xxx</span><br/>
                                            <span>售价：xxx</span>
                                        </div>
                                    </div>
                                     <div className="book">
                                        <div className="bookimg">
                                            <img alt="" src={photo101}/>
                                        </div>
                                        <div className="bookIntr">
                                            <span>书名：xxx</span><br/>
                                            <span>售价：xxx</span>
                                        </div>
                                    </div>
                                    <div className="book">
                                        <div className="bookimg">
                                            <img alt="" src={photo101}/>
                                        </div>
                                        <div className="bookIntr">
                                            <span>书名：xxx</span><br/>
                                            <span>售价：xxx</span>
                                        </div>
                                    </div>
                                    {/*<div class="book">*/}
                                        {/*<div class="bookimg">*/}
                                            {/*<img alt="" src="bookcover/102.jpg"/>*/}
                                        {/*</div>*/}
                                        {/*<div class="bookIntr">*/}
                                            {/*<span>书名：xxx</span><br/>*/}
                                            {/*<span>售价：xxx</span>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div class="book">*/}
                                        {/*<div class="bookimg">*/}
                                            {/*<img alt="" src="bookcover/103.jpg"/>*/}
                                        {/*</div>*/}
                                        {/*<div class="bookIntr">*/}
                                            {/*<span>书名：xxx</span><br/>*/}
                                            {/*<span>售价：xxx</span>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div class="book">*/}
                                        {/*<div class="bookimg">*/}
                                            {/*<img alt="" src="bookcover/104.jpg"/>*/}
                                        {/*</div>*/}
                                        {/*<div class="bookIntr">*/}
                                            {/*<span>书名：xxx</span><br/>*/}
                                            {/*<span>售价：xxx</span>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div class="book">*/}
                                        {/*<div class="bookimg">*/}
                                            {/*<img alt="" src="bookcover/105.jpg" width="102"/>*/}
                                        {/*</div>*/}
                                        {/*<div class="bookIntr">*/}
                                            {/*<span>书名：xxx</span><br/>*/}
                                            {/*<span>售价：xxx</span>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div class="book">*/}
                                        {/*<div class="bookimg">*/}
                                            {/*<img alt="" src="bookcover/106.jpg" width="102"/>*/}
                                        {/*</div>*/}
                                        {/*<div class="bookIntr">*/}
                                            {/*<span>书名：xxx</span><br/>*/}
                                            {/*<span>售价：xxx</span>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div class="book">*/}
                                        {/*<div class="bookimg">*/}
                                            {/*<img alt="" src="bookcover/107.jpg"/>*/}
                                        {/*</div>*/}
                                        {/*<div class="bookIntr">*/}
                                            {/*<span>书名：xxx</span><br/>*/}
                                            {/*<span>售价：xxx</span>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div class="book">*/}
                                        {/*<div>*/}
                                            {/*<img alt="" src="bookcover/108.jpg" width="130"/>*/}
                                        {/*</div>*/}
                                        {/*<div>*/}
                                            {/*<span>书名:xxx</span>*/}
                                            {/*<br/>*/}
                                            {/*<span>售价:xxx</span>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    <div id="jumpPage">
                                            <a href="#">上一页</a>
                                            <a className="current" href="#">1</a>
                                            <a href="#">2</a>
                                            <a href="#">3</a>
                                            <a href="#">4</a>
                                            <a href="#">5</a>
                                            <a href="#">6</a>
                                            <a href="#">7</a>
                                            <a href="#">下一页</a>
                                  </div>
                                </div>
                            </div>
                       </div>
                   </div>
                    <div id="bottom">
                        <div id="bottom_left">
                            <img alt="" src={logo}/>
                        </div>
                        <div id="bottom_right">
                            <span>CONTACT US</span><br/>
                            <span>copyright 2017 © striner All Rights RESERVED</span>
                        </div>
                    </div>
             </span>
         );
     }
}
export default BookShopPage;