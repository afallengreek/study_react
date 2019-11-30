import {Layout, Menu, Breadcrumb, Row, Col, Tooltip} from 'antd';
import React from "react";
import PageHeader from "../../components/pageHeader";
import MenuSelects from "../../antDesignList/menuSelects";

const { Header, Content, Footer } = Layout;

class navigationLayout extends React.Component{
    selectPage=(page)=>{
        console.log("我的数据",page);
        this.props.history.push(page)
    }
    goBack=()=>{
        this.props.history.push("/");
    }
    render=()=>{
        let title="上中下布局:最基本的『上-中-下』布局。" +
            "一般主导航放置于页面的顶端，从左自右依次为：logo、一级导航项、辅助菜单（用户、设置、通知等）。通常将内容放在固定尺寸（例如：1200px）内，整个页面排版稳定，不受用户终端显示器影响；上下级的结构符合用户上下浏览的习惯，也是较为经典的网站导航模式。页面上下切分的方式提高了主工作区域的信息展示效率，但在纵向空间上会有一些牺牲。此外，由于导航栏水平空间的限制，不适合那些一级导航项很多的信息结构。";
    return <PageHeader  title={<Tooltip title={title}>{title}</Tooltip>}>
            <Row>
                <Col span={4}>
                    <MenuSelects  selectedKey="navigationLayout" openKey="Layout"
                                  selectPage={this.selectPage} goBack={this.goBack}/>
                </Col>
                <Col span={20}>
                    <Layout className="layout">
                        <Header>
                            <div style={{ width: "120px",
                                height: "31px",
                                background: "rgba(255,255,255,.2)",
                                margin: "16px 24px 16px 0",
                                float: "left",}} />
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
                        <Content style={{ padding: '0 50px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2018 Created by Ant pengxu
                        </Footer>
                    </Layout>
                </Col>
            </Row>
        </PageHeader>
    }
}
export default navigationLayout;