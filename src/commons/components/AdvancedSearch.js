/**
 * @description 左组织机构树，右表人员选择，可选全部人员，目前流程选择任意执行人用
 * @author 刘松林
 * @date 2018.12.21
 */
import React,{Component} from "react";
import {Button,Icon} from "antd";
import StandardForm from './StandardForm';
import 'rc-dropdown/assets/index.css';
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
class AdvancedSearch extends Component {
    state={
        toggleForm:false,
    }

    showFrom = () => {
        this.setState({toggleForm:!this.state.toggleForm})
    }

    componentDidMount(){
        if(this.props.initToggle){
            this.setState({toggleForm:true})
        }
    }


    getSearchButton = () => (
        <div style={{ marginBottom: 24 }}>
            <Button type="primary" onClick={this.onSearch}>{seiIntl.get({key: 'gwmBdm_000073', desc: '查询'})}</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>{seiIntl.get({key: 'gwmBdm_000206', desc: '重置'})}</Button>
        </div>
    )

    onSearch = () =>{
        if(this.props.handleSearch){
            this.form.validateFields((err, fieldsValue) => {
                if (err) return;
                this.props.handleSearch(fieldsValue)
                this.showFrom()
            });
        }
    }

    handleFormReset = () => {
        this.form.resetFields();
    }

    render() {
        return (
            <>
                <div style={{display:'inline-flex'}}>
                    <Button style={{ marginLeft: 8 }} onClick={this.showFrom}>{seiIntl.get({key: 'gwmBdm_000081', desc: '高级查询'})}
                        <Icon type={this.state.toggleForm?"up":"down"} /></Button>
                </div>
                <div style={{display:this.state.toggleForm?'block':'none',marginTop:"34px",position:'absolute',zIndex:'9',
                    right:'1px', background:'white',padding: '5px',boxShadow: '#666 0px 10px 10px',width: "100%"}}>
                    <StandardForm ref={(ref) => this.form = ref} style={{marginTop: '18px',padding: '5px'}}
                    trebleLine fieldsConfig={this.props.config} extra={this.getSearchButton()}/>
                </div>
            </>
        )
    }
}


export default AdvancedSearch

