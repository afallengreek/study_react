import {Breadcrumb, Col, Row} from 'antd';
import React from "react";
import MenuSelects from "../../antDesignList/menuSelects";
import PageHeader from "../../components/pageHeader";

class myPhotoBreadCrumb extends React.Component{
    selectPage=(page)=>{
        console.log("我的数据",page);
        this.props.history.push(page)
    }
    goBack=()=>{
        this.props.history.push("/");
    }
    render=()=>{
        return <PageHeader  title={"分隔符:使用 separator:> 可以自定义分隔符。"}>
            <Row>
                <Col span={4}>
                    <MenuSelects  selectedKey="myPhotoBreadCrumb" openKey="Breadcrumb"
                                  selectPage={this.selectPage} goBack={this.goBack}/>
                </Col>
                <Col span={20}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
                        <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
                        <Breadcrumb.Item>An Application</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
        </PageHeader>
    }
}
export default myPhotoBreadCrumb;
