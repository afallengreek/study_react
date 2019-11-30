/**
 * Created by liusonglin on 2018/7/13.
 */
import React from 'react';
import { BackTop, Button, Menu, Icon, Switch,} from "antd";
import navigationLayout from "../studyReact/Layout/navigationLayout";
import normalAffix from "../studyReact/Affix/normalAffix";
import IndexView from "../../../configs/IndexView";
import normalAutoComplete from "../studyReact/AutoComplete/normalAutoComplete";


const SubMenu = Menu.SubMenu;

let textLine=[{title:"Breadcrumb",subMenu:[{title:"normalBreadCrumb",subMenu:[]}, {title:"photoBreadCrumb",subMenu:[]},{title:"myPhotoBreadCrumb",subMenu:[]}]}
    ,{title:"Dropdown",subMenu:[{title:"simpleDropdown",subMenu:[]}]}
    ,{title:"Layout",subMenu:[{title:"normalLayout",subMenu:[]},{title:"navigationLayout",subMenu:[]},{title:"navigationWithSliderMenu",subMenu:[]}
    ,{title:"navigationInnerSliderMenu",subMenu:[]},{title:"navigationSliderMenus",subMenu:[]},{title:"navigationTopMenu",subMenu:[]},{title:"horizontalMenu",subMenu:[]}]}
    ,{title:"Affix",subMenu:[{title:"normalAffix",subMenu:[]}]},{title:"Pagination",subMenu:[{title:"normalPagination",subMenu:[]}]}
    ,{title:"Steps",subMenu:[{title:"normalSteps",subMenu:[]},{title:"progressSteps",subMenu:[]}]}
    ,{title:"AutoComplete",subMenu:[{title:"normalAutoComplete",subMenu:[]}]}
    ];

 class MenuSelects extends React.Component {
    state = {
        collapsed: false,
        theme: 'dark',
    }
     goBack=()=>{
        if(this.props.goBack){
            this.props.goBack();
        }else {
            this.props.history.push("/");
        }
     }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    changeTheme = (value) => {
        this.setState({
            theme: value ? 'light' : 'dark',
        });
    }
    getMenus=(Menus)=>{

         return  Menus.map((item)=>item.subMenu>0?<SubMenu key={item.title} title={item.title}>
             getMenus(Menus.subMenu)
         </SubMenu>: <Menu.Item key={item.title} >
             <span>{item.title}</span>
         </Menu.Item>)
    };
    selectPage=(info)=>{
        if(this.props.selectPage){
            this.props.selectPage("/"+info.key)
            return;
        }
        this.props.history.push("/"+info.key)
    };
    render() {
        let   {selectedKey,openKey}=this.props;
        console.log("我的组件加载数据",textLine,selectedKey,openKey);
        return (
            <div>
                <BackTop />
                <div style={{ width: 256 }}>
                    <Menu
                        defaultSelectedKeys={[selectedKey?selectedKey:""]}
                        defaultOpenKeys={[openKey?openKey:""]}
                        mode="inline"
                        theme={this.state.theme}
                        onClick={this.selectPage}
                        inlineCollapsed={this.state.collapsed}
                    >
                        {textLine.map((item)=>
                            <SubMenu key={item.title} title={item.title}>
                                {this.getMenus(item.subMenu)}
                             </SubMenu>
                        )}
                    </Menu>
                    <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </Button>
                    <span className="ant-divider" style={{ margin: '0 1em' }} />
                    <Switch onChange={this.changeTheme} style={{marginLeft:45}} /> 改变主题
                    <Button  onClick={this.goBack} style={{ marginBottom: 16 ,marginLeft:50}}>
                         返回
                    </Button>
                </div>
            </div>
        );
    }
}
export default MenuSelects;





