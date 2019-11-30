import {
    Form, Input, Icon, Button,
} from 'antd';
import React from "react";

const FormItem = Form.Item;

let id = 0;

class formAddRow extends React.Component {
    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(++id);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <FormItem
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Passengers' : ''}
                required={false}
                key={k}
            >
                {getFieldDecorator(`names[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: "请输入乘客的姓名或者删除这个空.",
                    }],
                })(
                    <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
                )}
                {keys.length > 1 ? (
                    <Icon
                        style={{ cursor:"pointer",
                            position: "relative",
                            top: "4px",
                            fontSize: "24px",
                            color: "#999",
                            transition: "all .3s",}}
                        type="minus-circle-o"
                        disabled={keys.length === 1}
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </FormItem>
        ));
        return (
            <Form onSubmit={this.handleSubmit}>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> 添加新行
                    </Button>
                </FormItem>
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

export default formAddRow = Form.create()(formAddRow);