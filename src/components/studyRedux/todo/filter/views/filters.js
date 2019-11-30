import React from 'react';
import Link from './link.js';
import {FilterTypes} from '../../constants.js'
import {Tabs} from "antd";
import './style.css';
import {setFilter} from "../reducer/actions";
import {connect} from "react-redux";
const { TabPane } = Tabs;

const Filters = ({filterKey,setFilterValue}) => {
  function setFilterValueOwn(key){
      setFilterValue(key);
  }
  return (
      <Tabs onChange={setFilterValueOwn} type="card" activeKey={filterKey}>
          <TabPane tab={FilterTypes.ALL} key={FilterTypes.ALL}>
          </TabPane>
          <TabPane tab={FilterTypes.COMPLETED} key={FilterTypes.COMPLETED}>
          </TabPane>
          <TabPane tab={FilterTypes.UNCOMPLETED} key={FilterTypes.UNCOMPLETED}>
          </TabPane>
      </Tabs>
  );
};

const mapStateToProps = (state, ownProps) => {
    return {
        filterKey: state.filter,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    setFilterValue: (key) => {
        dispatch(setFilter(key));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
