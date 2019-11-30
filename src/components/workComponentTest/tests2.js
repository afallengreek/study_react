import React from "react";
import $ from "jquery";
import  "./tests2.css"
class tests2 extends React.Component{
    componentDidMount() {
        $(document).ready(function () {
            $("#btn1").click(
                function () {
                    $("div").show(1000);
                }
            );
            $("#btn2").click(function () {
                $("div").text("我是内容");
            });
            }
        )
    }
    render=()=>{

        return(
            <span className="tests2">
                <input type="button" value="btn1" id="btn1"/>
                <input type="button" value="设置内容" id="btn2"/>

                <div></div>
                <div></div>
                <div></div>
            </span>
        )
    }
}
export default tests2;