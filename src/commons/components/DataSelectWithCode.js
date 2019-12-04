/**
 * @description demo
 * @author 李艳
 * @date 2019.1.06
 */

import React, {PureComponent} from 'react';
import SearchTable from "./SearchTable";
import httpUtils from "../../commons/utils/FeatchUtils";
import {basicUrl} from "../../configs/DefaultConfig";
import {searchListByKey} from "../utils/CommonUtils";
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;

class DataSelectWithCode extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        let {categoryCode,code,onlyShowName}=this.props;
        let config = onlyShowName?dataSelectConfigForName:dataSelectConfig;
        return (
           <SearchTable
               {...this.props}
               config={config}
               params={{categoryCode:categoryCode||code}}
           />
        );
    }
}
//获取对应code下数据字典的值
export async function listAllDataValue(param={}){
    param.isAll = false;
    return httpUtils.get(basicUrl+"/dataDict/getDataDictItems",param);
}
//数据字典公用
export const dataSelectConfig = {
    columns: [{
        title: seiIntl.get({key: 'gwmBdm_000205', desc: '值'}),
        dataIndex: 'code',
        },
        {
            title: seiIntl.get({key: 'gwmBdm_000193', desc: '名称'}),
            dataIndex: 'name',
        },
    ],
    dataService: null,
    searchService: null,
    key: 'code',
    text: 'name'
};
//数据字典公用
export const dataSelectConfigForName = {
    columns: [
        {
            title: seiIntl.get({key: 'gwmBdm_000193', desc: '名称'}),
            dataIndex: 'name',
        },
    ],
    dataService: listAllDataValue,
    searchService: searchListByKey,
    key: 'code',
    text: 'name'
};
export default DataSelectWithCode
