import {
    Layout, Menu, Breadcrumb, Icon, Row, Col, Tooltip,
} from 'antd';
import React from "react";
import PageHeader from "../../components/pageHeader";
import MenuSelects from "../../antDesignList/menuSelects";

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

class navigationSliderMenus extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    selectPage=(page)=>{
        console.log("我的数据",page);
        this.props.history.push(page)
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    goBack=()=>{
        this.props.history.push("/");
    }
    render() {
        let title="侧边布局:侧边两列式布局。页面横向空间有限时，侧边导航可收起。" +
            "侧边导航在页面布局上采用的是左右的结构，一般主导航放置于页面的左侧固定位置，辅助菜单放置于工作区顶部。内容根据浏览器终端进行自适应，能提高横向空间的使用率，但是整个页面排版不稳定。侧边导航的模式层级扩展性强，一、二、三级导航项目可以更为顺畅且具关联性的被展示，同时侧边导航可以固定，使得用户在操作和浏览中可以快速的定位和切换当前位置，有很高的操作效率。但这类导航横向页面内容的空间会被牺牲一部份。";
        return (
            <PageHeader  title={ <Tooltip title={title}>{title}</Tooltip>} >
                <Row>
                    <Col span={4}>
                        <MenuSelects  selectedKey="navigationSliderMenus" openKey="Layout"
                                      selectPage={this.selectPage} goBack={this.goBack}/>
                    </Col>
                    <Col span={20}>
                        <Layout style={{ minHeight: '100vh' }}>
                            <Sider
                                collapsible
                                collapsed={this.state.collapsed}
                                onCollapse={this.onCollapse}
                                onBreakpoint={(broken) => { console.log(broken); }}
                                style={{
                                    overflow: 'auto', height: '100vh', marginLeft: 0,
                                }}
                                // position:"fixed"
                            >
                                <div className="logo" style={{ height: "32px",
                                    background: "rgba(255,255,255,.2)", margin: "16px",}} />
                                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                                    <Menu.Item key="1">
                                        <Icon type="pie-chart" />
                                        <span>Option 1</span>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Icon type="desktop" />
                                        <span>Option 2</span>
                                    </Menu.Item>
                                    <SubMenu
                                        key="sub1"
                                        title={<span><Icon type="user" /><span>User</span></span>}
                                    >
                                        <Menu.Item key="3">Tom</Menu.Item>
                                        <Menu.Item key="4">Bill</Menu.Item>
                                        <Menu.Item key="5">Alex</Menu.Item>
                                    </SubMenu>
                                    <SubMenu
                                        key="sub2"
                                        title={<span><Icon type="team" /><span>Team</span></span>}
                                    >
                                        <Menu.Item key="6">Team 1</Menu.Item>
                                        <Menu.Item key="8">Team 2</Menu.Item>
                                    </SubMenu>
                                    <Menu.Item key="9">
                                        <Icon type="file" />
                                        <span>File</span>
                                    </Menu.Item>
                                </Menu>
                            </Sider>
                            <Layout>
                                <Header style={{ background: '#fff', padding: 0 }} >
                                    <Icon
                                        className="trigger"
                                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                        onClick={this.toggle}
                                        style={{marginLeft:30}}
                                    />
                                </Header>
                                <Content style={{ margin: '0 16px' }}>
                                    <Breadcrumb style={{ margin: '16px 0' }}>
                                        <Breadcrumb.Item>User</Breadcrumb.Item>
                                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                                    </Breadcrumb>
                                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                        Bill is a cat.
                                    </div>
                                </Content>
                                <Footer style={{ textAlign: 'center' }}>
                                    Ant Design ©2018 Created by Ant UED
                                </Footer>
                            </Layout>
                        </Layout>
                    </Col>
                </Row>
            </PageHeader>

        );
    }
}
export default navigationSliderMenus;