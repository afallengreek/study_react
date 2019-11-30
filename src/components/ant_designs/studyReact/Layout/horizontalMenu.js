import {Menu, Icon, Row, Col} from 'antd';
import React from "react";
import PageHeader from "../../components/pageHeader";
import MenuSelects from "../../antDesignList/menuSelects";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class horizontalMenu extends React.Component {
    state = {
        current: 'mail',
    }
    selectPage=(page)=>{
        console.log("我的数据",page);
        this.props.history.push(page)
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    goBack=()=>{
        this.props.history.push("/");
    }
    render() {
        return (
            <PageHeader  title={"Affix固钉:将页面元素钉在可视范围。"}>
                <Row>
                    <Col span={4}>
                        <MenuSelects  selectedKey="normalAffix" openKey="Layout"
                                      selectPage={this.selectPage} goBack={this.goBack}/>
                    </Col>
                    <Col span={20} >
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                        >
                            <Menu.Item key="mail">
                                <Icon type="mail" />Navigation One
                            </Menu.Item>
                            <Menu.Item key="app" disabled>
                                <Icon type="appstore" />Navigation Two
                            </Menu.Item>
                            <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Navigation Three - Submenu</span>}>
                                <MenuItemGroup title="Item 1">
                                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                                </MenuItemGroup>
                                <MenuItemGroup title="Item 2">
                                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                                </MenuItemGroup>
                            </SubMenu>
                            <Menu.Item key="alipay">
                                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </PageHeader>

        );
    }
}
export default horizontalMenu;