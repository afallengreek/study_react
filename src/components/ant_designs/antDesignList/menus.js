import {
    Layout, Menu, Breadcrumb, Icon, Button,
} from 'antd';
import React from "react";
import NormalCheckBox from "../studyReact/checkBox/NormalCheckBox";
import NormalCascader from "../studyReact/Cascader/NormalCascader";

const { SubMenu } = Menu;
const {
    Header, Content, Footer, Sider,
} = Layout;

class  menus extends React.Component{
    state={
        content:<NormalCheckBox/>
    };
    goBack=()=>{
        this.props.history.goBack();
    };
    goToPage=(data)=>{
        let key=data.key;
        if(key==="normalCheckBox"){
            this.setState({
                content:<NormalCheckBox/>
            })
        }
        else if(key==="NormalCascader"){
            this.setState({
                content:<NormalCascader/>
            })
        }
        console.log("打印我的key",data.key);
    };
    render=()=>{
        let content=this.state.content;
        // console.log(content());
        return  <Layout>
            <Header className="header" >
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="smallComponent">smallComponent</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
                <Button onClick={this.goBack} style={{float:"right",marginTop:10}}>返回</Button>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                            onClick={this.goToPage}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="user" />Checkbox</span>} >
                                <Menu.Item key="normalCheckBox">normalCheckBox</Menu.Item>
                                <Menu.Item key="NormalCascader">NormalCascader</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        {content}
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant aFallGreek
            </Footer>
        </Layout>
    }
}
export default menus;
