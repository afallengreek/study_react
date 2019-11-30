import {Breadcrumb, Col, Row} from 'antd';
import React from "react";
import MenuSelects from "../../antDesignList/menuSelects";
import PageHeader from "../../components/pageHeader";

class normalBreadCrumb extends React.Component{
    selectPage=(page)=>{
        console.log("我的数据",page);
        this.props.history.push(page)
    }
    goBack=()=>{
        this.props.history.push("/");
    }
    render=()=>{
       return <PageHeader  title={"基本:最简单的用法。"}>
        <Row>
            <Col span={4}>
                <MenuSelects  selectedKey="normalBreadCrumb" openKey="Breadcrumb"
                selectPage={this.selectPage} goBack={this.goBack}/>
            </Col>
            <Col span={20}>
                <Breadcrumb>
                    <Breadcrumb.Item>主页</Breadcrumb.Item>
                    <Breadcrumb.Item><a href="">软件中心</a></Breadcrumb.Item>
                    <Breadcrumb.Item><a href="">软件列表</a></Breadcrumb.Item>
                    <Breadcrumb.Item>软件一</Breadcrumb.Item>
                </Breadcrumb>
            </Col>
        </Row>
       </PageHeader>
    }
}

export default normalBreadCrumb;