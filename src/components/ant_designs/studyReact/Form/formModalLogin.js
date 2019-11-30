import {
    Button, Modal, Form, Input, Radio, Row, Col,
} from 'antd';
import React from "react";

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="我的简介"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                    footer={[<Button onClick={onCancel}>取消</Button>,
                        <Button onClick={onCreate} type={"primary"}>确定</Button>]}
                >
                    <Form layout="vertical">
                        <FormItem label="标题">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请输入标题!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="描述">
                            {getFieldDecorator('description')(<Input type="textarea" />)}
                        </FormItem>
                        <FormItem style={{marginBottom:0}}>
                            {getFieldDecorator('modifier', {
                                initialValue: 'public',
                            })(
                                <Radio.Group>
                                    <Radio value="public">公开</Radio>
                                    <Radio value="private">私密</Radio>
                                </Radio.Group>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

class formModalLogin extends React.Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
            this.props.history.goBack();
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {
        return (
            <div>
                <Row>
                    <Col offset={11}  style={{marginTop:"330px"}}>
                <Button type="primary" onClick={this.showModal}>用户注册</Button>
                    </Col>
                </Row>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}
export default formModalLogin;