/**
 * @description 添加借款人弹窗
 * @author 李艳
 */

import React, {Component} from 'react'
import { convertSearchFilter } from '../../../commons/utils/CommonUtils.js';
import TransferTable from "../../../commons/components/TransferTable";
import { searchListByKey } from "../../../commons/utils/CommonUtils.js";
import {defaultPageSize} from "../../../configs/DefaultConfig";
import {listAllOrgs,listAllUserByOrgId} from './service';
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
class AnyOneSelected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftData: null,
            rightData: null,
            orgId:null
        };
    }

    //删除分配,设置左右表格的值
    handleLeftClick = async (rows, rightData) => {
        let right = [];
        //获取已分配的数组
        for (let data of rightData) {
            if (rows.findIndex(item => item.id === data.id) > -1) {
                continue;
            }
            right.push(data);
        }
        this.setState({rightData: right})

    }

    //插入分配,设置左右表格的值
    handleRightClick = async (rows, rightData) => {
        let right = [];
        if(this.props.type!=='checkbox'){
            right = rows;
        }else{
            for (let i = 0; i < rows.length; i++) {
                right.push(rows[i]);
            }
            //获取已分配的数组
            for (let data of rightData) {
                if (rows.findIndex(item => item.id === data.id) > -1) {
                    continue;
                }
                right.push(data);
            }
        }
        this.setState({rightData: right})
        if(this.props.selectChange){
            this.props.selectChange(right.map(row=>row.id))
        }
    };

    leftService = async (params) => {
        let result = null;
        await listAllUserByOrgId(this.state.orgId).then((res) => {
            result = res.data;
        });
        return result;
    };

    rightService = async () => {
        return this.state.rightData;
    };

    listAllOrgsConfig={
        props:{initValue:true},
        service: listAllOrgs,
        key: 'id',
        text: 'name'
    }

    //左边table的selec选择触发的
    async JointQueryService(key,param2,record) {
        let result = null;
        await listAllUserByOrgId(key).then((res) => {
            this.setState({orgId:key})
            result = res.data
        });
        return result;
    };

    render() {
        const columns = [
			{
			    title: seiIntl.get({key: 'gwmBdm_000192', desc: '代码'}),
			    dataIndex: "code",
			}, {
			    title: seiIntl.get({key: 'gwmBdm_000193', desc: '名称'}),
			    dataIndex: "userName",
			}
		];
        return (
                <TransferTable
                    radio={this.props.type!=='checkbox'}
                    onRef={ref => this.tranfer=ref}
                    style={{background:"#fff"}}
                    handleLeftClick={this.handleLeftClick.bind(this)}
                    handleRightClick={this.handleRightClick.bind(this)}
                    rightService={this.rightService.bind(this)}
                    leftService={this.leftService.bind(this)}
                    JointQueryService={this.JointQueryService.bind(this)}
                    treeSelectConfig={this.listAllOrgsConfig}
                    leftColumns={columns}
                    rightColumns={columns}
                    searchLeftKey={['code','userName']}
                    heightY={250}
                    rightTitle={seiIntl.get({key: 'gwmBdm_000194', desc: '已选择'})}
                    leftTitle={seiIntl.get({key: 'gwmBdm_000195', desc: '所有人员'})}
                />
        );
    }


}

export default AnyOneSelected


