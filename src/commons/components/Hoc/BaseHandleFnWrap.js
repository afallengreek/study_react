/**
 * @Description:基础事件处理方法 - 业务组件
 * @Author: wanghao
 * @Date: 2019/4/16
 */
import {message, Modal} from "antd";
import {searchListByKeyWithTag} from "../../utils/CommonUtils";
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
const confirm = Modal.confirm;

const BaseHandleFnWrap = (WrappedComponent) => class extends WrappedComponent{

    setModalVisible = (visible, isEdit = false) => {
        let newState = {visible};
        if (visible) {
            newState.isEdit = isEdit;
        }
        this.setState(newState);
    };
    handleFn = {
        //新增
        handleAdd: () => this.setModalVisible(true),
        //编辑
        handleEdit: record => {
            this.setState({editData: record});
            this.setModalVisible(true, true);
        },
        //删除
        handleDelete: (record,deleteService) => {
            confirm({
                title: seiIntl.get({key: 'gwmBdm_000106', desc: '确定要删除吗？'}),
                onOk: () => {
                    let params = {};
                    params = record.id;
                    this.props.show();
                    deleteService(params).then(result => {
                        if (result.status === "SUCCESS") {
                            message.success(result.message ? result.message : seiIntl.get({key: 'gwmBdm_000107', desc: '请求成功'}));
                            //刷新本地数据
                            this.getDataSource({},false);
                        } else {
                            message.error(result.message ? result.message : seiIntl.get({key: 'gwmBdm_000108', desc: '请求失败'}));
                        }
                    }).catch(e => {
                    }).finally(() => {
                        this.props.hide();
                    })
                }
            });
        },
        //查找
        handleQuickSearch: quickValue => {
            searchListByKeyWithTag(this.state.dataSource, {keyword: quickValue})
                .then(dataSource => {
                    this.setState({quickValue, dataSource})
                });
        }
    };

    render() {
        return super.render();
    }
};
export default BaseHandleFnWrap;
