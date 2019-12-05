import React, { Component } from "react";
import {Route, withRouter} from "react-router-dom";
import asyncComponent from "../../utils/AsyncComponent";
import connectRoute from "../../utils/connectRoute";
import Header from "../Header/index";

const AsyncPost = connectRoute(asyncComponent(() => import("../Post")));
const AsyncPostList = connectRoute(asyncComponent(() => import("../PostList")));

class Home extends Component {
  render() {
    const { match, location } = this.props;
    return (
      <div>
        <Header
          location={location}
        />
        <Route
          path={match.url}
          exact
          render={props => <AsyncPostList {...props} />}
        />
        <Route
          path={`${match.url}/:id`}
          render={props =><AsyncPost {...props} />}
        />
      </div>
    );
  }
}

export default withRouter(Home);
