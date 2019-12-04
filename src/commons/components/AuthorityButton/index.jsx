import React, { Component } from 'react';
import { Button } from 'antd';

export default class AuthorityButton extends Component {

  checkAuth = () => {
    const { operateAuthority, operateCode } = this.props;

    if (operateAuthority === 'admin' || (Array.isArray(operateAuthority) && operateAuthority.includes(operateCode)))
    {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { operateAuthority, operateCode, value, ...rest } = this.props;
    return (
      <span>
        {this.checkAuth() ? (<Button {...rest}>{value}</Button>) : (null)}
      </span>
    );
  }
}
