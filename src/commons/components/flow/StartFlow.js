/**
 * Created by liusonglin on 2018/7/16.
 */

import React from 'react';
import {Button, Card, Checkbox,Select, Col, Input, message, Modal, Radio,Spin} from 'antd';
import httpUtils from "../../utils/FeatchUtils";
import AnyOneSelected from './AnyOneSelected';
import PropTypes from 'prop-types';
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const flowStartUri='/flow-service/defaultFlowBase/startFlowNew'

class StartFlow extends React.Component {
    businessKey = null;

    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false,
            visible: false,
            solidifyFlow: false,
            flowDefinationId: null,
            flowTypeList: [],
            nodeInfoList: [],
            selectedType: [],
            loadings:false,
            executorUserMap: new Map(),
            instancyStatusMap: new Map(),
            remark: ""
        }
    }

    startFlow(url, businessKey, businessModelCode) {
        this.setState({
            confirmLoading: true,
        });
        let params = {};
        params.businessKey=businessKey;
        params.businessModelCode=businessModelCode;
        httpUtils.postJson(url, params).then(res => {
            if (res.success) {
                if (res.data.nodeInfoList && res.data.nodeInfoList.length !== 0) {
                    let executorUserMap = new Map();
                    res.data.nodeInfoList.map(node=>{
                        if((node.executorSet||[]).length===1){
                            executorUserMap.set(node.id,node.executorSet[0].id)
                        }
                        if(node.flowTaskType.toLowerCase()==='pooltask'){
                            executorUserMap.set(node.id,null)
                        }
                    })
                    this.setState({
                        visible: true,
                        flowDefinationId: res.data.flowDefinationId,
                        solidifyFlow: res.data.solidifyFlow,//固化流程
                        flowTypeList: res.data.flowTypeList,
                        selectedType: res.data.flowTypeList[0],
                        executorUserMap: executorUserMap,
                        nodeInfoList: res.data.nodeInfoList
                    })
                } else {
                    message.warn(seiIntl.get({key: 'gwmBdm_000125', desc: '该条目未找到相应的流程类型，请检查流程配置'}))
                }
            } else {
                message.warn(res.message)
            }
            this.setState({
                confirmLoading: false,
            });
        }).catch(err => {
            message.error(err.messageCode)
            this.setState({
                confirmLoading: false,
            });
            this.callBack(err)
        })
    }

    callBack = (res) => {
        if (this.props.callBack) {
            this.props.callBack(res)
        }
    }

    okHandle = () => {
        if (this.props.beforeOkHand) {
            this.props.beforeOkHand().then(res => {
                this.startFunc();
            })
        } else {
            this.startFunc();
        }
    }
