/**
 * Created by liusonglin on 2018/7/13.
 */
import React, { PureComponent } from 'react';
import { Form,Button, Col,Row, message, Input } from 'antd';
import { CreateForm } from './ModalForm';
import SimpleTable from "./SimpleTable";
import { checkRight } from "../utils/CommonUtils";
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
class StandardTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedRows: [],
            pageInfo:{},
            keyword:null,
            modalVisible:false,
            modalType:'add',
            buttonEditDisable:false,
            buttonFreezeDisable:false,
        };
    }

    handleModalVisible = flag => {
        this.setState({
            modalVisible: !!flag,
        });
    };

    handleRowSelectChange = (selectedRows) => {

        const { onSelectRow } = this.props;
        if (onSelectRow) {
            onSelectRow(selectedRows);
        }
        if (selectedRows.length>0){
            this.setState({
                selectedRows,
                buttonEditDisable:!(this.props.addConfig && selectedRows.length === 1 &&selectedRows[0] && !selectedRows[0].frozen),
                buttonFreezeDisable:!(this.props.addConfig && selectedRows.length === 1)
            });
        }else {
            this.setState({
                selectedRows,
                buttonEditDisable:false,
                buttonFreezeDisable:false
            });
        }


    };

    editModal = flag =>{
        if(this.state.selectedRows.length===0) {
            message.error(seiIntl.get({key: 'gwmBdm_000087', desc: '请选择一行数据！'}));
            return;
        }
        if(this.state.selectedRows.length>1) {
            message.error(seiIntl.get({key: 'gwmBdm_000088', desc: '只能选择一行数据！'}));
            return;
        }
        this.handleModalVisible(flag);
    };

    handleTableChange = (pageInfo) => {
        const { handleSearch } = this.props;
        this.setState({pageInfo:pageInfo});
        handleSearch({Quick_value:this.state.keyword,...pageInfo});
    };

    handleFrozen = () => {
        if(this.state.selectedRows.length===0) {
            message.error(seiIntl.get({key: 'gwmBdm_000087', desc: '请选择一行数据！'}));
            return;
        }
        if(this.state.selectedRows.length>1) {
            message.error(seiIntl.get({key: 'gwmBdm_000088', desc: '只能选择一行数据！'}));
            return;
        }
        if(this.props.handleFrozen){
            this.props.handleFrozen(this.state.selectedRows[0]);
        }
        this.cleanSelectedKeys();
    };

    handleEdit = (fieldsValue) => {
        const { handleAdd } = this.props;
        if(handleAdd){
            handleAdd(fieldsValue);
        }
        this.cleanSelectedKeys();
    };

    cleanSelectedKeys = () => {
        this.handleRowSelectChange([]);
    };

    handleSearch = (value) => {
        const { handleSearch } = this.props;
        handleSearch({Quick_value:value,...this.state.pageInfo,page:1});
        this.setState({keyword:value})
    };

    render() {
        const {
            checkBox,
            addConfig,
            data,
            columns,
            loading,
            rowKey,
            checkValue
        } = this.props;

        const parentProps = {
            handleAdd: this.handleEdit,
            doubleLine:this.props.doubleLine,
            trebleLine:this.props.trebleLine,
            handleModalVisible: this.handleModalVisible,
            addConfig:addConfig,
            checkValue:checkValue,
            modalType:this.state.modalType,
            editData:this.state.selectedRows[0]
        };

        const search = ()=> {
            return (this.props.showSearch===false?null:<Input.Search
                placeholder={this.props.searchPlaceholder?this.props.searchPlaceholder:seiIntl.get({key: 'gwmBdm_000089', desc: '请输入代码或名称查询'})}
                onSearch={value => this.handleSearch(value)}
                style={{marginRight:30,width:230}}
            />)
        };

        const title = () =>{
            let rightControl=this.props.authCodes||[]
            return addConfig && [
                checkRight(rightControl[0])&&<Button key="add" type="primary" style={{marginRight:'8px'}} onClick={() => {
                    this.setState({modalType:'add'});
                    this.handleModalVisible(true)}
                }>{seiIntl.get({key: 'gwmBdm_000090', desc: '新增'})}</Button>,
                checkRight(rightControl[1])&&
                <Button key="edit" style={{marginRight:'8px'}} disabled={this.state.buttonEditDisable}
                onClick={() => {
                    this.setState({modalType:'edit'});
                    this.editModal(true)}}>{seiIntl.get({key: 'gwmBdm_000091', desc: '编辑'})}</Button>,
                checkRight(rightControl[2])&&<Button key="freeze" style={{marginRight:'8px'}} onClick={this.handleFrozen}
                  disabled={this.state.buttonFreezeDisable}>
                    {this.state.selectedRows[0]?this.state.selectedRows[0].frozen?seiIntl.get({key: 'gwmBdm_000208', desc: '解冻'}):seiIntl.get({key: 'gwmBdm_000209', desc: '冻结'}):seiIntl.get({key: 'gwmBdm_000209', desc: '冻结'})}</Button>
            ]
        }
        const titleShow = this.props.title ? "block" : "none";
        return (
            <div className={'table-box'}>
                <div style={{margin: '10px 14px 10px',display: titleShow}}>
                    <div className={"header-span"}>{this.props.title}</div>
                </div>
                <div style={{width:this.props.width?this.props.width:'100%'}}>
                    <Row style={{background:'#F3F8FC',padding: 5,paddingBottom:5,border: '1px solid #e8e8e8',borderBottom: 'none'}}>
                        <Col span={12}>{title()}</Col>
                        <Col span={12} style={{textAlign:'right'}}>{search()}</Col>
                    </Row>
                    <SimpleTable
                        checkBox={checkBox}
                        rowKey={rowKey || 'id'}
                        rowsSelected={this.state.selectedRows}
                        onSelectRow={this.handleRowSelectChange}
                        pageChange={this.handleTableChange}
                        data={data}
                        loading={loading}
                        columns={columns}
                    />
                    <CreateForm {...parentProps} modalVisible={this.state.modalVisible} />
                </div>
            </div>
        );
    }
}

StandardTable = Form.create()(StandardTable);

export default StandardTable;
