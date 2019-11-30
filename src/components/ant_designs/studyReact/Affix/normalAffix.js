import {Affix, Button, Col, Row} from 'antd';
import React from "react";
import PageHeader from "../../components/pageHeader";
import MenuSelects from "../../antDesignList/menuSelects";

class normalAffix extends React.Component {
    state = {
        top: 10,
        bottom: 10,
    }

    selectPage=(page)=>{
        console.log("我的数据",page);
        this.props.history.push(page)
    }
    goBack=()=>{
        this.props.history.push("/");
    }
    render() {
        return (
            <PageHeader  title={"Affix固钉:将页面元素钉在可视范围。"}>
                <Row>
                    <Col span={4}>
                        <MenuSelects  selectedKey="normalAffix" openKey="Affix"
                                      selectPage={this.selectPage} goBack={this.goBack}/>
                    </Col>
                    <Col span={20} >
                        <div style={{marginLeft:40,marginTop:40}}>
                            <Affix offsetTop={this.state.top}>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        this.setState({
                                            top: this.state.top + 10,
                                        });
                                    }}
                                >
                                    Affix top
                                </Button>
                            </Affix>
                            <br />
                            <Affix offsetBottom={this.state.bottom}>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        this.setState({
                                            bottom: this.state.bottom + 10,
                                        });
                                    }}
                                >
                                    Affix bottom
                                </Button>
                            </Affix>
                            <Affix offsetTop={120} onChange={affixed => console.log(affixed)} style={{marginLeft:40,marginTop:40}}>
                                <Button>120px to affix top</Button>
                            </Affix>
                            <div style={{marginLeft:40,marginTop:40}}  className="scrollable-container" ref={(node) => { this.container = node; }}>
                                <div className="background">
                                    <Affix target={() => this.container}>
                                        <Button type="primary">
                                            Fixed at the top of container
                                        </Button>
                                    </Affix>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </PageHeader>

        );
    }
}
export default normalAffix;