/**
 * @Description:
 * @Author: CHEHSHUANG
 * @Date: 2018/9/27
 */

import React, {Component} from "react"
import {Button, Form, Input,Dropdown} from "antd";
import UploadFile from "../UploadFile";
import AdvanceSearchModal from "./AdvanceSearchModal";
import "./index.css"
import {formItemLayout, getComponent, getDecoratorProps} from "./formConfigUtil";
import CheckAuth from '../CheckAuth';
import { ImportButton } from 'seid'
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
class ToolBar extends Component {
    state = {
        visible: false
    }
    getRightItems = () => {
        const {rightCfg,searchBtnCfg} = this.props;
        let components = null;
        let cfg = rightCfg ? rightCfg : searchBtnCfg;
        if (cfg) {
            components = this.getItems(cfg);
        }
        return components;
    }
    setVisible = (visible) => {
        this.setState({visible: visible})
    }
    getLeftItems = () => {
        const {leftCfg,btnsCfg} = this.props;
        let components = null;
        let cfg = leftCfg ? leftCfg : btnsCfg;
        if (cfg) {
            components = this.getItems(cfg)
        }
        return components;
    }
    getItems = (cfgs) => {
        return cfgs.map(
            (item, i) => {
                let component = null;
                item.props = item.props || {};
                item.props.className = item.props.className ? `tbar-btn ${item.props.className}` : "tbar-btn";
                switch (item.type) {
                    case "dropdown":
                        component = (<Dropdown trigger={['click']} overlay={item.menu} placement="bottomCenter"><Button {...item.props}>{item.name}</Button></Dropdown>)
                        break;
                    case "import":
                        component = (<ImportButton key={i} {...item.props} />);
                        break;
                    case "advanceSearch":
                        component = (<Button key={i} {...item.props} onClick={() => {this.setVisible(true)}}>{item.title}</Button>);
                        break;
                    case "search":
                        item.props.className = item.props.className ? `tbar-search ${item.props.className}` : 'tbar-search';
                        component =  (<Input.Search  key={i} {...item.props} />);
                        break;
                    case "uploadFile":
                        component = (<UploadFile key={i} title={item.title} {...item.props} />);
                        break;
                    case "form":
                        component = (
                            <Form
                                style={item.style?item.style:{}}
                                className={"tbar-form"}
                                key={i}
                                layout="inline"
                            >
                                {
                                    item.formItems.map(item => (
                                        this.getColItem(item)
                                    ))
                                }
                                {
                                    item.onSearch ? (<Button type="primary"
                                                             onClick={() => this.handleSearch(item)}>{seiIntl.get({key: 'gwmBdm_000073', desc: '查询'})}</Button>) : null
                                }
                            </Form>);
                        break;
                    case "buttonGroup":
                        component = (
                            <Button.Group key={i}>
                                {
                                    item.items.map((child, index) => {
                                        component = (<Button key={index} {...child.props}>{child.title}</Button>);
                                        if (child.operateCode) {
                                            return (
                                                <CheckAuth operateCode={child.operateCode} key={index}>
                                                    {component}
                                                </CheckAuth>
                                            );
                                        }
                                        return component;
                                    })
                                }
                            </Button.Group>);
                        break;
                    default:
                        component = (<Button key={i} {...item.props}>{item.title}</Button>);
                        break;
                }
                if (item.operateCode) {
                    return (<CheckAuth operateCode={item.operateCode} key={i}>
                        {component}
                    </CheckAuth>)
                }
                return component
            });
    }
    handleSearch = (item) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                item.onSearch && item.onSearch(values)
            }
        })
    }
    getColItem = (item) => {
        const {form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <Form.Item
                key={item.name}
                {...(item.formItemLayout || formItemLayout)}
                label={item.label}
            >
                {getFieldDecorator(item.name, {...getDecoratorProps(item, form)})(getComponent(item, form))}
            </Form.Item>
        );
    }

    render() {
        const {rightCfg, border, style} = this.props;
        let advanceSearch = null;
        if(rightCfg&&rightCfg.length>0){
            advanceSearch =  rightCfg.find(item => item.type==="advanceSearch");
        }
        return (
            <div className={['tbar-box', border ? 'has-border' : ''].join(" ")} style={style}>
                <div className={'tbar-btn-box'}>
                    {
                        this.getLeftItems()
                    }
                </div>
                <div className={'tbar-search-box'}>
                    {
                        this.getRightItems()
                    }
                    { this.props.children }
                </div>
                {
                    advanceSearch ? (
                        <AdvanceSearchModal
                            visible={this.state.visible}
                            setVisible={this.setVisible}
                            {...advanceSearch.props}
                        />
                    ) : null
                }

            </div>
        );
    }
}

export default Form.create()(ToolBar);
