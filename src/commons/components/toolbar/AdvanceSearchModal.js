/**
 * @Description:高级查询表单
 * @Author: CHEHSHUANG
 * @Date: 2018/11/9
 */
import React, {Component} from "react"
import {Col, Form, Modal, Row} from "antd"
import {formItemLayout, getComponent, getDecoratorProps, getFormItems} from "./formConfigUtil";
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
const FormItem = Form.Item;
class AdvanceSearchModal extends Component {
    handleSearch = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.setVisible(false);
                this.props.handleSearch(values)
            }
        })
    }
    handleCancel = () => {
        this.props.setVisible(false)
    }
    render() {
        const {afterClose, visible,rowColNum,modalWidth,modalTitle,formConfig,form} = this.props;
        return (
            <Modal
                className={"advanceSearchModal"}
                title={modalTitle||seiIntl.get({key: 'gwmBdm_000081', desc: '高级查询'})}
                width={modalWidth||600}
                maskClosable={false}
                visible={visible}
              //  afterClose={afterClose}
                onOk={this.handleSearch}
                onCancel={this.handleCancel}
            >
                <Form>
                    {getFormItems(formConfig,form,rowColNum)}
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(AdvanceSearchModal);
