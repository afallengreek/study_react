import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';

class CheckAuth extends Component {

  checkAuth = () => {
    const { operateCode } = this.props;
    const { operateAuthority } = this.context;

    if (operateAuthority === 'admin' || (Array.isArray(operateAuthority) && operateAuthority.includes(operateCode)))
    {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { children } = this.props;
    return (
      <Fragment>
        {this.checkAuth() ? (children) : (null)}
      </Fragment>
    );
  }
}

CheckAuth.contextTypes = {
  operateAuthority: propTypes.any
};

export default CheckAuth;
