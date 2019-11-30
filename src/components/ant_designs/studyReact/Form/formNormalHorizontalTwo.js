import {Form, Icon, Input, Button, Row, Col,} from 'antd';
import React from "react";
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field=>fieldsError[field])
}

class formNormalHorizontalTwo extends React.Component {
    constructor() {
        super();
        this.state = {
             nameError:null,
             passError:null,
             hasNameFlag:false,
             hasPassError:false,
        }
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        // this.props.form.validateFields();
        this.goBack();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    goBack=(e)=>{
        // e.preventDefault();
        this.props.form.validateFieldsAndScroll((err,value)=>{
            if(!err){
                if(value.userName!=="pengxu"||value.password!=="123456") {
                    if (value.password !== "123456") {
                        this.setState({
                            passError: "您输入的密码不正确",
                            hasPassFlag:true,
                        });
                        this.passInput.focus();
                    }else{
                        this.setState({
                            passError: value.userName==="123456"?"您输入的密码不正确":"",
                            hasPassFlag:false,
                        });
                    }
                    if (value.userName !== "pengxu") {
                        this.setState({
                            nameError: "您输入的名字不正确",
                            hasNameFlag:true,
                        });
                        this.nameInput.focus();
                    }else{
                        this.setState({
                            nameError: "账号正确！",
                            hasNameFlag:false,
                        });
                    }
                }
                else{
                    this.props.history.goBack();
                }
            }
            else{

            }
        });

    };

    render() {

        const {getFieldDecorator,getFieldError,getFieldsError,isFieldTouched}=this.props.form;
        // Only show error after a field is touched.
        // const userNameError = isFieldTouched('userName') && getFieldError('userName');
        // const passwordError = isFieldTouched('password') && getFieldError('password');

        const {nameError,passError}=this.state;
        let userNameError="";
        let userErrorFlag=true;
        if(isFieldTouched("userName")){
            if(getFieldError("userName")){
                userNameError=getFieldError("userName");
            }else{
                if(this.state.hasNameFlag){
                    userErrorFlag=false;
                }
                userNameError=nameError;
            }
        }else{
            userErrorFlag=false;
            userNameError="请输入用户名"
        }
        let passwordError="";
        let passErrorFlag=true;
        if(isFieldTouched("password")){
            if(getFieldError("password")){
                passwordError=getFieldError("password");
            }else{
                if(this.state.hasPassFlag){
                    passErrorFlag=false;
                }
                passwordError=passError;
            }
        }else{
            passErrorFlag=true;
            passwordError="请输入用户名"
        }
        console.log("打印我的错误",this.props.form.getFieldsError());
        console.log("打印我的表单错误",getFieldError("userName"));
        return (
           <Form layout="inline" onSubmit={this.handleSubmit}>
                <Row gutter={0} style={{marginTop:"250px"}}>
                    <Col span={6} offset={9}>
                        <FormItem
                            validateStatus={userErrorFlag ? 'error' : ''}
                            help={userNameError}
                        >
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    ref={node => (this.nameInput = node)}
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username" />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={6} offset={9}>
                        <br/>
                        <FormItem
                            validateStatus={passErrorFlag ? 'error' : ''}
                            help={passwordError}
                        >
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    ref={node => (this.passInput = node)}
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password" placeholder="Password" />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={6} offset={10}>
                        <br/>
                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={hasErrors(getFieldsError())}
                                onClick={this.goBack}
                            >
                                Log in
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default formNormalHorizontalTwo = Form.create()(formNormalHorizontalTwo);