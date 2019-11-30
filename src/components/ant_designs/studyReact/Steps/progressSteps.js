import {Button, Col, Icon, Row, Steps,message} from 'antd';
import React from "react";
import PageHeader from "../../components/pageHeader";
import MenuSelects from "../../antDesignList/menuSelects";
const Step = Steps.Step;

const steps = [{
    title: 'First',
    content: 'First-content',
}, {
    title: 'Second',
    content: 'Second-content',
}, {
    title: 'Last',
    content: 'Last-content',
}];

class progressSteps extends React.Component {
    selectPage = (page) => {
        console.log("我的数据", page);
        this.props.history.push(page)
    }
    goBack = () => {
        this.props.history.push("/");
    }
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        const { current } = this.state;
        return (
            <PageHeader  title={"Steps步骤条:引导用户按照流程完成任务的导航条。"}>
                <Row gutter={12}>
                    <Col span={4}>
                        <MenuSelects  selectedKey="progressSteps" openKey="Steps"
                                      selectPage={this.selectPage} goBack={this.goBack}/>
                    </Col>
                    <Col span={20} >
                        <div>
                            <Steps current={current}>
                                {steps.map(item => <Step key={item.title} title={item.title} />)}
                            </Steps>
                            <div className="steps-content">{steps[current].content}</div>
                            <div className="steps-action">
                                {
                                    current < steps.length - 1
                                    && <Button type="primary" onClick={() => this.next()}>Next</Button>
                                }
                                {
                                    current === steps.length - 1
                                    && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                                }
                                {
                                    current > 0
                                    && (
                                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                            Previous
                                        </Button>
                                    )
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </PageHeader>
        );
    }
}
export default progressSteps;