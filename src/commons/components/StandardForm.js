/**
 * @description 通过配置生成表单
 * @author 刘松林
 * @date 2018.12.19
 */
import React from 'react';
import SearchTable from './SearchTable'
import { Form, Radio, InputNumber, Row, Col, Input, DatePicker, Checkbox, Select, Button } from 'antd';
import SelectWithService from './SelectWithService';
import TreeSelectWithService from './TreeSelectWithService'
import RangeDatePicker from './RangeDatePicker'
import UploadFile from './UploadFile'
import moment from 'moment';
import 'moment/locale/zh-cn';
import { isEmpty, isEqual, cloneDeep } from 'lodash';
import DataSelectWithCode from "./DataSelectWithCode";
import {getUUID} from "../utils/CommonUtils";
moment.locale('zh-cn');

const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD';
const { MonthPicker } = DatePicker;

class StandardForm extends React.Component {
    constructor(props) {
        super(props);
        this.mounted = true;
        this.editDataTemp = this.props.editData;
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.editData, this.props.editData)) {
            if (!isEmpty(nextProps.editData)) {
                let finalEditData = getExzactField(nextProps.fieldsConfig, nextProps.editData)
                this.props.form.setFieldsValue(finalEditData)
            } else {
                this.props.form.resetFields();
            }
        }
    }

    componentWillUnmount() {
        this.mounted = false
        this.setState = () => {return;}
    }

    getItem = (item, disabled) => {
        const { children, data, type, params, multiple, treeCheckable, code, name, rules, defaultValue, labelCol, wrapperCol, formatThousands, ...rest } = item;
        switch (type) {
            case 'select':
                return <SelectWithService disabled={disabled} config={item.children} params={params} {...rest} />;
            case 'selectWithData':
                return <Select disabled={disabled} style={{ width: "100%" }} {...rest}>
                    {item.data.map(dataItem => <Select.Option key={dataItem.value} value={dataItem.value}>{dataItem.text}</Select.Option>)}
                </Select>
            case 'searchTable':
                return <SearchTable disabled={disabled} params={params} config={children} multiple={multiple} {...rest} />;
            case 'treeSelect':
                return <TreeSelectWithService disabled={disabled} params={params} config={children} treeCheckable={treeCheckable} {...rest} />
            case 'datePicker':
                return <DatePicker disabled={disabled} style={{ width: '100%' }} {...rest} />
            case 'month':
                return <MonthPicker disabled={disabled} format={'YYYY/MM'} style={{ width: '100%' }} {...rest} />
            case 'rangePicker':
                return <RangeDatePicker format={'YYYY/MM/DD'} disabled={disabled} style={{ width: '100%' }} {...rest} />
            case 'inputNumber':
                let formatterObj = {};
                if (formatThousands) {
                    formatterObj = {
                        formatter: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                        parser: value => value.replace(/\$\s?|(,*)/g, '')
                    };
                }
                return (<InputNumber
                    disabled={disabled}
                    {...formatterObj}
                    style={{ width: '100%' }} {...rest}
                />);
            case 'textArea':
                return <Input.TextArea disabled={disabled} rows={4} maxLength={500} {...rest} />
            case 'upload':
                return <UploadFile disabled={disabled} entityId={params} {...rest} />
            case 'checkBox':
                return (
                    <Checkbox.Group disabled={disabled} style={{ width: "100%" }} {...rest}>
                        {data ? data.map(subCheck => <Checkbox key={subCheck} value={subCheck} />) : null}
                    </Checkbox.Group>
                )
            case 'radio':
                return <Radio.Group disabled={disabled} {...rest}>
                    {data ? data.map(subRadio => <Radio key={subRadio.value} value={subRadio.value}>{subRadio.text}</Radio>) : null}
                </Radio.Group>
            case 'dataSelect':
                return <DataSelectWithCode disabled={disabled} categoryCode={params} {...rest}/>
            // case 'button':
            //     return <Button {...rest}>{name}</Button>
            default: return <Input disabled={disabled} autoComplete="off" maxLength={128} {...rest} />
        }
    }

    formmater = {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 }
    }
    getRows = () => {
        const { form, doubleLine, trebleLine, fieldsConfig, formmater, disabled } = this.props;
        let showLen = doubleLine ? 2 : (trebleLine ? 3 : 1);
        let rowLen = Math.ceil(fieldsConfig.length/showLen);
        let rowArr = [];
        let hiddenEle = [];
        let validEle = [];
        fieldsConfig.forEach(item => {
            if(item.hidden){
                hiddenEle.push(item)
            }else if(typeof item === "object"){
                validEle.push(item)
            }
        });
        if(hiddenEle && hiddenEle.length>0){
            let cols = [];
            hiddenEle.map((item,index)=>{
                let col = this.getCols(item,"hidden_"+index);
                cols.push(col);
            });
            rowArr.push(<Row key={"hidden-row"}>{cols}</Row>)
        }
        for(let i=0;i<rowLen;i++){
            let colList = [];
            if(i===(rowLen-1)){
                for (let j = i*showLen; j < validEle.length; j++) {
                    const item = validEle[j];
                    let col = this.getCols(item,j);
                    colList.push(col);
                }
            }else{
                for (let j = 0; j < showLen; j++) {
                    const item = validEle[i*showLen+j];
                    let col = this.getCols(item,j);
                    colList.push(col);
                }
            }
            let row = (<Row key={i} > {colList} </Row>);
            rowArr.push(row)
        }
        return rowArr;
    }
    getCols = (item,index) => {
        const { form, doubleLine, trebleLine, fieldsConfig, formmater, disabled } = this.props;
        const defaultFormmater = formmater ? formmater : this.formmater
        const { getFieldDecorator } = form;
        const editDataTemp = this.props.editData;
        const span = doubleLine ? 12 : trebleLine ? 8 : 24
        if(typeof item !== "object"){
            return;
        }
        if (Object.keys(item).length === 0) {
            return;
        }
        if (item.type === 'empty') {
            return;
        }
        if (item.type === 'space') {
            return <Col key={`${index}_space`} span={span}><FormItem></FormItem></Col>
        }
        if (item.type === 'inputBut'){
            let codes = item.code.split('.')
            return <Col key={`${item.code}_col_${index}`} span={span} style={{ display: item.hidden ? 'none' : 'block' }}>
                <FormItem {...defaultFormmater} label={item.name}>
                    <Col span={14}>
                        {getFieldDecorator(item.code, {
                            initialValue: !isEmpty(editDataTemp) && !isEmpty(editDataTemp[codes[0]]) ? (item.type === 'datePicker' ? editDataTemp[codes[0]][codes[1]] ? moment(editDataTemp[codes[0]][codes[1]], dateFormat) : null : editDataTemp[codes[0]][codes[1]]) : item.defaultValue,
                            rules: item.rules ? item.rules : '',
                        })(<Input disabled={item.disabled} autoComplete="off" maxLength={128}/>)}
                    </Col>
                    <Col span={10}>
                        <Button {...item.children}>{item.childrenName}</Button>
                    </Col>
                </FormItem>
            </Col>
        }
        if (item instanceof Array) {
            return (<Col key={`${item.code}_col_${index}`} span={span} style={{ display: item.hidden ? 'none' : 'block' }}>
                <FormItem key={item} {...defaultFormmater} label={item[0].name}>
                    {item.map((subItem, i) => {
                        return (<Col key={subItem.code} style={{ paddingRight: (i === item.length - 1) ? 0 : 8 }} span={24 / item.length}>
                            <FormItem>
                                {getFieldDecorator(subItem.code, {
                                    initialValue: defaultValue(editDataTemp, subItem),
                                    rules: subItem.rules ? subItem.rules : '',
                                })(this.getItem(subItem, disabled))}
                            </FormItem>
                        </Col>)
                    })}
                </FormItem>
            </Col>)
        } else {
            if (item.code.includes('.')) {
                let codes = item.code.split('.')
                return (<Col key={`${item.code}_col_${index}`} span={span} style={{ display: item.hidden ? 'none' : 'block' }}>
                    <FormItem {...defaultFormmater} label={item.name}>
                        {getFieldDecorator(item.code, {
                            initialValue: !isEmpty(editDataTemp) && !isEmpty(editDataTemp[codes[0]]) ? (item.type === 'datePicker' ? editDataTemp[codes[0]][codes[1]] ? moment(editDataTemp[codes[0]][codes[1]], dateFormat) : null : editDataTemp[codes[0]][codes[1]]) : item.defaultValue,
                            rules: item.rules ? item.rules : '',
                        })(this.getItem(item, disabled))}
                    </FormItem>
                </Col>)
            }
            return (<Col key={`${item.code}_col_${index}`} span={span} style={{ display: item.hidden ? 'none' : 'block' }}>
                <FormItem key={item.code} {...defaultFormmater} label={item.name}>
                    {getFieldDecorator(item.code, {
                        initialValue: defaultValue(editDataTemp, item),
                        rules: item.rules ? item.rules : '',
                    })(this.getItem(item, disabled))}
                </FormItem>
            </Col>)
        }
    }

    render() {
        /* const { form, doubleLine, trebleLine, fieldsConfig, formmater, disabled } = this.props;
         const editDataTemp = this.editDataTemp;
         const defaultFormmater = formmater ? formmater : this.formmater
         const { getFieldDecorator } = form;
         const span = doubleLine ? 12 : trebleLine ? 8 : 24*/
        return (
            <Row gutter={12} className={this.props.className} style={this.props.style}>

                {this.getRows()
                    /* todo cs 修改折行问题
                {fieldsConfig.map((item, index) => {
                     if (Object.keys(item).length === 0) {
                         return;
                     }
                     if (item.type === 'empty') {
                         return;
                     }
                     if (item.type === 'space') {
                         return <Col key={`${index}_space`} span={span}><FormItem></FormItem></Col>
                     }
                     if (item instanceof Array) {
                         return (<Col key={`${item.code}_col_${index}`} span={span} style={{ display: item.hidden ? 'none' : 'block' }}>
                             <FormItem key={item} {...defaultFormmater} label={item[0].name}>
                                 {item.map((subItem, i) => {
                                     return (<Col key={subItem.code} style={{ paddingRight: (i === item.length - 1) ? 0 : 8 }} span={24 / item.length}>
                                         <FormItem>
                                             {getFieldDecorator(subItem.code, {
                                                 initialValue: defaultValue(editDataTemp, subItem),
                                                 rules: subItem.rules ? subItem.rules : '',
                                             })(this.getItem(subItem, disabled))}
                                         </FormItem>
                                     </Col>)
                                 })}
                             </FormItem>
                         </Col>)
                     } else {
                         if (item.code.includes('.')) {
                             let codes = item.code.split('.')
                             return (<Col key={`${item.code}_col_${index}`} span={span} style={{ display: item.hidden ? 'none' : 'block' }}>
                                 <FormItem {...defaultFormmater} label={item.name}>
                                     {getFieldDecorator(item.code, {
                                         initialValue: !isEmpty(editDataTemp) && !isEmpty(editDataTemp[codes[0]]) ? (item.type === 'datePicker' ? editDataTemp[codes[0]][codes[1]] ? moment(editDataTemp[codes[0]][codes[1]], dateFormat) : null : editDataTemp[codes[0]][codes[1]]) : item.defaultValue,
                                         rules: item.rules ? item.rules : '',
                                     })(this.getItem(item, disabled))}
                                 </FormItem>
                             </Col>)
                         }
                         return (<Col key={`${item.code}_col_${index}`} span={span} style={{ display: item.hidden ? 'none' : 'block' }}>
                             <FormItem key={item.code} {...defaultFormmater} label={item.name}>
                                 {getFieldDecorator(item.code, {
                                     initialValue: defaultValue(editDataTemp, item),
                                     rules: item.rules ? item.rules : '',
                                 })(this.getItem(item, disabled))}
                             </FormItem>
                         </Col>)
                     }
                 })}*/}
            </Row>
        )
    }
}

