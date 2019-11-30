import {AutoComplete, Col, Row, Input, Icon, Button} from 'antd';
import React from "react";
import PageHeader from "../../components/pageHeader";
import MenuSelects from "../../antDesignList/menuSelects";

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const { TextArea } = Input;

function renderTitle(title) {
    return (
        <span>
      {title}
            <a
                style={{ float: 'right' }}
                href="https://www.google.com/search?q=antd"
                target="_blank"
                rel="noopener noreferrer"
            >更多
      </a>
    </span>
    );
}
function onSelect(value) {
    console.log('onSelect', value);
}

function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

function searchResult(query) {
    return (new Array(getRandomInt(5))).join('.').split('.')
        .map((item, idx) => ({
            query,
            category: `${query}${idx}`,
            count: getRandomInt(200, 100),
        }));
}

function renderOption(item) {
    return (
        <Option key={item.category} text={item.category}>
            {item.query} 在
            <a
                href={`https://s.taobao.com/search?q=${item.query}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                {item.category}
            </a>
            区块中
            <span className="global-search-item-count">约 {item.count} 个结果</span>
        </Option>
    );
}
class normalAutoComplete extends React.Component {
    state = {
        dataSource: [],
        result: [],
        dataSource1: [],
    }
    selectPage = (page) => {
        console.log("我的数据", page);
        this.props.history.push(page)
    }

    handleSearchCom= (value) => {
        let result;
        if (!value || value.indexOf('@') >= 0) {
            result = [];
        } else {
            result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
        }
        this.setState({ result });
    }
    goBack = () => {
        this.props.history.push("/");
    }
    handleSearch = (value) => {
        this.setState({
            dataSource: !value ? [] : [
                value,
                value + value,
                value + value + value,
            ],
        });
    }
    handleSearch2= (value) => {
        this.setState({
            dataSource: value ? searchResult(value) : [],
        });
    }
    handleSearch3 = (value) => {
        this.setState({
            dataSource1: value ? searchResult(value) : [],
        });
    }
    render() {
        const { dataSource } = this.state;
        const { result } = this.state;
        const children = result.map(email => <Option key={email}>{email}</Option>);
        const dataSources = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
        const dataSourceItem = [{
            title: '话题',
            children: [{
                title: 'AntDesign',
                count: 10000,
            }, {
                title: 'AntDesign UI',
                count: 10600,
            }],
        }, {
            title: '问题',
            children: [{
                title: 'AntDesign UI 有多好',
                count: 60100,
            }, {
                title: 'AntDesign 是啥',
                count: 30010,
            }],
        }, {
            title: '文章',
            children: [{
                title: 'AntDesign 是一个设计语言',
                count: 100000,
            }],
        }];
        const options = dataSourceItem.map(group => (
            <OptGroup
                key={group.title}
                label={renderTitle(group.title)}
            >
                {group.children.map(opt => (
                    <Option key={opt.title} value={opt.title}>
                        {opt.title}
                        <span className="certain-search-item-count">{opt.count} 人 关注</span>
                    </Option>
                ))}
            </OptGroup>
        )).concat([
            <Option disabled key="all" className="show-all">
                <a
                    href="https://www.google.com/search?q=antd"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    查看所有结果
                </a>
            </Option>,
        ]);
        const { dataSource1 } = this.state;
        return (
            <PageHeader  title={"AutoComplete自动完成:输入框自动完成功能。"}>
                <Row gutter={12}>
                    <Col span={4}>
                        <MenuSelects  selectedKey="normalAutoComplete" openKey="AutoComplete"
                                      selectPage={this.selectPage} goBack={this.goBack}/>
                    </Col>
                    <Col span={20} >
                        <AutoComplete
                            dataSource={dataSource}
                            style={{ width: 200 }}
                            onSelect={onSelect}
                            onSearch={this.handleSearch}
                            placeholder="input here"
                        />
                        <br/>
                        <br/>
                        <AutoComplete
                            style={{ width: 200 }}
                            onSearch={this.handleSearchCom}
                            placeholder="@.com"
                        >
                            {children}
                        </AutoComplete>
                        <br/>
                        <br/>
                        <AutoComplete
                            dataSource={dataSource}
                            style={{ width: 200 }}
                            onSelect={onSelect}
                            onSearch={this.handleSearch}
                        >
                        <TextArea
                            placeholder="input here"
                            className="custom"
                            style={{ height: 50 }}
                            onKeyPress={this.handleKeyPress}
                        />
                        </AutoComplete>
                        <br/>
                        <br/>
                        <AutoComplete
                            style={{ width: 200 }}
                            dataSource={dataSources}
                            placeholder="try to type `b`"
                            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        />
                        <br/>
                        <br/>
                        <div className="certain-category-search-wrapper" style={{ width: 250 }}>
                            <AutoComplete
                                className="certain-category-search"
                                dropdownClassName="certain-category-search-dropdown"
                                dropdownMatchSelectWidth={false}
                                dropdownStyle={{ width: 300 }}
                                size="large"
                                style={{ width: '100%' }}
                                dataSource={options}
                                placeholder="input here"
                                optionLabelProp="value"
                            >
                                <Input   suffix={<Icon type="search" className="certain-category-icon" style={{right:"12px"}} />} />
                            </AutoComplete>
                        </div>
                        <br/>
                        <br/>
                        <div className="global-search-wrapper" style={{ width: 300 }}>
                            <AutoComplete
                                className="global-search"
                                size="large"
                                style={{ width: '100%' }}
                                dataSource={dataSource1.map(renderOption)}
                                onSelect={onSelect}
                                onSearch={this.handleSearch3}
                                placeholder="input here"
                                optionLabelProp="text"
                            >
                                <Input
                                    suffix={(
                                        <Button className="search-btn" size="large" type="primary">
                                            <Icon type="search" />
                                        </Button>
                                    )}
                                />
                            </AutoComplete>
                        </div>
                    </Col>
                </Row>
            </PageHeader>

        );
    }
}
export default normalAutoComplete;