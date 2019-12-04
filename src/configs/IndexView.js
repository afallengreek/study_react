/**
 * Created by liusonglin on 2018/7/13.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import table from "../components/ant_designs/antDesignList/table";
import {Card, Col, Icon, Row, Tag, Timeline} from "antd";
import menu from "../components/ant_designs/antDesignList/menuSelects";
import JdHeader from "../components/jd/JdPage/JdHeader";
import apiTest1 from "../components/jsApi/apiTest1";
import apiTest4 from "../components/jsApi/apiTest4";
import apiTest7 from "../components/jsApi/apitest7";
import createUl from "../components/jsApi/createUl";
import RotationChart1 from "../components/jsApi/RotationChart1";
import arrayTest from "../components/jsApi/arrayTest";
import test3 from "../components/workComponentTest/test3";
import ListTest from "../components/algorithm/ListTest";
import TodoApp from "../components/studyRedux/todo/TodoApp";
import TestBreadcrumb from "../components/commonsAssemblyStudy/TestBreadcrumb";
import PromiseTest1 from "../components/promise/PromiseTest1";

//随机颜色
const color=["#FFD700"," #FF7F24"," #FF0000"," #FF6EB4","#EEEE00","#E6E6FA","#E066FF","#EE1289",
    "#DEB887"," #D1EEEE"," #C71585","#C6E2FF"," #C67171","#B9D3EE","#B4EEB4"," #87CEEB"," #737373",
    "#556B2F","#303030","#292929","#228B22","#1A1A1A","#473C8B","#7A7A7A","#7EC0EE"
    ,"#87CEFF","#9AFF9A","#B0E0E6","#EE9572","#FA8072","#BDBDBD","#53868B","#48D1CC"];
const gridStyle = {
    width: '25%',
    textAlign: 'center',
};
export default class IndexView extends React.Component {
    active=(value)=>{
       console.log(value);
       this.props.history.push("/"+value);
    };
    render() {

        let textLineOne=["mobxProject","PromiseTest1","MobxTestMain","TestBreadcrumb","AdcanceFunctionTest1","MathStudy","TodoApp","BatchImport","ListTest","test3","drawerForm","modalConfirm","table","LoginMain","modalFoot","form","menuSelects",
            "menus","JdStatic","apiTest1","apiTest2","apiTest3","apiTest4","apiTest5","apiTest6","apiTest7"
            ,"apiTest8","apiTest9","createUl","moreEvent","RotationChart1","RotationChart2","fixedTop",
            "flyCloud","arrayTest","accordion","ShutdownAnimation","whirligig","RandomSquare","SnakeProject"
           ,"tests1","tests2"];
        return (
            <Card title={<b style={{fontSize:"20px"}}>ant design学习笔记</b>}>
                         {
                         textLineOne.map((item) => {
                            let randomColor=color[parseInt(Math.random() * color.length, 10)];
                            let randomNum=parseInt(Math.random() * 100, 10);
                            return <Card.Grid style={gridStyle} color={randomColor} dot={randomNum/5===0?<Icon type="clock-circle-o"/>:""}
                            ><Tag  onClick={()=>this.active(item)}
                                style={{width:"150px",height:"150px",marginLeft:"10px",marginTop:"15px",align:"center",borderRadius:"50%",fontSize:"18px"}}
                                color={randomColor}><div style={{marginTop:"60px",align:"center"}}>{item!==""?item:randomColor}</div></Tag></Card.Grid>
                        })}
            </Card>

        );
    }
}
