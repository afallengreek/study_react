import React, { Component } from 'react';
import './App.css';
import Router from "./configs/Router";
import {Spin} from "antd";
import {connect} from "react-redux";

class App extends Component {
  render() {
    return (
        <Spin tip="加载中..." spinning={this.props.loadings} wrapperClassName={"spin"}>
            <Router/>
        </Spin>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        loadings: state.SharedReducer.loadings
    }
}

export default connect(
    mapStateToProps
)(App);
