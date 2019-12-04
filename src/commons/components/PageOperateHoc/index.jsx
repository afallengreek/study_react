import React, { Component, Fragment } from 'react';
import { message, Spin } from 'antd';
import propTypes from 'prop-types';
import { checkAuth } from './api.js';
import { Redirect } from 'react-router-dom'
import { getUserInfo } from "../../utils/CommonUtils";
import ExceptionPage from '../../../commons/components/ExceptionPage/index.jsx';
import { checkOperateAuth } from '../../../commons/utils/CommonUtils.js';

const PageOperateHoc = WrappedComponent => {
  return class extends Component {

    static childContextTypes = {
      operateAuthority: propTypes.any
    }

    getChildContext() {
      return {
        operateAuthority: this.operateAuthority
      };
    }

    operateAuthority = []

    state = {
      componentType: 'londing'
    }

    componentDidMount() {
      const { history } = this.props;
      const userInfo = getUserInfo() || {};
      const {sessionId="", accessToken=""} = userInfo;

      checkAuth({
        sessionId,
        accessToken,
        url: history.location.pathname,
        appCode: process.env.REACT_APP_MODULE_NAME
      })
      .then(res => {
        const { statusCode, data } = res;
        let componentType = statusCode;
        if (statusCode === 200 && data && data.length) {
          const [sessionUser, featureSet=[]] = data;
          if (sessionUser.authorityPolicy === "NormalUser") {
            this.operateAuthority = featureSet;
          } else {
            this.operateAuthority = 'admin';
          }
        }
        this.setState({
          componentType
        });
      })
      .catch(err => {
        this.setState({
          componentType: '500'
        });
      })
    }

    checkOperateAuth = (operateCode) => {
      return checkOperateAuth(this.operateAuthority, operateCode);
    }

    getRenderComponent = (type) => {
      const components = {
        "loading": (<Spin spinning={true}></Spin>),
        // "401": (<Redirect to={"/login"}/>),
        "401": (<WrappedComponent operateAuthority={this.operateAuthority} checkOperateAuth={this.checkOperateAuth} {...this.props}></WrappedComponent>),
        "403": (<ExceptionPage type="403"/>),
        "200": (<WrappedComponent operateAuthority={this.operateAuthority} checkOperateAuth={this.checkOperateAuth} {...this.props}></WrappedComponent>),
        "500": (<ExceptionPage type="500"/>)
      };

      return components[type];
    }

    getChildren = () => {
      const { componentType } = this.state;
      return this.getRenderComponent(componentType);
    }

    render() {
      return (
        <Fragment>
          {this.getChildren()}
        </Fragment>
      );
    }
  }
}

export default PageOperateHoc;
