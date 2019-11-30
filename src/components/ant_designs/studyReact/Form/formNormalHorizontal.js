import {Form, Icon, Input, Button, Row, Col,} from 'antd';
import React from "react";
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field=>fieldsError[field])
}

class formNormalHorizontal extends React.Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    goBack=()=>{
        this.props.history.goBack();
    };
    render() {

        const {getFieldDecorator,getFieldError,getFieldsError,isFieldTouched,getFieldValue} =this.props.form;
        // Only show error after a field is touched.
        // const userNameError = isFieldTouched('userName') && getFieldError('userName');
        // const passwordError = isFieldTouched('password') && getFieldError('password');

        const userNameError=isFieldTouched("userName")&&getFieldError("userName");
        const passwordError=isFieldTouched("password")&&getFieldError("password");
        console.log("打印我的错误",this.props.form.getFieldsError());
        console.log("打印我的表单错误",getFieldError("userName"));
        return (
           <Form layout="inline" onSubmit={this.handleSubmit}>
                <Row gutter={0} style={{marginTop:"250px"}}>
                    <Col span={6} offset={9}>
                        <FormItem
                            validateStatus={userNameError ? 'error' :getFieldValue('userName')==="pengxu"?'':'error'}
                            help={userNameError || getFieldValue('userName')==="pengxu"?'账号正确！':"账号错误"}
                        >
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={6} offset={9}>
                        <br/>
                        <FormItem
                            validateStatus={passwordError ? 'error' :getFieldValue('password')==="123456"?'':'error'}
                            help={passwordError || getFieldValue('password')==="123456"?'密码正确！':"密码错误"}
                        >
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
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
                                disabled={hasErrors(getFieldsError())||getFieldValue("userName")!=="pengxu"||getFieldValue("password")!=="123456"}
                                onClick={this.goBack}
                            >
                                登陆
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default formNormalHorizontal = Form.create()(formNormalHorizontal);