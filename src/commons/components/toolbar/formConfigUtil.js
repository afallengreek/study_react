/**
 * @Description:
 * @Author: CHEHSHUANG
 * @Date: 2019/2/28
 */
import React from "react";
import {Checkbox, Col, DatePicker, Input, InputNumber, Radio, Row, Select, Switch, Form} from "antd";
import moment from "moment";
import SelectWithService from "../SelectWithService";
import SearchTable from "../SearchTable";
import TreeSelectWithService from "../TreeSelectWithService";
import UploadFile from "../UploadFile";
import RangeDatePicker from "../RangeDatePicker";

export const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16}
}

export const getFormItems = (formConfig,form,otherCfg) => {
    const {rowColNum=2,formItemStyle} = otherCfg;
    //获取表单项配置formConfig、每行显示的列个数rowColNum
    if (formConfig) {
        let colSpan = Math.ceil(24/rowColNum),rowNum = Math.ceil(formConfig.length / rowColNum);
        let rowList = [];
        for (let i = 0; i < rowNum; i++) {
            let colList = [];
            if(i===(rowNum-1)){
                for (let j = i*rowColNum; j < formConfig.length; j++) {
                    const item = formConfig[j];
                    let col = getColItem(item,form,colSpan,formItemStyle);
                    colList.push(col);
                }
            }else{
                for (let j = 0; j < rowColNum; j++) {
                    const item = formConfig[i*rowColNum+j];
                    let col = getColItem(item,form,colSpan,formItemStyle);
                    colList.push(col);
                }
            }
            let row = (<Row key={i} gutter={6} > {colList} </Row>);
            rowList.push(row)
        }
        return rowList;
    } else {
        return null;
    }
}
export const getColItem = (item,form,colSpan,formItemStyle) => {
    const {getFieldDecorator} = form;
    return (
        <Col key={item.name} span={item.colSpan||colSpan}>
            <Form.Item
                style={formItemStyle||{}}
                {...(item.formItemLayout||formItemLayout)}
                label={item.label}
            >
                { getFieldDecorator(item.name,{...getDecoratorProps(item,form)})(getComponent(item,form))}
            </Form.Item>
        </Col>
    );
}

export const getDecoratorProps= (item,form)=>{
    let decoratorProps = {};
    let initValue = item.initialValue||"";
    if(item.initialValue === 0){
        initValue =0;
    }else {
        initValue = item.initialValue || "";
    }
    if(item.type === 'datePicker'&&initValue){
        initValue = moment(initValue,item.props.format||"YYYY-MM-DD")
    }
    if(item.rules&&item.validator){
        item.rules.push({
            validator: (rules,value,callback)=>{item.validator(rules,value,callback,form)}
        });
    }
    decoratorProps.initialValue = initValue;
    if(item.type==="switch"||item.type==="checkbox"){
        decoratorProps.valuePropName =  'checked';
        if(item.type==="checkbox"){
            decoratorProps.initialValue = item.initialValue;
        }
    }

    decoratorProps.rules = item.rules?item.rules:'';
    return decoratorProps;
}
export const getComponent = (item,form) => {
    if(!item.props.style){
        item.props.style = {width:"100%"};
    }else if(!item.props.style.width){
        item.props.style = {...item.props.style, width:"100%"};
    }
    switch (item.type) {
        case 'selectWithService':
            if (item.props&&item.props.params) {
                let params = {}
                let key = Object.keys(item.props.params)[0];
                params['' + key] = form.getFieldValue(item.props.params[key]);
                return <SelectWithService  {...{...item.props, params}}/>;
            } else {
                return <SelectWithService  {...item.props}/>;
            }
        case 'searchTable':
            if (item.props&&item.props.params) {
                let params = {}
                //不执行数据默认赋值，自己查询
                if(!item.props.notGet) {
                    item.props.params.forEach(key => params[key] = form.getFieldValue(key));
                }else{
                    params = item.props.params;
                }
                return <SearchTable  {...{...item.props, params}}/>;
            } else {
                return <SearchTable {...item.props} />;
            }
        case 'treeSelect':
            return <TreeSelectWithService {...item.props}/>;
        case 'select':
            return (
                <Select {...item.props} >
                    {item.data ? item.data.map(value =>
                        <Select.Option key={value.value} value={value.value}>{value.text}</Select.Option>
                    ) : null}
                </Select>);
        case 'radioGroup':
            return (
                <Radio.Group {...item.props}>
                    {item.children ? item.children.map((value, index, array) => (
                        <Radio key={value.value} value={value.value}>{value.text}</Radio>
                    )) : null}
                </Radio.Group>);
        case 'datePicker':
            return <DatePicker {...item.props}/>;
        case 'rangeDatePicker':
            return <RangeDatePicker {...item.props}/>;
        case 'switch':
            return <Switch {...item.props}/>;
        case 'inputNumber':
            return <InputNumber {...item.props}/>;
        case 'checkbox':
            return <Checkbox {...item.props} style={{width:"100%"}}> {item.children || null}</Checkbox>;
        case "textArea":
            return <Input.TextArea {...item.props}/>;
        case 'upload':
            return <UploadFile {...item.props}/>;
        default:
            return <Input {...item.props}/>;
    }
}
