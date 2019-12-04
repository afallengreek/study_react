import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import React from "react";
import {action} from "mobx";

const FormItem = Form.Item;

class LoginMain extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.authStore
            .login()
            .then(action(() => (this.redirectToReferrer = true)));
    };
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    hasError=(fieldsError)=>{
        console.log("我的数据",fieldsError);
        return Object.keys(fieldsError).some(key=>fieldsError[key])
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
            <div>
                <div style={{textAlign:"center",marginTop:"200px",fontSize:"16px"}}><b>1027班超级高中同学云空间</b></div>
                <br/><br/>
            <Form onSubmit={this.handleSubmit} style={{maxWidth: "300px",marginLeft:"40%"}} display={"inline"}>
                <FormItem
                    validateStatus={!isFieldTouched("userName")?"":nameError?"error":getFieldValue("userName")==="pengxu"?"":"error"}
                    help={!isFieldTouched("userName")?"":nameError?nameError:getFieldValue("userName")==="pengxu"?"账号正确！":"账号错误！"}
                >
                    {getFieldDecorator('userName', {
                     rules: [{ required: true, message: '请输入您的用户名!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={!isFieldTouched("password")?"":passError?"error":getFieldValue("password")==="123456"?"":"error"}
                    help={!isFieldTouched("password")?"":passError?passError:getFieldValue("password")==="123456"?"密码正确！":"密码错误！"}
                >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
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
            </div>
        );
    }
}

export default LoginMain = Form.create()(LoginMain);