import React from "react";
import './apiTest9.css';
import {my$} from "../common/commonUtil";
class apiTest9 extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hidden:true,
        };
    }
    componentDidMount() {
        //获取全选的这个复选框
        var ckAll = my$("j_cbAll");
        //获取tbody中所有的小复选框
        var cks = my$("j_tb").getElementsByTagName("input");
        //点击全选的这个复选框,获取他当前的状态,然后设置tbody中所有复选框的状态
        ckAll.onclick = function () {
            //console.log(this.checked);
            for (var i = 0; i < cks.length; i++) {
                cks[i].checked = this.checked;
            }
        };

        //获取tbody中所有的复选框,分别注册点击事件
        for(var i=0;i<cks.length;i++){
            cks[i].onclick=function () {
                var flag=true;//默认都被选中了
                //判断是否所有的复选框都选中
                for(var j=0;j<cks.length;j++){
                    if(!cks[j].checked){
                        //没选中就进来了
                        flag=false;
                        break;
                    }
                }
                //全选的这个复选框的状态就是flag这个变量的值
                ckAll.checked=flag;
            };
        }

    }

    componentWillUnmount() {

    }
    handleOnClick=()=>{
        this.select1.checked=!this.select1.checked;
    }
    render=()=>{
        let value={title:["菜名","饭店"],}
        return(
            <div className="wrap">
                <table>
                    <thead>
                    <tr >
                        <th>
                            <input type="checkbox" id="j_cbAll"/>
                        </th>
                        <th>菜名</th>
                        <th>饭店</th>
                    </tr>
                    </thead>
                    <tbody id="j_tb">
                    <tr  >
                        <td>
                            <input  type="checkbox" name="红烧肉，田老师" ref={ref=>this.select1=ref}/>
                        </td>
                        <td >红烧肉</td>
                        <td >田老师</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox"/>
                        </td>
                        <td>西红柿鸡蛋</td>
                        <td>田老师</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox"/>
                        </td>
                        <td>油炸榴莲</td>
                        <td>田老师</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox"/>
                        </td>
                        <td>清蒸助教</td>
                        <td>田老师</td>
                    </tr>

                    </tbody>
                </table>
            </div>
        )
    }
}
export default apiTest9;