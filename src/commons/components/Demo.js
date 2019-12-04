/**
 * @description demo
 * @author 李艳
 * @date 2018.1.06
 */

import React, {Component} from 'react';
import httpUtils from "../utils/FeatchUtils";
import {cache} from "../utils/CommonUtils";
import {Button, Form, Menu, Select,Row} from "antd";
import StandardDropdown from "./StandardDropdown";
import {InputNumberItem, SearchTableItem} from "./StandardFormItems";
import {listProfitCenterConfig} from "../../configs/CommonComponentsConfig";
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
const SubMenu = Menu.SubMenu;
const Option = Select.Option;

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      treeData: []
    };

  }

  componentWillMount() {
    this.getTreeData()
  }

  getTreeData = (param) => {

  };
  buttons = () => {
    return [
      <Button>button1</Button>,
      <Button>button2</Button>,
      <Button>button3</Button>,
      <Button>button4</Button>,
      <Button>button5</Button>,
      <Button>button6</Button>,
      <Button>button7</Button>,
      <Button>button8</Button>
    ];
  };

  render() {
    const col = [
      {name: '姓名', dataIndex: 'name', key: 'name'},
      {name: '年龄', dataIndex: 'age', key: 'age'}];
    let form = this.props.form;
    return (
      <div >
        <Row>
          <InputNumberItem
              name={seiIntl.get({key: 'gwmBdm_000198', desc: '数字'})}
              code="number1"
              form={form}
          />
          <InputNumberItem
              name={seiIntl.get({key: 'gwmBdm_000199', desc: '事例'})}
              code="example"
              form={form}
          />
          <InputNumberItem
              name={seiIntl.get({key: 'gwmBdm_000200', desc: '数字2'})}
              code="number2"
              form={form}
          />
          <InputNumberItem
              name={seiIntl.get({key: 'gwmBdm_000201', desc: '数字3'})}
              code="number3"
              initialvalue={2}
              form={form}
          />
          <SearchTableItem
              formItemLayout={{
                  labelCol: {span: 12},
                  wrapperCol: {span: 12}}}
              name={seiIntl.get({key: 'gwmBdm_000202', desc: '数字4'})}
              code="number4"
               initialvalue={""}
               textValue=""
              config={listProfitCenterConfig}
              span={10}
              form={form}
          />
        </Row>
        {/*<SimpleTable*/}
        {/*rowKey={'name'}*/}
        {/*columns={col}*/}
        {/*data={this.state.tableData}/>*/}
      }
      </div>
    );
  }
}


export default (Form.create()(Demo))
