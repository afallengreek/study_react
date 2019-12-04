/**
 * @description 流程审批组件，
 * @author 刘松林
 * @date 2018.12.31
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeadBreadcrumb from '../breadcrumb/HeadBreadcrumb';
import { Button, Row, Divider, Input, Radio, Timeline, Icon, message, Menu, Dropdown, Modal, Spin } from 'antd';
import DetailCard from '../DetailCard';
import UserChoose from './UserChoose';
import {
  getApprovalHeaderVO, findNextNodes, getProcessTrackVOById, getSelectedNodesInfo, completeTask,
  taskTurnToDo, taskTrustToDo, reject, endTask,taskTrustToReturn
} from './service';
import Scrollbar from 'react-perfect-scrollbar';
import './index.css';
import { mainTabAction } from 'sei-utils';
import { getUserId } from '../../utils/CommonUtils';
import { isEmpty } from 'lodash';
import AnyOneSelected from './AnyOneSelected';
import {Scrollbars} from 'react-custom-scrollbars'
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
const { TextArea } = Input;

const flowMapUri = '/flow-web/design/showLook'
const confirm = Modal.confirm;
class Approve extends Component {

  state = {
    head: {},
    nextNodes: [],
    flowHistoryList: [],
    nextChooseNodes: {},
    approved: false,
    opinion: '',
    chooseUser: false,
    radioFlag: false,
    selectUserModal: false,
    loading: false,
    nextNode: []
  }

  currentClick = '';
  selectedOne = null;



  componentDidMount() {
    if (this.props.taskId) {
      let promiseArr = [getApprovalHeaderVO(this.props.taskId), findNextNodes(this.props.taskId)];
      if (this.props.instanceId) {
        promiseArr.push(getProcessTrackVOById(this.props.instanceId));
      }
      Promise.all(promiseArr).then(res => {
        if (res[1] && res[1] instanceof Array) {
          let radioFlag = res[1].filter(item => item.uiType === 'radiobox').length !== 0
          let flowHistoryList = null;
          if (res[2]) {
            flowHistoryList = res[2][0].flowHistoryList
          }
          this.setState({ head: res[0], nextNodes: res[1], nextChooseNodes: res[1][0], flowHistoryList: flowHistoryList, radioFlag: radioFlag });
        }
      })
    }
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  commonConfirm = (title, okHandle) => {
    confirm({
      title: seiIntl.get({key: 'gwmBdm_000153', desc: '温馨提示'}),
      content: `${seiIntl.get({key: 'gwmBdm_000154', desc: '您确定要{0}吗？'},{0:title})}`,
      onOk: () => {
        okHandle()
      }
    });
  }

  includeNodeIdsStrChange = (e) => {
    this.setState({ nextChooseNodes: this.state.nextNodes.filter(node => node.id === e.target.value)[0] })
  }

  getRaidoGroup = () => {
    return (
      <Radio.Group defaultValue={this.state.nextChooseNodes.id} onChange={this.includeNodeIdsStrChange}>
        {this.state.nextNodes.map(subRadio => <Radio style={{ display: 'block' }} key={subRadio.id} value={subRadio.id}>{subRadio.name}</Radio>)}
      </Radio.Group>
    )
  }

  getSpanGroup = () => {
    return this.state.nextNodes.map(subSpan => (
      <Row key={subSpan.name}>{subSpan.name}</Row>
    ))
  }

  closeModal = () => {
    this.setState({ chooseUser: false })
    if (this.props.onCancel) {
      this.props.onCancel()
    }
  }

  next = async (approved = null) => {
    if (!this.state.opinion || this.state.opinion.trim() === '') {
      if (approved === true) {
        this.state.opinion =seiIntl.get({key: 'gwmBdm_000156', desc: '同意'})
      } else if (approved === false) {
        this.state.opinion =seiIntl.get({key: 'gwmBdm_000157', desc: '不同意'})
      } else {
        message.error(seiIntl.get({key: 'gwmBdm_000158', desc: '请填写处理意见'}))
        return;
      }
    }
    let params = {
      taskId: this.props.taskId,
      solidifyFlow: this.state.head.solidifyFlow,
      approved: approved,
      opinion: this.state.opinion
    }
    if (this.state.radioFlag) {
      params.includeNodeIdsStr = this.state.nextChooseNodes.id;
      params.nextChooseNodes = this.state.nextChooseNodes;
    }
    this.setState({ approved: approved })
    if (this.props.beforeNext) {
      await this.props.beforeNext(params)
    }
    if (!this.props.onRef) {
      this.getNextInfo(params)
    }
  }

  getNextInfo(params) {
    if (!params.opinion || params.opinion.trim() === '') {
      message.error(seiIntl.get({key: 'gwmBdm_000158', desc: '请填写处理意见'}))
      return;
    }
    this.setState({ opinion: params.opinion })
    getSelectedNodesInfo(params).then(res => {
      if (res.status === 'SUCCESS') {
        //会签未结束
        if (res.data === 'CounterSignNotEnd') {
          this.completeTask();
          message.error(seiIntl.get({key: 'gwmBdm_000159', desc: '您的会签任务已完成'}))
          return;
        }
        //流程结束
        if (res.data === 'EndEvent') {
          let thiz = this;
          Modal.confirm({
            title: seiIntl.get({key: 'gwmBdm_000153', desc: '温馨提示'}),
            content: seiIntl.get({key: 'gwmBdm_000160', desc: '审批流完成,您确定要完成单据吗？'}),
            onOk: () => {
              thiz.completeTask(false, '', true);
            },
          });
        } else {//流转到下一步.data
          let nextNode = res.data;
          this.setState({ chooseUser: true, nextNode: nextNode })
        }
      } else {
        message.error(res.message)
      }
    })
  }

  opinionChange = (e) => {
    this.setState({ opinion: e.target.value })
  }

  completeTask = (chooseResult, endEventId = false,callBack) => {
    this.setState({
      loading: true,
    });
    const nextNode = this.state.nextNode
    let taskList
    if (!endEventId && chooseResult) {
      taskList = nextNode.map(node => {
        const result = chooseResult.filter(result => result.nodeId === node.id)[0];
        return {
          nodeId: node.id,
          flowTaskType: node.flowTaskType,
          userIds: result.userIds,
          userVarName: node.userVarName,
          callActivityPath: node.callActivityPath,
          instancyStatus: result.instancy,
          solidifyFlow: this.state.head.solidifyFlow
        }
      })
    }
    let params = {
      taskId: this.props.taskId,
      businessId: this.props.businessId,
      opinion: this.state.opinion,
      taskList: JSON.stringify(taskList),
      endEventId: endEventId,
      manualSelected: this.state.radioFlag,
      approved: this.state.approved,
      loadOverTime: null
    }
    completeTask(params).then(res => {
      if (res.success) {
        message.success(res.message, 2, () => mainTabAction.tabClose(this.props.taskId));
        this.setState({
          loading: false,
          chooseUser: false
        });
      } else {
        message.error(res.message)
        this.setState({
          loading: false,
          chooseUser: false
        });
      }
    }).finally(e=>{
      if(callBack){
        callBack(false)
      }
    })
  }

  goToFlowMap = () => {
    let url = `${window.location.origin}${flowMapUri}?id=${this.props.businessId}&instanceId=${this.props.instanceId}`
    mainTabAction.tabOpen({ id: `flow_map_${this.props.businessId}`, name: seiIntl.get({key: 'gwmBdm_000138', desc: '查看流程'}), featureUrl: url })
  }

  getMenu = () => {
    let head = this.state.head;
    let menuItem = [];
    if (!isEmpty(head)) {
      //是否显示驳回按钮
      let rejectFlag = head.trustState !== 2 && head.canReject;
      var nodeType = JSON.parse(head.taskJsonDef).nodeType;
      //签收
      let claimTaskHtml = nodeType === "SingleSign" && head.trustState !== 2 && !head.actClaimTime
      //转办
      let transferHtml = (nodeType === "Normal" || nodeType === "Approve" || nodeType === "CounterSign") && head.trustState == null && JSON.parse(head.taskJsonDef).nodeConfig.normal.allowTransfer;
      //委托
      let entrustHtml = nodeType === "Approve" && head.trustState === null && JSON.parse(head.taskJsonDef).nodeConfig.normal.allowEntrust;
      //终止
      let endFlowHtml = head.canSuspension && head.trustState !== 2 && head.flowInstanceCreatorId === getUserId();
      if (transferHtml) {
        menuItem.push(<Menu.Item key="turn" onClick={() => {
          this.currentClick =seiIntl.get({key: 'gwmBdm_000161', desc: '转办'});
          this.setState({ selectUserModal: true });
        }}>{seiIntl.get({key: 'gwmBdm_000161', desc: '转办'})}</Menu.Item>)
      }
      if (claimTaskHtml) {
        menuItem.push(<Menu.Item key="sign">{seiIntl.get({key: 'gwmBdm_000162', desc: '签收'})}</Menu.Item>)
      }
      if (entrustHtml) {
        menuItem.push(<Menu.Item key="delegate" onClick={() => {
          this.currentClick =seiIntl.get({key: 'gwmBdm_000163', desc: '委托'});
          this.setState({ selectUserModal: true });
        }}>{seiIntl.get({key: 'gwmBdm_000163', desc: '委托'})}</Menu.Item>)
      }
      if (endFlowHtml && this.props.instanceId) {
        menuItem.push(<Menu.Item key="end" onClick={() => this.commonConfirm(seiIntl.get({key: 'gwmBdm_000164', desc: '终止'}), this.handleEnd)}>{seiIntl.get({key: 'gwmBdm_000164', desc: '终止'})}</Menu.Item>)
      }
      if (rejectFlag) {
        menuItem.push(<Menu.Item key="reject" onClick={() => this.commonConfirm(seiIntl.get({key: 'gwmBdm_000165', desc: '驳回'}), this.handleReject)}>{seiIntl.get({key: 'gwmBdm_000165', desc: '驳回'})}</Menu.Item>)
      }
    }
    return menuItem;
  }

  handleEnd = () => {
    endTask(this.props.instanceId).then(res => {
      if (res.status === 'SUCCESS') {
        message.success(seiIntl.get({key: 'gwmBdm_000166', desc: '流程终止成功'}), 2, () => mainTabAction.tabClose(this.props.taskId))
      } else {
        if (res.message) {
          message.error(res.message)
        } else {
          message.error(seiIntl.get({key: 'gwmBdm_000167', desc: '流程终止失败'}))
        }
      }
    })
  }

  handleReject = () => {
    if (!this.state.opinion || this.state.opinion.trim() === '') {
      message.error(seiIntl.get({key: 'gwmBdm_000158', desc: '请填写处理意见'}))
      return;
    }
    reject(this.props.taskId, this.state.opinion).then(res => {
      if (res.status === 'SUCCESS') {
        message.success(seiIntl.get({key: 'gwmBdm_000168', desc: '流程驳回成功'}), 2, () => mainTabAction.tabClose(this.props.taskId))
      } else {
        if (res.message) {
          message.error(res.message)
        } else {
          message.error(seiIntl.get({key: 'gwmBdm_000169', desc: '流程驳回失败'}))
        }
      }
    })
  }

  delegateApprove=()=>{
    if (!this.state.opinion || this.state.opinion.trim() === '') {
      message.error(seiIntl.get({key: 'gwmBdm_000170', desc: '请填写委托意见'}))
      return;
    }
    taskTrustToReturn(this.props.taskId, this.state.opinion).then(res => {
      if(res.status==='SUCCESS'){
        message.success(seiIntl.get({key: 'gwmBdm_000171', desc: '操作成功!'}), 2, () => mainTabAction.tabClose(this.props.taskId))
      }else {
        if (res.message) {
          message.error(res.message)
        } else {
          message.error(seiIntl.get({key: 'gwmBdm_000169', desc: '流程驳回失败'}))
        }
      }
    })

  }

  okHandle = () => {
    switch (this.currentClick) {
      case seiIntl.get({key: 'gwmBdm_000161', desc: '转办'}):
        taskTurnToDo(this.props.taskId, this.selectedOne.toString()).then(res => {
          if (res.status === 'SUCCESS') {
            message.success(seiIntl.get({key: 'gwmBdm_000172', desc: '流程转办成功'}), 2, () => mainTabAction.tabClose(this.props.taskId))
          } else {
            if (res.message) {
              message.error(res.message)
            } else {
              message.error(seiIntl.get({key: 'gwmBdm_000173', desc: '流程转办失败'}))
            }
          }
        })
        break;
      case seiIntl.get({key: 'gwmBdm_000163', desc: '委托'}):
        taskTrustToDo(this.props.taskId, this.selectedOne.toString()).then(res => {
          if (res.status === 'SUCCESS') {
            message.success(seiIntl.get({key: 'gwmBdm_000174', desc: '流程委托成功'}), 2, () => mainTabAction.tabClose(this.props.taskId))
          } else {
            if (res.message) {
              message.error(res.message)
            } else {
              message.error(seiIntl.get({key: 'gwmBdm_000175', desc: '流程委托失败'}))
            }
          }
        })
        break;
      default:
        break;
    }
  }

  render() {
    const { loading, head } = this.state;
    const extra = (
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ width: '90%', marginTop: '10px' }}>
          <span style={{ marginLeft: '40px' }}>{seiIntl.get({key: 'gwmBdm_000176', desc: '业务单号'})}:</span>
          <span style={{ marginRight: '45px' }}>{this.state.head.businessCode}</span>
          <span>{seiIntl.get({key: 'gwmBdm_000177', desc: '流程发起人'})}:</span>
          <span style={{ marginRight: '45px' }}>{this.state.head.createUser}</span>
          <span style={{ marginRight: '40px' }}>{this.state.head.createTime}</span>
        </div>
      </div>
    )

    const menu = this.getMenu();
    const approveFlag = this.state.nextChooseNodes.currentTaskType === 'CounterSign' || this.state.nextChooseNodes.currentTaskType === 'Approve'

    return (
      <HeadBreadcrumb
        rightExtraClass={'approve-bread-right-extra'}
        rightExtra={extra}
        className={"allocation-page"}
        style={{ overflow: "hidden" }}>
        <div style={{ display: 'flex', overflow: "hidden",width: "100%",height: "100%" }}>
          <Scrollbars autoHide={true}>
            <div className='content' style={{ overflowY: 'auto', width: '76vw', height: '100%' }}>
              {this.props.children}
            </div>
          </Scrollbars>
          <div className={"flow-content"} style={{ overflow: 'hidden', width: '22vw', height: '100%' }}>
            <Scrollbars autoHide={true}>
            <DetailCard title={seiIntl.get({key: 'gwmBdm_000178', desc: '工作说明'})} bodyStyle={{ overflow: 'auto', minHeight: 40,height: '10vh' }}
              headStyle={{ padding: '0px 8px', minHeight: '24px' }}>
                <Scrollbars autoHide={true}>
              <span>{this.state.head.workAndAdditionRemark}</span>
                </Scrollbars>
            </DetailCard>
            <Divider style={{ margin: '1px 0px' }} />
            <DetailCard title={seiIntl.get({key: 'gwmBdm_000179', desc: '决策'})} bodyStyle={{ overflow: 'auto', minHeight: 40,height: '12vh' }}
              headStyle={{ padding: '0px 8px', minHeight: '24px' }}>
                <Scrollbars autoHide={true}>
              {this.state.radioFlag ? (this.getRaidoGroup()) : (this.getSpanGroup())}
                </Scrollbars>
            </DetailCard>
            <Divider style={{ margin: '1px 0px' }} />
            <DetailCard title={seiIntl.get({key: 'gwmBdm_000180', desc: '处理意见'})} bodyStyle={{ overflow: 'auto',minHeight: 100, height: '17vh' }}
              headStyle={{ padding: '0px 8px', minHeight: '24px' }}>
                <Scrollbars autoHide={true}>
                <TextArea placeholder={head.trustState !== 2?(approveFlag ? `${seiIntl.get({key: 'gwmBdm_000156', desc: '同意'})}/${seiIntl.get({key: 'gwmBdm_000157', desc: '不同意'})}` : seiIntl.get({key: 'gwmBdm_000158', desc: '请填写处理意见'})):seiIntl.get({key: 'gwmBdm_000181', desc: '请填写审阅意见'})} onChange={this.opinionChange} rows={2} />
              <Row style={{ float: 'right' }}>{
                head.trustState !== 2 ? (
                  approveFlag ?
                    [<Button key={"approve"}  style={{ marginRight: '5px', marginTop: '6px' }} type='primary' onClick={() => this.next(true)}>
                      {seiIntl.get({key: 'gwmBdm_000156', desc: '同意'})}</Button>,
                    <Button key={"reject"}  style={{ marginRight: '5px', marginTop: '6px' }} onClick={() => this.next(false)}>
                      {seiIntl.get({key: 'gwmBdm_000157', desc: '不同意'})}</Button>]
                    :
                    <Button key={"turn"} style={{ marginRight: '5px', marginTop: '6px' }} type='primary' onClick={() => this.next()}>
                      {this.state.head.solidifyFlow ? '同意' : '下一步'}</Button>
                ):<Button key={"turn"} style={{ marginRight: '5px', marginTop: '6px' }} type='primary' onClick={() => this.commonConfirm(seiIntl.get({key: 'gwmBdm_000182', desc: '完成委托审阅'}),this.delegateApprove)}>
                  {seiIntl.get({key: 'gwmBdm_000183', desc: '审阅'})}</Button>
                }
                {!isEmpty(menu) ? <Dropdown overlay={<Menu>{menu}</Menu>}>
                  <Button >{seiIntl.get({key: 'gwmBdm_000184', desc: '更多'})} <Icon type="down" /></Button>
                </Dropdown> : null}
              </Row>
                </Scrollbars>
            </DetailCard>
            <Divider style={{ margin: '1px 0px' }} />
            {this.state.flowHistoryList ?
              <DetailCard title={seiIntl.get({key: 'gwmBdm_000185', desc: '流程历史'})}
                extra={<a onClick={this.goToFlowMap}>{seiIntl.get({key: 'gwmBdm_000141', desc: '查看流程图'})}</a>}
                bodyStyle={{ overflow: 'auto',minHeight: 50, height: '20vh' }}
                headStyle={{ padding: '0px 8px', minHeight: '24px' }}>
                  <Scrollbars autoHide={true}>
                <span></span>
                <Timeline style={{ marginTop: '10px', marginLeft: "10px" }} reverse={true}>
                  {
                    this.state.flowHistoryList.map((item, index) => {
                      return <Timeline.Item key={`${index}`} dot={<Icon type="clock-circle-o" color="red" />}>
                        <p style={{ fontSize: '12px' }}><b>{item.flowTaskName}</b><span style={{ marginLeft: '8px' }}>{item.executorName}</span></p>
                        <p style={{ fontSize: '12px' }}><b>{seiIntl.get({key: 'gwmBdm_000186', desc: '耗时'})}</b><span style={{ marginLeft: '8px' }}>  {(item.actDurationInMillis / 1000).toFixed(0)}{seiIntl.get({key: 'gwmBdm_000187', desc: '秒'})}</span></p>
                        <p style={{ fontSize: '12px' }}><b>{seiIntl.get({key: 'gwmBdm_000188', desc: '到达时间'})}</b><span style={{ marginLeft: '8px' }}>{item.actEndTime}</span></p>
                        <p style={{ fontSize: '12px' }}><b>{seiIntl.get({key: 'gwmBdm_000189', desc: '处理摘要'})}</b><span style={{ marginLeft: '8px' }}>{item.depict}</span></p>
                      </Timeline.Item>
                    })
                  }
                </Timeline>
                  </Scrollbars>
              </DetailCard> : null}
            </Scrollbars>
          </div>
        </div>
        <UserChoose visible={this.state.chooseUser}
          closeModal={this.closeModal}
          completeTask={this.completeTask}
          confirmLoading={loading}
          nextNode={this.state.nextNode} />
        <Modal
          title={`${seiIntl.get({key: 'gwmBdm_000190', desc: '指定{0}人'},{0:this.currentClick})}`}
          bodyStyle={{ maxHeight: "720px", overflow: "auto" }}
          width={window.innerWidth * 0.8}
          visible={this.state.selectUserModal}
          onOk={this.okHandle}
          onCancel={() => { this.setState({ selectUserModal: false }) }}
          destroyOnClose={true}
          maskClosable={false}
        >
          <AnyOneSelected type='radio' selectChange={(id) => this.selectedOne = id} />
        </Modal>
      </HeadBreadcrumb>
    )
  }
}

Approve.propTypes = {
  taskId: PropTypes.string.isRequired,
  instanceId: PropTypes.string,
  pathData: PropTypes.array,
  //提交之前回调函数
  beforeNext: PropTypes.func,
}


export default Approve;
