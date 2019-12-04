import httpUtils from '../../utils/FeatchUtils';

//获取任务抬头信息信息任务
export async function getApprovalHeaderVO(id) {
    return httpUtils.get(`/flow-service/flowTask/getApprovalHeaderVO/${id}`)    
}

//获取当前审批任务的决策信息
export async function findNextNodes(id) {
    return httpUtils.get(`/flow-service/flowTask/findNextNodes/${id}`)    
}

//获取当前流程实例的流程历史信息
export async function getProcessTrackVOById(instanceId) {
    return httpUtils.post(`/flow-service/flowInstance/getProcessTrackVOById`,{instanceId:instanceId})    
}

//下一步回调
export async function getSelectedNodesInfo(params={}) {
    return httpUtils.get(`/flow-service/flowTask/getSelectedNodesInfo`,params)    
}


//完成
export async function completeTask(params={}) {
    return httpUtils.postJson(`/flow-service/defaultFlowBase/completeTaskNew`,params)    
}

//转办
export async function taskTurnToDo(taskId,userId) {
    return httpUtils.post(`/flow-service/flowTask/taskTurnToDo`,{taskId:taskId,userId:userId})    
}

//委托
export async function taskTrustToDo(taskId,userId) {
    return httpUtils.post(`/flow-service/flowTask/taskTrustToDo`,{taskId:taskId,userId:userId})    
}

//驳回
export async function reject(id,opinion) {
    return httpUtils.postJson(`/flow-service/flowTask/reject/${id}/${opinion}`)    
}

//终止流程
export async function endTask(instanceId) {
    return httpUtils.postJson(`/flow-service/flowInstance/end/${instanceId}`)    
}

//获取全部组织机构
export async function listAllOrgs() {
    return httpUtils.postJson(`/flow-service/flowDefination/listAllOrgs`)    
}

//获取全部组织机构
export async function listAllUserByOrgId(orgId) {
    return httpUtils.get(`/flow-service/flowDefination/listAllUser`,{organizationId:orgId})    
}

//委托审阅处理
export async function taskTrustToReturn(taskId,opinion) {
    return httpUtils.post(`/flow-service/flowTask/taskTrustToReturn`,{taskId:taskId,opinion:opinion})    
}

