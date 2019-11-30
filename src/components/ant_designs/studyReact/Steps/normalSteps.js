import {Col, Icon, Popover, Row, Steps} from 'antd';
import React from "react";
import PageHeader from "../../components/pageHeader";
import MenuSelects from "../../antDesignList/menuSelects";
const Step = Steps.Step;
class normalSteps extends React.Component {
    selectPage = (page) => {
        console.log("我的数据", page);
        this.props.history.push(page)
    }
    goBack = () => {
        this.props.history.push("/");
    }
    render() {
        const customDot = (dot, { status, index }) => (
            <Popover content={<span>step {index} status: {status}</span>}>
                {dot}
            </Popover>
        );
        return (
            <PageHeader  title={"Steps步骤条:引导用户按照流程完成任务的导航条。"}>
                <Row gutter={12}>
                    <Col span={4}>
                        <MenuSelects  selectedKey="normalSteps" openKey="Steps"
                                      selectPage={this.selectPage} goBack={this.goBack}/>
                    </Col>
                    <Col span={20} >
                        <Steps current={1}>
                            <Step title="完成" description="This is a description." />
                            <Step title="过程中" description="This is a description." />
                            <Step title="未完成" description="This is a description." />
                        </Steps>
                        <br/>
                        <Steps size="small" current={1}>
                            <Step title="Finished" />
                            <Step title="In Progress" />
                            <Step title="Waiting" />
                        </Steps>
                        <br/>
                        <Steps>
                            <Step status="finish" title="Login" icon={<Icon type="user" />} />
                            <Step status="finish" title="Verification" icon={<Icon type="solution" />} />
                            <Step status="process" title="Pay" icon={<Icon type="loading" />} />
                            <Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
                        </Steps>
                        <br/>
                        <Steps direction="vertical" current={1}>
                            <Step title="Finished" description="This is a description." />
                            <Step title="In Progress" description="This is a description." />
                            <Step title="Waiting" description="This is a description." />
                        </Steps>
                        <br/>
                        <Steps current={1} status="error">
                            <Step title="Finished" description="This is a description" />
                            <Step title="In Process" description="This is a description" />
                            <Step title="Waiting" description="This is a description" />
                        </Steps>
                        <br/>
                        <Steps current={1} progressDot={customDot}>
                            <Step title="Finished" description="You can hover on the dot." />
                            <Step title="In Progress" description="You can hover on the dot." />
                            <Step title="Waiting" description="You can hover on the dot." />
                            <Step title="Waiting" description="You can hover on the dot." />
                        </Steps>
                    </Col>
                </Row>
            </PageHeader>

        );
    }
}
export default normalSteps;
