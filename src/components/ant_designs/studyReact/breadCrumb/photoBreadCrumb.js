import {Breadcrumb, Col, Icon, Row} from 'antd';
import React from "react";
import MenuSelects from "../../antDesignList/menuSelects";
import PageHeader from "../../components/pageHeader";

class PhotoBreadCrumb extends React.Component{
    selectPage=(page)=>{
        console.log("我的数据",page);
        this.props.history.push(page)
    }
    goBack=()=>{
        this.props.history.push("/");
    }
    render=()=>{
        return   <PageHeader  title={"带有图标的:图标放在文字前面。"}>
        <Row>
            <Col span={4}>
                <MenuSelects  selectedKey="photoBreadCrumb" openKey="Breadcrumb"
                              selectPage={this.selectPage}  goBack={this.goBack}/>
            </Col>

            <Col span={20}>
                <Breadcrumb>
                <Breadcrumb.Item href="">
                    <Icon type="home" />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">
                    <Icon type="user" />
                    <span>Application List</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Application
                </Breadcrumb.Item>
               </Breadcrumb>
            </Col>
           </Row>
          </PageHeader>

    }
}
export default PhotoBreadCrumb;