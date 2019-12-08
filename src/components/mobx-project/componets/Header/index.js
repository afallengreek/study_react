import React, { Component } from "react";
import {Link, withRouter} from "react-router-dom";
import { inject, observer } from "mobx-react";
import {PageHeader,Button} from "antd";

@inject("authStore")
@observer
class Header extends Component {
  render() {
    const { authStore, location } = this.props;
    return (
      <div className="header">
          <PageHeader
              style={{
                  border: '1px solid rgb(235, 237, 240)',
              }}
              backIcon={false}
              title={<Link to="/mobxProject"  onClick={()=>{setTimeout(()=>window.location.reload(),100);}}>首页</Link>}
              subTitle="模仿BBC论坛"
              extra={ authStore.userId && authStore.userId.length > 0 ? (
                  <span className="user">
              当前用户：{authStore.username}&nbsp;<a onClick={authStore.logout} style={{marginLeft:"6px"}}>
                注销
              </a>
            </span>
              ) : (
            <span className="right-link">
              <Link to={{ pathname: "/mobxProject/login", state: { from: location } }}
                    onClick={()=>{setTimeout(()=>window.location.reload(),100);}}>
                登录
              </Link>
            </span>
              )}
          />
        </div>
    );
  }
}

export default withRouter(Header);
