import React, {Component} from 'react';
import {Checkbox, Divider, PageHeader, Tabs, Row, Col, Form, Button} from 'antd';

const { TabPane } = Tabs;
const Description = ({ term, children, span = 12 }) => (
    <Col span={span}>
        <div className="description">
            <div className="term">{term}</div>
            <div className="detail">{children}</div>
        </div>
    </Col>
);
const formLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16}
}
const longFormLayout = {
    labelCol: {span: 12},
    wrapperCol: {span: 12}
}
class OneDetailShow extends Component {
    render=()=>{
        const content = (
            <div>
            <Row>
                <Col span={6} ><div style={{textAlign:"center",color:"red",
                    fontSize:"20px"}}>¥4080</div></Col>

                <Col span={18} >
                    <Row >
                        <Col span ={12}>
                        <Form.Item {...formLayout} label="订单编号">
                                        <span
                                            className='info'>{"MRESG44234321134"}</span>
                        </Form.Item>
                        </Col>
                        <Col span={12}>
                        <Form.Item {...formLayout} label="订单状态">
                                        <span className='info'>{"已出票"}</span>
                        </Form.Item>
                        </Col>
                    </Row>
                </Col>
               </Row>
                <Divider dashed style={{color:"black"}}/>
                <Row>
                    <Col span={6} ><div style={{textAlign:"center",color:"red",
                        fontSize:"20px"}}>
                        <Row>
                            <Col span={24}>
                                <Form.Item {...longFormLayout} label="平台票面价">
                                    <span className='info'>{"3880"+"（4.4折）"}</span>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item {...longFormLayout} label="税款">
                                    <span className='info'>{"0+200=200"}</span>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                        <Col span={24}>
                            <Form.Item {...longFormLayout} label="保险">
                                <span className='info'>{"0"}</span>
                            </Form.Item>
                        </Col>
                    </Row>
                        <Row>
                        <Col span={24}>
                            <Form.Item {...longFormLayout} label="服务费">
                                <span className='info'>{"0"}</span>
                            </Form.Item>
                        </Col>
                    </Row>
                        <Row>
                        <Col span={24}>
                            <Form.Item {...longFormLayout} label="机场服务费">
                                <span className='info'>{"0"}</span>
                            </Form.Item>
                        </Col>
                    </Row>
                    </div></Col>

                    <Col span={18} style={{marginTop:"25px"}}>
                        <Row>
                            <Col span ={12}>
                                <Form.Item {...formLayout} label="支付状态">
                                        <span
                                            className='info'>{"已支付"}</span>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item {...formLayout} label="出行类型">
                                    <span className='info'>{"因公"}</span>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span ={12}>
                                <Form.Item {...formLayout} label="订单来源">
                                        <span
                                            className='info'>{"web"}</span>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item {...formLayout} label="预订人">
                                    <span className='info'>{"长城股份"}</span>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span ={12}>
                                <Form.Item {...formLayout} label="预定日期">
                                        <span
                                            className='info'>{"2019/6/21 19:51:38"}</span>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item {...formLayout} label="政策来源">
                                    <span className='info'>{"商旅"}</span>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{textAlign:"center"}}><Button type="primary">查看多个联系人</Button></Row>
                    </Col>
                </Row>
            </div>
        );
        return(
            <div>
                <PageHeader
                    title="订单信息"
                >
                    <div className="wrap">
                        <div className="content padding">{content}</div>
                    </div>
                </PageHeader>
               <Divider/>
                <PageHeader
                    title="航班信息"
                />
                <Divider/>
                <PageHeader
                    title="乘客信息"
                />
                <Divider/>
                <PageHeader
                    title="其他信息"
                />
                <Divider/>
                <PageHeader
                    title="附加产品"
                />
                <Divider/>
            </div>
        )
   }


};

export default OneDetailShow;