function defaultValue(editDataTemp, item) {
    let defaulValue;
    if (isEmpty(editDataTemp)) {
        defaulValue = item.defaultValue
    } else {
        defaulValue = (editDataTemp[item.code] !== null && editDataTemp[item.code] !== undefined) ?
            editDataTemp[item.code] : item.defaultValue
    }
    if (typeof defaulValue === "undefined") {
        return;
    }
    if (item.type === 'datePicker' || item.type === 'month') {
        return moment(defaulValue, item.format ? item.format :dateFormat)
    } else if(item.type === 'searchTable'&&defaulValue&&typeof defaulValue==="object"){
        return defaulValue.id;
    }else{
        return defaulValue;
    }
}

function getExzactField(config, edit) {
    let keyList = getDeepKeys(edit);
    let temp = cloneDeep(edit)
    keyList.map(key => {
        // console.log(config.filter(con=>con.code === key))
        let flagArr = config.filter(con => {
            if (con instanceof Array) {
                return !isEmpty(con.filter(subCon => subCon.code === key))
            } else {
                return con.code === key
            }
        });
        if (flagArr.length===0) {
            if (key.includes('.')) {
                let keySplit = key.split('.')
                let con = config.filter(con => con.code === keySplit[0]);
                if(con[0] && (con[0].labelInValue || con[0].objVal)){
                    return;
                }
                if (temp[keySplit[0]]) {
                    delete temp[keySplit[0]][keySplit[1]]
                }
            }
            delete temp[key]
        }
    })
    config.map(con => {
        if (con.type === 'datePicker' || con.type === 'month') {
            if (edit[con.code]) {
                let format = con.type === 'datePicker' ? 'YYYY-MM-DD' : "YYYY-MM";
                if (con.format) {
                    format = con.format;
                }
                temp[con.code] = moment(edit[con.code], format)
            }else{
                temp[con.code] = null
            }
        }
    })
    return temp;
}

function getDeepKeys(obj) {
    let keys = [];
    for (let key in obj) {
        if (typeof obj[key] === "object") {
            let subkeys = getDeepKeys(obj[key]);
            keys = keys.concat(subkeys.map(function (subkey) {
                return key + "." + subkey;
            }));
        } else {
            keys.push(key);
        }
    }
    return keys;
}



StandardForm = Form.create()(StandardForm)


export default StandardForm;
