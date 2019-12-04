import {
    Form, Icon, Row, Button,message
} from 'antd';
import React from "react";
import {CheckboxItem, InputItem} from "../../../../commons/components/StandardFormItems";
import {inject, observer} from "mobx-react";
import {action} from "mobx";
import {listAllDataValue} from "./service";
const FormItem = Form.Item;
@inject("authStore")
@observer
class LoginMain extends React.Component {
    commonProps = {
        form:this.props.form,
        span:24,
        formlayout:{
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
    };
    shortCommonProps = {
        form:this.props.form,
        span:16,
        formlayout:{
            labelCol: {span: 11},
            wrapperCol: {span: 13}
        }
    };
    componentWillMount(){
    };
    handleSubmit = () => {
        this.props.form.validateFieldsAndScroll((err,values)=> {
            if(!err) {
                this.props.authStore
                    .login({...values})
                    .then(action(() => (console.log("fdsafsdaf"))));
            }else{
                message.error("请将登陆信息填写完整！")
            }
        })
    };
    componentDidMount() {

    }

    render() {
        const { username, password ,remember} = this.props.authStore;
        const commonProps = this.commonProps;
        const shortCommonProps = this.shortCommonProps;
        return (
            <div>
                <div style={{textAlign:"center",marginTop:"200px",fontSize:"16px"}}><b>reactStudy登陆</b></div>
                <br/><br/>
                <Form style={{maxWidth: "300px",marginLeft:"40%"}} display={"inline"}>
                    <Row>
                    <InputItem
                        {...commonProps}
                        name={"用户名"}
                        code={"username"}
                        rules={[{ required: true, message: '请输入您的用户名!'}]}
                        initialvalue={username}
                        placeholder="请输入用户名"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                    />
                    </Row>
                    <Row>
                    <InputItem
                    {...commonProps}
                        name={"密码"}
                        code={"password"}
                        rules={[{ required: true, message: '请输入密码!'}]}
                        initialvalue={password}
                        placeholder="请输入密码"
                        type="password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                    </Row>
                    <CheckboxItem  {...shortCommonProps}
                                code={"remember"}
                                name={"记住密码"}
                                initialvalue={remember==="true"}
                                onChange={(e)=>{
                                    console.log("fsdafsadf",e.target.checked);
                                }}
                    />
                    <FormItem>
                        <a className="login-form-forgot" href="" style={{float: "right"}}>忘记密码</a>
                        <Button type="primary" htmlType="submit" style={{width: "90%",marginLeft:"10%"}} onClick={this.handleSubmit}>
                            登陆
                        </Button>
                        <div style={{marginLeft:"10%"}}>没有账号请 <a href="" onClick={this.goRegister}>注册</a></div>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default LoginMain = Form.create()(LoginMain);