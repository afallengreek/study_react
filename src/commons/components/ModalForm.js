/**
 * @description 弹出表单，主要主数据用
 * @author 刘松林
 * @date 2018.12.19
 */
import React  from 'react';
import { Modal } from 'antd';
import StandardForm from "./StandardForm";

import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
export const CreateForm = props => {
    const { modalVisible, checkValue, doubleLine,trebleLine, editData,handleAdd, addConfig, handleModalVisible, modalType } = props;
    
    const okHandle = () => {
        this.form.validateFields((err, fieldsValue) => {
            if (err) return;
            if(checkValue){
                if(!checkValue(fieldsValue)){
                    return
                }
            }
            this.form.resetFields();
            handleAdd(fieldsValue);
            handleModalVisible();
        });
    };
    const closeHandle = () =>{
        this.form.resetFields();
    }

    if(addConfig){
        return (
            <Modal
                title={<span className={'header-span'}>{modalType==='edit'?seiIntl.get({key: 'gwmBdm_000091', desc: '编辑'}):seiIntl.get({key: 'gwmBdm_000090', desc: '新增'})}</span>}
                bodyStyle={{maxHeight:400}}
                width={doubleLine||trebleLine?1040:520}
                visible={modalVisible}
                centered
                onOk={okHandle}
                afterClose={closeHandle}
                onCancel={() => handleModalVisible()}
                maskClosable={false}
            >
             <StandardForm fieldsConfig={addConfig} checkValue={checkValue}
                doubleLine={doubleLine} trebleLine={trebleLine} editData={editData}
                formType={modalType} ref={(ref) => this.form = ref}/>
            </Modal>
        );
    }else{
        return '';
    }

};
