import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import React from "react";

const FormItem = Form.Item;

class formNormalLogin extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    hasError=(fieldsError)=>{
        console.log("我的数据",fieldsError);
        return Object.keys(fieldsError).some(key=>fieldsError[key])
    }
    login=()=>{
        this.props.history.goBack();
    }
    goRegister=()=>{
        this.props.history.push("/formNormalRergister");
    }
    render() {
        const { getFieldDecorator ,getFieldValue,getFieldError,getFieldsError,isFieldTouched} = this.props.form;
        const nameError=getFieldError("userName");
        console.log("我的校验结果",nameError,isFieldTouched("userName"),getFieldError("userName"))
        const passError=isFieldTouched("password")&&getFieldError("password");
        return (
            <Form onSubmit={this.handleSubmit} style={{maxWidth: "300px",marginLeft:"40%"}} display={"inline"}>
                <FormItem
                    validateStatus={!isFieldTouched("userName")?"":nameError?"error":getFieldValue("userName")==="pengxu"?"":"error"}
                    help={!isFieldTouched("userName")?"":nameError?nameError:getFieldValue("userName")==="pengxu"?"账号正确！":"账号错误！"}
                >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={!isFieldTouched("password")?"":passError?"error":getFieldValue("password")==="123456"?"":"error"}
                    help={!isFieldTouched("password")?"":passError?passError:getFieldValue("password")==="123456"?"密码正确！":"密码错误！"}
                >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住密码</Checkbox>
                    )}
                    <a className="login-form-forgot" href="" style={{float: "right"}}>忘记密码</a>
                    <Button type="primary" htmlType="submit" style={{width: "100%"}} onClick={this.login}
                            disabled={this.hasError(getFieldsError())
                            ||getFieldValue("userName")!=="pengxu"||getFieldValue("password")!=="123456"}>
                        登陆
                    </Button>
                    没有账号请 <a href="" onClick={this.goRegister}>注册</a>
                </FormItem>
            </Form>
        );
    }
}

export default formNormalLogin = Form.create()(formNormalLogin);