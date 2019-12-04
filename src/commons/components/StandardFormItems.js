import React, {Component} from 'react';
import StandardFormItem from "./StandardFormItem";
import PropTypes from 'prop-types';


export const SelectWithServiceItem=(props)=>{
    return <StandardFormItem {...props} type="selectWithService"/>
}
export const SearchTableItem=(props)=>{
    return <StandardFormItem {...props} type="searchTable"/>
}
export const TreeSelectWithServiceItem=(props)=>{
    return <StandardFormItem {...props} type="treeSelect"/>
}
export const DatePickerItem=(props)=>{
    return <StandardFormItem {...props} type="datePicker"/>
}
export const RadioGroupItem=(props)=>{
    return <StandardFormItem {...props} type="radio"/>
}
export const SelectItem=(props)=>{
    return <StandardFormItem {...props} type="select"/>
}
export const InputNumberItem=(props)=>{
    return <StandardFormItem {...props} type="inputNumber"/>
}
export const UploadFileItem=(props)=>{
    return <StandardFormItem {...props} type="upload"/>
}
export const CheckboxItem=({...props})=>{
    return <StandardFormItem {...props} type="checkbox"/>
}
export const InputItem=(props)=>{
    //补丁，消除没有rules无法填写的问题
    if(!props.rules){
            props = {rules:[{required: false, message: ''}],...props}
    }
    return <StandardFormItem {...props} type="input" />
}
export const DataSelectWithCodeItem=(props)=>{
    return <StandardFormItem {...props}  type="dataSelect"/>
}
export const RangePickerItem=(props)=>{
    return <StandardFormItem {...props} type="rangePicker"/>
}

//开发环境使用
const propTypes = {
    maxLength:PropTypes.number,
    form: PropTypes.object.isRequired,
    code: PropTypes.any.isRequired,
    categoryCode: PropTypes.string,
    name: PropTypes.any,
    initialvalue: PropTypes.any,
    formlayout: PropTypes.any,
    rules: PropTypes.any,
    config:PropTypes.object,
    onChange:PropTypes.func,
    span:PropTypes.number,
    placeholder:PropTypes.string,
    hidden:PropTypes.bool,
    disabled:PropTypes.bool,
    selectChange:PropTypes.func,
    toolTip:PropTypes.any,
    desc:PropTypes.any,
    params:PropTypes.any,
    options:PropTypes.any,
    allowClear:PropTypes.any,
    ignoreDetail:PropTypes.bool,
    thousandth:PropTypes.bool,
    textValue:PropTypes.string,
    validator:PropTypes.any,
};
InputItem.propTypes = propTypes;
SelectWithServiceItem.propTypes = propTypes;
CheckboxItem.propTypes = propTypes;
UploadFileItem.propTypes = propTypes;
InputNumberItem.propTypes = propTypes;
RadioGroupItem.propTypes = propTypes;
DatePickerItem.propTypes = propTypes;
TreeSelectWithServiceItem.propTypes = propTypes;
SearchTableItem .propTypes = propTypes;
DataSelectWithCodeItem.propTypes = propTypes;
SelectItem.propTypes = propTypes;
