import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import asyncComponent from "../../utils/AsyncComponent";
// import ModalDialog from "../../components/ModalDialog";
// import Loading from "../../components/Loading";
// import {
//   actions as appActions,
//   getError,
//   getRequestQuantity
// } from "../../redux/modules/app";
import connectRoute from "../../utils/connectRoute";
import {Spin,Progress} from "antd";
import {inject, observer} from "mobx-react/index";
import MobxHoc from "../../stores/MobxHoc";

const AsyncHome = connectRoute(asyncComponent(() => import("../Home")));
const AsyncLogin = connectRoute(asyncComponent(() => import("../Login")));
@inject("appStore")
@observer
class App extends Component {
  state={
      percent:0,
  };
  render() {
    let {isLoading,percent} = this.props.appStore;
    return (
            <Spin
                tip={<Progress type="circle" percent={percent} />}
                spinning={isLoading}
                wrapperClassName={"spin"}
            >
                    <Route exact path="/mobxProject" component={AsyncHome} />
                    <Route path="/mobxProject/login" component={AsyncLogin} />
                    <Route path="/mobxProject/posts" component={AsyncHome} />
            </Spin>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {}
  // return {
  //   error: getError(state),
  //   requestQuantity: getRequestQuantity(state)
  // };
};

const mapDispatchToProps = dispatch => {
    return {}
  // return {
  //   ...bindActionCreators(appActions, dispatch)
  // };
};

App =  connect(mapStateToProps, mapDispatchToProps)(App);
export default App = MobxHoc(App)

