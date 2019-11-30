import {Col, Pagination, Row} from 'antd';
import React from "react";
import PageHeader from "../../components/pageHeader";
import MenuSelects from "../../antDesignList/menuSelects";
class normalPagination extends React.Component {

    state = {
        current: 3,
    }

    onChange1 = (page) => {
        console.log(page);
        this.setState({
            current: page,
        });
    }
    selectPage=(page)=>{
        console.log("我的数据",page);
        this.props.history.push(page)
    }
    goBack=()=>{
        this.props.history.push("/");
    }
    onChange=(pageNumber)=> {
        console.log('Page: ', pageNumber);
    }
    onShowSizeChange=(current, pageSize)=>{
        console.log(current, pageSize);
    }
    showTotal=(total)=> {
        return `Total ${total} items`;
    }
    itemRender=(current, type, originalElement)=> {
        if (type === 'prev') {
            return <a>Previous</a>;
        } if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    }
    render() {
        return (
            <PageHeader  title={"Pagination分页:采用分页的形式分隔长列表，每次只加载一个页面。"}>
                <Row gutter={12}>
                    <Col span={4}>
                        <MenuSelects  selectedKey="normalPagination" openKey="Pagination"
                                      selectPage={this.selectPage} goBack={this.goBack}/>
                    </Col>
                    <Col span={20} >
                        <Pagination defaultCurrent={1} total={100} />
                        <br/><br/>
                        <Pagination showSizeChanger onShowSizeChange={this.onShowSizeChange} defaultCurrent={3} total={500} />
                        <br/><br/>
                        <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={this.onChange} />
                        <br/><br/>
                        <Pagination size="small" total={50} showTotal={this.showTotal} />
                        <br/><br/>
                        <Pagination simple defaultCurrent={2} total={50} />
                        <br/><br/>
                        <Pagination current={this.state.current} onChange={this.onChange1} total={50} />
                        <br/><br/>
                        <Pagination
                            total={85}
                            showTotal={total => `Total ${total} items`}
                            pageSize={20}
                            defaultCurrent={1}
                        />
                        <br />
                        <Pagination
                            total={85}
                            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                            pageSize={20}
                            defaultCurrent={1}
                        />
                        <br/><br/>
                        <Pagination total={500} itemRender={this.itemRender} />
                    </Col>
                </Row>
            </PageHeader>

        );
    }
}
export default normalPagination;