/**
 * Created by liusonglin on 2018/7/16.
 */

import React from 'react';
import {Card, Checkbox, Col, Modal, Radio} from 'antd';
import {isEmpty,isEqual} from 'lodash';
import AnyOneSelected from './AnyOneSelected';
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

function getDefualtReuslt(nodes){
    return nodes.map(node=>{
        let defaultValue = null;
        if((node.executorSet||[]).length===1){
            defaultValue=node.executorSet[0].id;
        }
        return {
            nodeId:node.id,
            instancy:false,
            flowTaskType:node.flowTaskType,
            userIds:defaultValue
        }
    })
}
class UserChoose extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            confirmLoading:false,
            chooseResult:getDefualtReuslt(props.nextNode)
        }
    }

    componentWillReceiveProps(nextProps){
        if(!isEqual(nextProps.nextNode,this.props.nextNode)){
            this.setState({chooseResult:getDefualtReuslt(nextProps.nextNode)})
        }
    }

    instancyClick=(e,id)=>{
        let chooseResult = this.state.chooseResult
        chooseResult.map(result=>{
            if(result.id=id){
                result.instancy=e.target.checked;
            }
        })
        this.setState({chooseResult})
    }

    handleCancel=()=>{
        this.props.closeModal();
    }

    onChange = (e,nodeId) => {
        let chooseResult = this.state.chooseResult
        let val = e.target ? e.target.value : e;
        chooseResult.map(result=>{
            if(result.id=nodeId){
                result.userIds=val.toString();
            }
        });
        this.setState({chooseResult})
    }

    isChoosed=()=>{
        let chooseResult = this.state.chooseResult
        return isEmpty(chooseResult.filter(result=>{
            if(result.flowTaskType==='poolTask'){
                result.userIds='';
                return true;
            }
            return result.userIds && result.userIds!=='';
        }));
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

    okHandle=()=>{
        this.setState({confirmLoading:true})
        this.props.completeTask(this.state.chooseResult,false,(val)=>this.setState({confirmLoading:val}));
    }

    getTitle=(node)=>{
        const {name=seiIntl.get({key: 'gwmBdm_000112', desc: '流程任务'}),flowTaskType,allowChooseInstancy,id}=node;
        let tempTitle = []
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

    render() {
        let chooseResult = this.state.chooseResult
        const {uiUserType,visible,nextNode=[]} = this.props
        return (
            <Modal
                    title={seiIntl.get({key: 'gwmBdm_000123', desc: '选择下一步执行人'})}
                    bodyStyle={{height: 430, maxHeight: 430,padding: 10,overflow:'auto'}}
                    width={uiUserType === 'AnyOne' ? 1040 : 680}
                    visible={visible}
                    onOk={this.okHandle}
                    onCancel={this.handleCancel}
                    confirmLoading={this.props.confirmLoading}
                    okButtonProps={{
                        disabled: this.isChoosed(),
                    }}
                    centered
                    maskClosable={false}
                >

            {nextNode && nextNode.map(node => {
                return (
                 <Card
                 key={node.id}
                 style={{marginTop: "10px"}}
                 title={this.getTitle(node)}
                 size={"small"}
                 headStyle={{background: "#eee"}}
                 bodyStyle={{padding: 0,overflow:'auto'}}
                >{
                    node.flowTaskType.toLowerCase()==='pooltask'?
                    <span style={{marginLeft:'10px'}}><b>{seiIntl.get({key: 'gwmBdm_000124', desc: '工作池任务不用选择执行人'})}</b></span>
                    :
                    node && node.uiUserType === 'AnyOne' ?
                    <AnyOneSelected type={node.uiUserType} selectChange={(rowIds)=>this.onChange(rowIds,node.id)}/>:(
                    node.uiType === 'checkbox' ?
                        <CheckboxGroup value={chooseResult.filter(item=>item.nodeId===node.id)[0].userIds} onChange={(e)=>this.onChange(e,node.id)}>
                            {node.executorSet.map(item =>
                                    <Col key={item.id} span={24}>
                                        <Checkbox value={item.id}>{this.userInfoSpan(item)}</Checkbox>
                                    </Col>)
                            }
                        </CheckboxGroup>
                        :
                        <RadioGroup value={chooseResult.filter(item=>item.nodeId===node.id)[0].userIds} onChange={(e)=>this.onChange(e,node.id)}>
                            {node.executorSet.map(item =>
                                <Col key={item.id} span={24}>
                                    <Radio value={item.id}>{this.userInfoSpan(item)}</Radio>
                                </Col>)
                            }
                        </RadioGroup>
                        )
                    }
                </Card>)
            })}
            </Modal>
        )
    }
}

UserChoose.propTypes = {

}

export default UserChoose;
