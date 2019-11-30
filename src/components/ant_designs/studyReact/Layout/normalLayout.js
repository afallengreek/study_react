import {Col, Layout, Row} from 'antd';
import React from "react";
import PageHeader from "../../components/pageHeader";
import MenuSelects from "../../antDesignList/menuSelects";

const {
    Header, Footer, Sider, Content,
} = Layout;
//随机颜色
const color=["#FFD700"," #FF7F24"," #FF0000"," #FF6EB4","#EEEE00","#E6E6FA","#E066FF","#EE1289",
    "#DEB887"," #D1EEEE"," #C71585","#C6E2FF"," #C67171","#B9D3EE","#B4EEB4"," #87CEEB"," #737373",
    "#556B2F","#303030","#292929","#228B22","#1A1A1A","#473C8B","#7A7A7A","#7EC0EE"
    ,"#87CEFF","#9AFF9A","#B0E0E6","#EE9572","#FA8072","#BDBDBD","#53868B","#48D1CC"];
class normalLayout extends React.Component{
    selectPage=(page)=>{
        console.log("我的数据",page);
        this.props.history.push(page)
    }
    goBack=()=>{
        this.props.history.push("/");
    }
    render=()=>{
      return   <PageHeader  title={"基本结构:典型的页面布局。"}>
              <Row>
                  <Col span={4}>
                      <MenuSelects  selectedKey="normalLayout" openKey="Layout"
                                    selectPage={this.selectPage}  goBack={this.goBack}/>
                  </Col>
                  <Col span={20}>
                      <div>
                          <Layout >
                              <Header  style={{backgroundColor:color[parseInt(Math.random() * color.length, 10)]}}>Header</Header>
                              <Content style={{backgroundColor:color[parseInt(Math.random() * color.length, 10)]}}>Content</Content>
                              <Footer style={{backgroundColor:color[parseInt(Math.random() * color.length, 10)]}}>Footer</Footer>
                          </Layout>

                          <Layout>
                              <Header style={{backgroundColor:color[parseInt(Math.random() * color.length, 10)]}}>Header</Header>
                              <Layout >
                                  <Sider style={{backgroundColor:color[parseInt(Math.random() * color.length, 10)]}}>Sider</Sider>
                                  <Content style={{backgroundColor:color[parseInt(Math.random() * color.length, 10)]}}>Content</Content>
                              </Layout>
                              <Footer style={{backgroundColor:color[parseInt(Math.random() * color.length, 10)]}}>Footer</Footer>
                          </Layout>

                          <Layout>
                              <Header style={{backgroundColor:color[parseInt(Math.random() * color.length, 10)]}}>Header</Header>
                              <Layout>
                                  <Content style={{backgroundColor:color[parseInt(Math.random() * color.length, 10)]}}>Content</Content>
                                  <Sider style={{backgroundColor:color[parseInt(Math.random() * color.length, 10)]}}>Sider</Sider>
                              </Layout>
                              <Footer style={{backgroundColor:color[parseInt(Math.random() * color.length, 10)]}}>Footer</Footer>
                          </Layout>

                          <Layout>
                              <Sider style={{backgroundColor:color[parseInt(Math.random() * color.length, 10)]}}>Sider</Sider>
                              <Layout>
                                  <Header style={{backgroundColor:color[parseInt(Math.random() * color.length, 10)]}}>Header</Header>
                                  <Content style={{backgroundColor:color[parseInt(Math.random() * color.length, 10)]}}>Content</Content>
                                  <Footer style={{backgroundColor:color[parseInt(Math.random() * color.length, 10)]}}>Footer</Footer>
                              </Layout>
                          </Layout>
                      </div>
                  </Col>
              </Row>
          </PageHeader>

    }
}
export default normalLayout;
