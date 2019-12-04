/**
 * @description 批量导入数据组件，接收下载 url、上传 url，显示列表列配置，确认点击回调
 * @author 刘松林
 * @date 2018.9.19
 */
import React, {Component} from 'react';
import {Button , Modal, Upload} from 'antd';
import {message} from "antd/lib/index";
import SimpleTable from "./SimpleTable";
import PropTypes from 'prop-types';
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
class ImportData extends Component{

    state = {
        importVisible: false,
        importData: [],
        loading:false,
        modalVisible: false,
    };

    getHeaders = () => {
        let auth;
        try {
            auth = JSON.parse(sessionStorage.getItem('Authorization'));
        } catch (e) {
            console.log(e);
        }
        return {
            'Authorization': auth ? (auth.accessToken ? auth.accessToken : '') : ''
        }
    }

    importShowModal = () => {
        this.setState({
            importVisible: true,
        });
    }

    importHandleOk = (e) => {
        this.setState({
            importVisible: false,
        });
        if (this.props.okHandler) {
            this.props.okHandler(this.state.importData);
        }
    }

    importHandleCancel = (e) => {
        this.setState({
            importVisible: false,
        });
    }

    fileUpload = ({file}) => {
        if(file.status !=='uploading'){
            this.setState({loading:false});
        }
        if (file.status === 'done') {
            if (file.response && file.response.data) {
                let msg = []
                let result = file.response.data.map((item, index) => {
                    if (item.msg === null || item.msg === undefined || Object.keys(item.msg).length !== 0) {
                        msg.push(<span key={'import_error_' + index} style={{display: 'block'}}>
                        {'第' + (index + 1) + '行:' + JSON.stringify(item.msg) + ''}</span>)
                    }else{
                        item.index=index;
                        return item;
                    }
                })
                if (msg.length !== 0) {
                    Modal.error({
                        centered: true,
                        content: <div style={{maxHeight: 360, overflow: 'auto'}}>{msg}</div>,
                        title: seiIntl.get({key: 'gwmBdm_000101', desc: '错误信息'})
                    })
                }
                this.setState({importData: result.filter(item=>item!==undefined)})
            } else if (file.response && file.response.msg) {
                message.error(file.response.msg)
            } else {
                message.error(seiIntl.get({key: 'gwmBdm_000102', desc: '未找到数据'}))
            }
        }
    }
    beforeUpload = (file) => {
        const xsl = file.name.toLocaleLowerCase().includes('xls')||file.name.includes('xlsx');
        if (!xsl) {
            message.error(seiIntl.get({key: 'gwmBdm_000103', desc: '必须上传模版文件'}));
        }
        this.setState({loading:true});
        return xsl
    }

    render(){
        return (
        <div style={{display:'inline'}}>
             <Button key="import" type="primary" style={{marginRight: '15px'}}
                    onClick={this.importShowModal}>{seiIntl.get({key: 'gwmBdm_000104', desc: '批量导入'})}</Button>
        <Modal
            title={seiIntl.get({key: 'gwmBdm_000104', desc: '批量导入'})}
            width={window.innerWidth * 0.8}
            visible={this.state.importVisible}
            onOk={this.importHandleOk}
            onCancel={this.importHandleCancel}
            centered={true}
            afterClose={() => {
                this.setState({importData: []})
            }}
            bodyStyle={{padding: 12}}
            maskClosable={false}
            >
                <Upload
                    action={this.props.uploadUrl}
                    onChange={this.fileUpload}
                    headers={this.getHeaders()}
                    beforeUpload={this.beforeUpload}
                    showUploadList={false}
                    >
                    <Button style={{marginRight: 15,marginLeft: 15,marginBottom:6}}>{seiIntl.get({key: 'gwmBdm_000105', desc: '上传'})}</Button>
                </Upload>
                {this.props.dowloadUrl?<a key='downloadTemplate' style={{marginBottom:6}} href={this.props.dowloadUrl}>{seiIntl.get({key: 'gwmBdm_000207', desc: '下载模版'})}</a>:null}
                <SimpleTable
                    key='importTable'
                    loading={this.state.loading}
                    data={this.state.importData}
                    columns={this.props.columns}
                    heightY={400}
                    rowKey={'index'}
                />
            </Modal>
        </div>)
    }
}

ImportData.protoType={
    //导入数据显示列配置
    columns:PropTypes.array.isRequired,
    //导入数据上传 url
    uploadUrl:PropTypes.string.isRequired,
    //导入数据模版下载 url
    dowloadUrl:PropTypes.string.isRequired,
    //点击确认按钮回调导入正确数据
    okHandler:PropTypes.func.isRequired,
}

export default ImportData;