//跳转到固化流程页面，并关闭前一个页面
    toConfigPage = (flowDefinationId) => {
        const url = "/flow-web";
        //附加说明
        const remark = this.state.remark;
        localStorage.setItem("remark", remark);
        //待跳转页签信息
        let tab = {
            title: seiIntl.get({key: 'gwmBdm_000126', desc: '配置执行人'}),
            url: url + "/design/configUser?id=" + flowDefinationId,
            id: flowDefinationId + "_configUser"
        };
        this.setState({visible: false});
        let tempData = {};
        tempData.url = flowStartUri;
        tempData.businessId = this.props.businessKey;
        tempData.businessModelCode = this.props.businessModelCode;
        tempData.data = {...this.state};
        tempData.afterSubmit = this.callBack;
        // if (window.top.homeView) {
        //     //获取当前页签信息
        //     const $iframe = $(window.frameElement);
        //     const title = $iframe.parents(".ux-tab-content")
        //         .prev(".ux-tab-header")
        //         .find("li[tabid='" + $iframe[0].id + "']")
        //         .attr("title");
        //     const originStartTab = {
        //         title: title,
        //         url: window.location.href,
        //         id: $iframe.attr("id")
        //     };
        //     localStorage.setItem("originStartTab", JSON.stringify(originStartTab));
        //     window.top.flowStart = tempData;
        //     window.top.homeView.addTab(tab);
        //     window.top.homeView.getTabPanel().close(originStartTab.id);
        // } else {
            window.flowStart = tempData;
            window.open(tab.url);
        // }
    }
    startFunc = () => {
        if (this.state.solidifyFlow) {//固化流程
            this.toConfigPage(this.state.flowDefinationId);
            return;
        }
        this.setState({
            confirmLoading: true,
        });
        let params = {};
        let taskList = [];

        this.state.nodeInfoList.forEach(item => {
            let selectUser = this.state.executorUserMap.get(item.id);
            let instancyStatus = this.state.instancyStatusMap.get(item.id)||false;
            taskList.push({
                nodeId: item.id,
                userVarName: item.userVarName,
                flowTaskType: item.flowTaskType,
                instancyStatus: instancyStatus,
                userIds: selectUser instanceof Array ? selectUser.toString() : selectUser,
            });
        });
        //附加说明
        let {flowDefKey,id} = this.state.selectedType;
        const remark = this.state.remark;
        params.businessKey=this.props.businessKey || this.businessKey;
        params.businessModelCode=this.props.businessModelCode;
        params.taskList=JSON.stringify(taskList);
        params.flowDefKey=flowDefKey
        params.typeId=id
        params.opinion=remark;//附加说明
        httpUtils.postJson(flowStartUri,params).then(res => {
            if (res.success) {
                message.success(seiIntl.get({key: 'gwmBdm_000127', desc: '提交审核成功'}));
            } else {
                message.error(res.message);
            }
            this.callBack(res)
            this.handleModalVisible();
        })
    }

    onChange = (e,nodeId) => {
        let executorUserId = e.target ? e.target.value : e;
        let executorUserMap = this.state.executorUserMap;
        executorUserMap.set(nodeId,executorUserId);
        this.setState({executorUserMap});
    }

    handleModalVisible = () => {
        this.setState({visible: false, confirmLoading: false})
    }

    handleApprove = () => {
        if (this.props.preStart) {
            this.props.preStart().then(result => {
                if (result) {
                    if (this.props.businessKey) {
                        this.startFlow(flowStartUri, this.props.businessKey, this.props.businessModelCode)
                    } else if (result !== true) {
                        this.businessKey = result
                        this.startFlow(flowStartUri, result, this.props.businessModelCode)
                    } else {
                        message.error(seiIntl.get({key: 'gwmBdm_000128', desc: '请选择单据提交审核'}));
                    }
                }
            })
        } else if (this.props.businessKey) {
            this.startFlow(flowStartUri, this.props.businessKey, this.props.businessModelCode)
        } else {
            message.error(seiIntl.get({key: 'gwmBdm_000128', desc: '请选择单据提交审核'}));
        }
    }
    handleRemarkChange = (e) => {
        this.setState({remark: e.target.value});
    }

    getButtonByStyle=()=>{
        if(this.props.linkStyle){
            return <a style={this.props.style} disabled={this.props.disabled}
            onClick={this.handleApprove}>{seiIntl.get({key: 'gwmBdm_000129', desc: '提交审核'})}</a>
        }
        return <Button style={this.props.style} type={this.props.type||""} loading={this.state.confirmLoading} disabled={this.props.disabled}
        onClick={this.handleApprove}>{seiIntl.get({key: 'gwmBdm_000129', desc: '提交审核'})}</Button>
    }

    handleChange=(val)=>{
        let params ={
            businessKey:this.props.businessKey,
            businessModelCode:this.props.businessModelCode,
            typeId:val
        }
        this.setState({loadings:true});
        httpUtils.postJson(flowStartUri, params).then(res => {
            if (res.success) {
                if (res.data.nodeInfoList && res.data.nodeInfoList.length !== 0) {
                    let executorUserMap = new Map();
                    res.data.nodeInfoList.map(node=>{
                        if((node.executorSet||[]).length===1){
                            executorUserMap.set(node.id,node.executorSet[0].id)
                        }
                        if(node.flowTaskType.toLowerCase()==='pooltask'){
                            executorUserMap.set(node.id,null)
                        }
                    })
                    this.setState({
                        visible: true,
                        flowDefinationId: res.data.flowDefinationId,
                        solidifyFlow: res.data.solidifyFlow,//固化流程
                        selectedType: res.data.flowTypeList[0],
                        executorUserMap: executorUserMap,
                        nodeInfoList: res.data.nodeInfoList
                    })
                } else {
                    message.error(seiIntl.get({key: 'gwmBdm_000125', desc: '该条目未找到相应的流程类型，请检查流程配置'}))
                }
            } else {
                message.error(res.message)
            }
        }).catch(err => {
            message.error(err.messageCode)
            this.setState({
                confirmLoading: false,
            });
            this.callBack(err)
        }).finally(()=>{
            this.setState({loadings:false});
        })
    }

    userInfoSpan=(user)=>{
        return (
            <>
            <span>{seiIntl.get({key: 'gwmBdm_000109', desc: '姓名：'})}</span>
            <span style={{marginRight:'8px'}}>{`${user.name}【${user.code}】`}</span>
            <span>{seiIntl.get({key: 'gwmBdm_000110', desc: '组织机构：'})}</span>
            <span style={{marginRight:'8px'}}>{user.organizationName}</span>
            <span>{seiIntl.get({key: 'gwmBdm_000111', desc: '岗位：'})}</span>
            <span style={{marginRight:'8px'}}>{user.positionName}</span>
            </>
        )
    }

    getTitle=(node)=>{
        const {name=seiIntl.get({key: 'gwmBdm_000112', desc: '流程任务'}),flowTaskType,allowChooseInstancy,id}=node;
        let tempTitle = []
        if(flowTaskType===null || flowTaskType===undefined){
            return '';
        }
        switch (flowTaskType.toLowerCase()) {
            case 'common':tempTitle=[`${name}${seiIntl.get({key: 'gwmBdm_000113', desc: '-【普通任务】'})}`];break;
            case 'singlesign':tempTitle=[`${name}${seiIntl.get({key: 'gwmBdm_000114', desc: '-【单签任务】'})}`];break;
            case 'countersign':tempTitle=[`${name}${seiIntl.get({key: 'gwmBdm_000115', desc: '-【会签任务】'})}`];break;
            case 'approve':tempTitle=[`${name}${seiIntl.get({key: 'gwmBdm_000116', desc: '-【审批任务】'})}`];break;
            case 'paralleltask':tempTitle=[`${name}${seiIntl.get({key: 'gwmBdm_000117', desc: '-【并行任务】'})}`];break;
            case 'serialtask':tempTitle=[`${name}${seiIntl.get({key: 'gwmBdm_000118', desc: '-【串行任务】'})}`];break;
            case 'receivetask':tempTitle=[`${name}${seiIntl.get({key: 'gwmBdm_000119', desc: '-【接收任务】'})}`];break;
            case 'servicetask':tempTitle=[`${name}${seiIntl.get({key: 'gwmBdm_000120', desc: '-【服务任务】'})}`];break;
            case 'pooltask':tempTitle=[`${name}${seiIntl.get({key: 'gwmBdm_000121', desc: '-【工作池任务】'})}`];break;
            default:tempTitle=[`${name}${seiIntl.get({key: 'gwmBdm_000113', desc: '-【普通任务】'})}`];break;
        }
        if(allowChooseInstancy){
            tempTitle.push(<Checkbox key={'instancy'} style={{marginRight:'8px'}} value={true} 
            onClick={(e)=>this.instancyClick(e,id)}>{seiIntl.get({key: 'gwmBdm_000122', desc: '紧急'})}</Checkbox>)
        }
        return tempTitle;
    }

    instancyClick=(e,id)=>{
        let instancyStatusMap = this.state.instancyStatusMap
        instancyStatusMap.set(id,e.target.checked)
        this.setState({instancyStatusMap})
    }


    render() {
        let styleStr = {display: "flex", justifyContent: "center", color: "#ed2727", fontSize: 15};
        const {solidifyFlow,flowTypeList ,selectedType} = this.state;
        const options = flowTypeList.map(type=>(<Select.Option key={type.id} value={type.id}>{type.name}</Select.Option>))
        return (
            <span>
                {this.getButtonByStyle()}
                <Modal
                    title={selectedType.flowDefName}
                    bodyStyle={{height: 430, maxHeight: 430,padding: 10,overflow:'auto'}}
                    width={this.state.nodeInfoList[0] && this.state.nodeInfoList[0].uiUserType === 'AnyOne' ? 1040 : 680}
                    visible={this.state.visible}
                    okText={solidifyFlow ? seiIntl.get({key: 'gwmBdm_000126', desc: '配置执行人'}) : seiIntl.get({key: 'gwmBdm_000092', desc: '确定'})}
                    onOk={this.okHandle}
                    onCancel={this.handleModalVisible}
                    okButtonProps={{
                        style:{marginRight:'8px'},
                        disabled: !solidifyFlow && !(this.state.nodeInfoList.length===this.state.executorUserMap.size),
                        type: !solidifyFlow && !(this.state.nodeInfoList.length===this.state.executorUserMap.size)? "default" : "primary"
                    }}
                    confirmLoading={this.state.confirmLoading}
                    centered
                    maskClosable={false}
                >
                <Spin tip={seiIntl.get({key: 'gwmBdm_000130', desc: '加载中...'})} spinning={this.state.loadings} wrapperClassName={"spin"}>
                <div>
                    <span style={{marginRight:'8px'}}>{seiIntl.get({key: 'gwmBdm_000131', desc: '选择流程类型'})}:</span>
                    <Select value={selectedType.id} onChange={this.handleChange} style={{ width: 200 }}>
                        {options}
                    </Select>
                </div>
                {this.state.nodeInfoList.map(node => (
                     <Card
                     key={node.id}
                     style={{marginTop: "10px"}}
                     title={this.getTitle(node)}
                     size={"small"}
                     headStyle={{background: "#eee"}}
                     bodyStyle={{padding: 0,overflow:'auto'}}
                    >
                        {
                            node.flowTaskType.toLowerCase()==='pooltask'?
                            <span style={{marginLeft:'10px'}}><b>{seiIntl.get({key: 'gwmBdm_000124', desc: '工作池任务不用选择执行人'})}</b></span>:(
                            this.state.solidifyFlow ? (
                                    <div id='solidifyFlowTip' style={styleStr}>
                                        {seiIntl.get({key: 'gwmBdm_000132', desc: '温馨提示：请点击【配置执行人】按钮,为固化流程各节点配置执行人'})}
                                    </div>
                                ) :
                                node && node.uiUserType === 'AnyOne' ?
                                    <AnyOneSelected type={node.uiUserType} selectChange={(rowIds)=>this.onChange(rowIds,node.id)}/>
                                    : (node && node.uiType === 'checkbox' ?
                                    <CheckboxGroup key={`${node}_CheckboxGroup`} value={this.state.executorUserMap.get(node.id)} onChange={(e)=>this.onChange(e,node.id)}>
                                        {node && node.executorSet
                                        && node.executorSet.map(item =>
                                            <Col key={item.id} span={24}>
                                                <Checkbox value={item.id}>{this.userInfoSpan(item)}</Checkbox></Col>
                                        )
                                        }
                                    </CheckboxGroup>
                                    :
                                    <RadioGroup key={`${node}_RadioGroup`} value={this.state.executorUserMap.get(node.id)} onChange={(e)=>this.onChange(e,node.id)}>
                                        {node && node.executorSet
                                        && node.executorSet.map(item =>
                                            <Col key={item.id} span={24}><Radio value={item.id}>{this.userInfoSpan(item)}
                                            </Radio></Col>)}
                                    </RadioGroup>)
                            )}
                        </Card>
                    ))}
                    <Card
                        style={{marginTop: "10px"}}
                        title={seiIntl.get({key: 'gwmBdm_000133', desc: '附加说明'})}
                        size={"small"}
                        headStyle={{background: "#eee"}}
                        bodyStyle={{padding: 0,overflow:'auto'}}>
                            <Input.TextArea
                                style={{border: "none"}}
                                rows= {3}
                                placeholder={seiIntl.get({key: 'gwmBdm_000134', desc: '请填写附加说明'})}
                                value={this.state.remark}
                                onChange={this.handleRemarkChange}
                            />
                    </Card>
                </Spin>
                </Modal>
            </span>
        )
    }
}

StartFlow.propTypes = {
    flowDefKey: PropTypes.string,
    callBack: PropTypes.func,
    businessKey: PropTypes.any,
    businessModelCode: PropTypes.string.isRequired,
    beforeOkHand: PropTypes.func
}

export default StartFlow;
