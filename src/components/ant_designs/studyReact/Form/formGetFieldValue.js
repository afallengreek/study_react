import {
    Form, Select, Input, Button,
} from 'antd';
import React from "react";

const FormItem = Form.Item;
const Option = Select.Option;

class formGetFieldValue extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleSelectChange = (value) => {
        console.log(value);
        this.props.form.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} style={{marginTop:200}}>
                <FormItem
                    label="Note"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('note', {
                        rules: [{ required: true, message: 'Please input your note!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="Gender"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('gender', {
                        rules: [{ required: true, message: 'Please select your gender!' }],
                    })(
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={this.handleSelectChange}
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    wrapperCol={{ span: 12, offset: 5 }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default formGetFieldValue = Form.create()(formGetFieldValue);