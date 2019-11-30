import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import React from "react";

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class formNormalRergister extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一样!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }
    register=()=>{
        this.props.history.goBack();
    }
    hasError=(fieldsError)=>{
        console.log("我的数据",fieldsError);
        return Object.keys(fieldsError).some(key=>fieldsError[key])
    }
    render() {
        const { getFieldDecorator,getFieldsError,getFieldValue} = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
               span: 8
            },
            wrapperCol: {
               span: 8
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <Form onSubmit={this.handleSubmit} style={{marginTop:"60px"}}>
                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '邮箱格式错误',
                        }, {
                            required: true, message: '请输入邮箱名称',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Confirm Password"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请再次输入密码!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
              昵称&nbsp;
                            <Tooltip title="别人称呼你的方式?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                    )}
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请输入你的昵称!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="居住地"
                >
                    {getFieldDecorator('residence', {
                        initialValue: ['浙江', '杭州', '西湖'],
                        rules: [{ type: 'array', required: true, message: '请选择你的居住地!' }],
                    })(
                        <Cascader options={residences} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="电话号码"
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入你的电话号码!' }],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="网页"
                >
                    {getFieldDecorator('网页', {
                        rules: [{ required: true, message: '请输入你的网页!' }],
                    })(
                        <AutoComplete
                            dataSource={websiteOptions}
                            onChange={this.handleWebsiteChange}
                            placeholder="website"
                        >
                            <Input />
                        </AutoComplete>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="验证码"
                    extra="必须确认不是机器人！"
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('captcha', {
                                rules: [{ required: true, message: '请输入您的!' }],
                            })(
                                <Input />
                            )}
                        </Col>
                        <Col span={12}>
                            <Button>获得验证码</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout} style={{marginLeft:"250px"}}>
                    <Button type="primary"
                            disabled={this.hasError(getFieldsError())||!getFieldValue("agreement")}
                            htmlType="submit" onClick={this.register}>注册</Button>
                </FormItem>
            </Form>
        );
    }
}

export default  formNormalRergister = Form.create()(formNormalRergister);
