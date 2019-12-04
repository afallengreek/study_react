/**
 * @description 详情、新增编辑页面固定表头
 * @author 刘松林
 * @date 2018.12.19
 */
import React from 'react';
import {Layout} from "antd";
import PropTypes from 'prop-types';
const {Header, Content} = Layout;

const PageHeader = props => {
    const children = props.children;
    return (
        <Layout>
                <Header className={'layout-header'} style={{display:props.showHeader===false?'none':'flex'}}>
                    <div className={'header-span'}>
                        {props.title}
                    </div>
                    <div>
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
    //标题头，居左
    title:PropTypes.any,
    //标题扩展，居右
    extra:PropTypes.node,
    //是否显示头，主要用作流程表单时不显示头
    showHeader:PropTypes.bool,
};

export default PageHeader;
