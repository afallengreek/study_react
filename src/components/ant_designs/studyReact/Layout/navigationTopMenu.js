import {Layout, Menu, Breadcrumb, Row, Col, SubMenu} from 'antd';
import React from "react";
import PageHeader from "../../components/pageHeader";
import MenuSelects from "../../antDesignList/menuSelects";

const { Header, Content, Footer } = Layout;

class navigationTopMenu extends React.Component{
    selectPage=(page)=>{
        console.log("我的数据",page);
        this.props.history.push(page)
    }
    goBack=()=>{
        this.props.history.push("/");
    }
    render=()=>{
        return <PageHeader  title={"固定头部:一般用于固定顶部导航，方便页面切换。"}>
            <Row>
                <Col span={4}>
                    <MenuSelects  selectedKey="navigationTopMenu" openKey="Layout"
                                  selectPage={this.selectPage} goBack={this.goBack}/>
                </Col>
                <Col span={20}>
                    <Layout>
                        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                            <div className="logo" />
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['2']}
                                style={{ lineHeight: '64px' }}
                            >
                                <Menu.Item key="1">nav 1</Menu.Item>
                                <Menu.Item key="2">nav 2</Menu.Item>
                                <Menu.Item key="3">nav 3</Menu.Item>
                            </Menu>
                        </Header>
                        <Content style={{ padding: '0 50px', marginTop: 64 }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>Content</div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2018 Created by Ant UED
                        </Footer>
                    </Layout>
                </Col>
            </Row>
        </PageHeader>
    }
}
export default navigationTopMenu;