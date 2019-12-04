/**
 * @description 下拉菜单，operator：操作菜单数组，overlay：int类型，表示前overlay个菜单从左至右平铺，
 * 从第表示前overlay个菜单从左至右平铺个过后，显示在下拉菜单内
 * @author 李艳
 * @date 2019.03.11
 */

import React, {Component} from 'react';
import {Menu, Dropdown} from "antd";
import propTypes from 'prop-types';

const SubMenu = Menu.SubMenu;

class StandardDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getVisibleOperaters = () => {
    let visibleOperaters = [];
    const {operator} = this.props;
    if (operator){
      operator.map(item=>{
          //只显示配置了权限和不需要权限的按钮
          if((item.props.operateCode&&this.checkAuth(item.props.operateCode))||!item.props.operateCode){
              visibleOperaters.push(item)
          }
      });
    }
     return visibleOperaters
  };
  getOverFlow = () => {
    let visibleOperaters=this.getVisibleOperaters();
    const {overlay} = this.props;
    let overData = visibleOperaters;
    if (overlay && visibleOperaters.length > overlay) {
      overData = visibleOperaters.slice(0, overlay);
    } else if (!overlay && visibleOperaters.length > 2) {
      overData = visibleOperaters.slice(0, 2);//没配置overlay时默认展开两个item
    }
    return overData
  };

  getMenu = () => {
    let visibleOperaters=this.getVisibleOperaters();
    const {overlay} = this.props;
    let menuData = [];
    if (overlay) {
      menuData = visibleOperaters.slice(overlay, visibleOperaters.length);
    } else {
      menuData = visibleOperaters.slice(2, visibleOperaters.length);
    }

    return menuData.length? <Menu>{menuData.map((item, i) => {
        return <Menu.Item key={"menu" + i}>
            {item}
        </Menu.Item>
    })}</Menu>:null
  };
    checkAuth = (operateCode) => {
        const {operateAuthority} = this.context;

        if (operateAuthority === 'admin' || (Array.isArray(operateAuthority) && operateAuthority.includes(operateCode))) {
            return true;
        } else {
            return false;
        }
    }
  render() {
    return (
      <div style={{textAlign: "left"}}>
        {this.getOverFlow()}
        {this.getMenu() ?
          <Dropdown overlay={this.getMenu()}>
            <a className="ant-dropdown-link">
              ...
            </a>
          </Dropdown> : null}
      </div>
    );
  }
}

StandardDropdown.contextTypes = {
    operateAuthority: propTypes.any
};
export default StandardDropdown
