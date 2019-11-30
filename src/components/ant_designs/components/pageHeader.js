// 基础组件 页面头


import React from 'react';
import {Layout} from "antd";
import PropTypes from 'prop-types';

const {Header, Content} = Layout;

const PageHeader = props => {
    const children = props.children;
    return (
        <Layout>
            <Header theme={"light"} className={'layout-header'}
                    style={{display:props.showHeader===false?'none':'flex'}}>
                <div className={'header-span'} style={{color:"#fff",marginLeft:"220px",fontSize:"18px"}}>
                    {props.title}
                </div>
                <div style={{color:"#fff",fontSize:"25px"}}>
                    {props.extra}
                </div>
            </Header>
            <Content className={'content-wrapper'}>
                {React.Children.map(children, (child, i) => {
                    return child;
                })}
            </Content>
        </Layout>
    );
};

PageHeader.propTypes = {
    title:PropTypes.any,
    extra:PropTypes.node
};

export default PageHeader;