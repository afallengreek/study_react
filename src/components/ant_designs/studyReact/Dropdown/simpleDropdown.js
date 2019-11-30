import {Menu, Dropdown, Icon, Row, Col, Button,message} from 'antd';
import React from "react";
import MenuSelects from "../../antDesignList/menuSelects";
import PageHeader from "../../components/pageHeader";
const SubMenu = Menu.SubMenu;
const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
        </Menu.Item>
    </Menu>
);
const disableMenu = (
    <Menu>
        <Menu.Item key="0">
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" disabled>3rd menu item（disabled）</Menu.Item>
    </Menu>
);
const subMenu = (
    <Menu>
        <Menu.Item>1st menu item</Menu.Item>
        <Menu.Item>2nd menu item</Menu.Item>
        <SubMenu title="sub menu">
            <Menu.Item>3rd menu item</Menu.Item>
            <Menu.Item>4th menu item</Menu.Item>
        </SubMenu>
        <SubMenu title="disabled sub menu" disabled>
            <Menu.Item>5d menu item</Menu.Item>
            <Menu.Item>6th menu item</Menu.Item>
        </SubMenu>
    </Menu>
);
function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
}

function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
}
class simpleDropdown extends React.Component{
    selectPage=(page)=>{
        console.log("我的数据",page);
        this.props.history.push(page)
    }
    goBack=()=>{
        this.props.history.push("/");
    }
    render=()=>{
        return <PageHeader  title={"Dropdown下拉菜单:向下弹出的列表。"}>
            <Row>
                <Col span={4}>
                    <MenuSelects  selectedKey="simpleDropdown" openKey="Dropdown"
                                  selectPage={this.selectPage}  goBack={this.goBack}/>
                </Col>
                <Col span={20}>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                            Hover me <Icon type="down" />
                        </a>
                    </Dropdown>
                    <Dropdown overlay={menu} placement="bottomLeft"  >
                        <Button>bottomLeft</Button>
                    </Dropdown>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <Button>bottomCenter</Button>
                    </Dropdown>
                    <Dropdown overlay={menu} placement="bottomRight">
                        <Button>bottomRight</Button>
                    </Dropdown>
                    <br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <Dropdown overlay={menu} placement="topLeft">
                        <Button>topLeft</Button>
                    </Dropdown>
                    <Dropdown overlay={menu} placement="topCenter">
                        <Button>topCenter</Button>
                    </Dropdown>
                    <Dropdown overlay={menu} placement="topRight">
                        <Button>topRight</Button>
                    </Dropdown>
                    <br /><br />
                    <Dropdown overlay={disableMenu} >
                        <a className="ant-dropdown-link" href="#">
                            Hover me <Icon type="down" />
                        </a>
                    </Dropdown>
                    <span  style={{marginLeft:"60px"}}>
                    <Dropdown overlay={menu} trigger={['click']} >
                        <a className="ant-dropdown-link" href="#">
                            Click me <Icon type="down" />
                        </a>
                    </Dropdown>
                    </span>
                    <span  style={{marginLeft:"60px"}}>
                    <Dropdown overlay={subMenu}>
                        <a className="ant-dropdown-link" href="#">
                            Cascading menu <Icon type="down" />
                        </a>
                    </Dropdown>
                   </span>
                    <br/><br/><br/><br/>
                    <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
                        Dropdown
                    </Dropdown.Button>
                    <span  style={{marginLeft:"60px"}}>
                    <Dropdown.Button
                        onClick={handleButtonClick}
                        overlay={menu}
                        disabled
                        style={{ marginLeft: 8 }}
                    >
                        Dropdown
                    </Dropdown.Button>
                    </span>
                    <span  style={{marginLeft:"60px"}}>
                    <Dropdown overlay={menu}>
                        <Button style={{ marginLeft: 8 }}>
                            Button <Icon type="down" />
                        </Button>
                    </Dropdown>
                    </span>
                    <Dropdown overlay={menu} trigger={['contextMenu']}>
                        <span style={{ userSelect: 'none' }}>右键点击</span>
                    </Dropdown>
                </Col>
            </Row>
        </PageHeader>
    }
}
export default simpleDropdown;