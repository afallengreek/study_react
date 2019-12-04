/**
 * @Description:
 * @Author: CHEHSHUANG
 * @Date: 2019/3/1
 */
import React, {Component} from 'react';
import ToolBar from "../ToolBar";
import {budgetCorporationConfig, budgetTypeConfig} from "../../../../configs/CommonComponentsConfig";
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
class TbarDemo1 extends Component {
    leftCfg = () => {
       const {selectedCorp} = this.state;
       return [
           {
               title: seiIntl.get({key: 'gwmBdm_000074', desc: '新增单据'}),
               props:{
                   onClick: () => {}
               }
           },
           {
               title: seiIntl.get({key: 'gwmBdm_000075', desc: '从模板新增'}),
               type: "uploadFile",
               props:{
                   onClick: () => {}
               }
           },
           {
               type: "form",
               style: {width: 392},
               onSearch:  this.handleSearch,
               formItems: [
                   {
                       label: seiIntl.get({key: 'gwmBdm_000076', desc: '预算公司'}),
                       name: "budgetCorporationId",
                       rules: [{
                           required: true,
                           message: seiIntl.get({key: 'gwmBdm_000077', desc: '预算公司!'}),
                       }],
                       type: "searchTable",
                       props: {
                           config: budgetCorporationConfig
                       }
                   },
                   {
                       label: seiIntl.get({key: 'gwmBdm_000078', desc: '预算类型'}),
                       name: "budgetTypeId",
                       rules: [{
                           required: true,
                           message: seiIntl.get({key: 'gwmBdm_000079', desc: '预算类型!'}),
                       }],
                       type: "searchTable",
                       props: {
                           config: budgetTypeConfig,
                           params: ["budgetCorporationId"]
                       }
                   }
               ]
           }
       ]
   }
    rightCfg = () => {
        return  [
            {
                type: "search",
                props: {
                    style: {width: 250},
                    placeholder: seiIntl.get({key: 'gwmBdm_000080', desc: '输入代码或名称查询'}),
                    allowClear: true,
                    value: this.state.quickValue,
                    onSearch: (v) => this.handleQuickSearch(v),
                    onChange: this.handleQuickValueChange
                }
            }
        ]
    }
    render() {
        return (
            <div>
                <ToolBar
                    leftCfg = { this.leftCfg()}
                    rightCfg={this.rightCfg()}
                />
            </div>
        );
    }
}

export default TbarDemo1;
