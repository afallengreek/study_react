/**
 * @description 标准化中间组件
 * @author 彭旭
 * @date 2018.12.19
 */
import React,{PureComponent} from 'react';
import SearchTable from './SearchTable'
import {Form, Radio, InputNumber, Col, Input, DatePicker, Checkbox, Tooltip,Select} from 'antd';
import SelectWithService from './SelectWithService';
import UploadFile from './UploadFile'
import moment from 'moment';
import 'moment/locale/zh-cn';
import DataSelectWithCode from "./DataSelectWithCode";
import TreeSelectWithService from "./TreeSelectWithService";
import SearchTableNew from "./SearchTableNew";
import { seiLocale } from 'sei-utils';

const { seiIntl } = seiLocale;

moment.locale('zh-cn');

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const {  RangePicker } = DatePicker;
const Option = Select.Option;
const currencyCodeStyleLeft = {width:"60%"}
const currencyCodeStyleRight = {width:"37%",marginLeft:"3%"};
class StandardFormItem extends PureComponent {
    //本地化数据，减少渲染次数
    ItemConfig = {};
    ItemRule = [];
    formLayoutTemp = {};
    itemSpan = 8;
    defaultFormLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
    getItem = (item,type) => {
        switch (type){
            case 'selectWithService':
                item.allowClear = true;
                return <SelectWithService {...item}/>;
            case 'searchTable':
                //新组建支持处置值不加载等新功能
                if(item.isNewItem){
                    return <SearchTableNew {...item}/>
                }else{
                    return <SearchTable  {...item}/>;
                }
            case 'treeSelect':
                return <TreeSelectWithService  {...item}/>
            case 'dataSelect':
                return <DataSelectWithCode  {...item}/>;
            case 'datePicker':
                return <DatePicker style={{width:'100%'}} {...item}/>
            case 'rangePicker':
                return <RangePicker style={{width:"100%"}} {...item}/>
            case 'monthDatePicker':
                return <RangePicker style={{width:"100%"}} {...item}/>
            case 'select':
                let options=[...item.options];
                let newOptions=options.map(function(value) {
                    return <Option key={value.value} value={value.value}>{value.text}</Option>
                })
                let allowClear = false;
                if(item.allowClear===false){
                    allowClear = false
                }else {
                    allowClear = true;
                }
                return  <Select {...item} style={{width:"100%"}} allowClear={allowClear}>
                            {newOptions}
                        </Select>
            case 'radio':
                 options=[...item.options];
                 newOptions=options.map(function(value) {
                    return <Radio key={value.value} value={value.value}>{value.text}</Radio>
                })
                return  <RadioGroup {...item}>
                    {newOptions}
                </RadioGroup>
            case 'inputNumber':
                //千分位统一设置
                if(item.thousandth){
                    item.formatter=(value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','))
                    item.parser=(value => value.replace(/\$\s?|(,*)/g, ''))
                }
                return <InputNumber  style={{width:'100%'}}  {...item}
                                     min={item.min||-9999999999999} max={item.max}
                                     precision={item.hasOwnProperty("precision")?item.precision:2}/>
            case 'textArea':
                return <Input.TextArea rows={4} maxLength={500} {...item}/>
            case 'upload':
                return <UploadFile entityId={item.entityId||null} {...item}/>
            case 'checkbox':
                return <Checkbox
                    {...item}
                />
            case 'input':
                return <Input autoComplete="off" maxLength={128||item.maxLength} {...item} />
        }
    };
    validatorFunc= (rule, value, callback) => {
        const min = this.props.min||0;
        if (value && value < min) {
            callback("值不能小于"+min+"!");
        } else {
            callback();
        }
    };
    render(){
        const {span,name,noToolTip,code,hidden,type,rules,formlayout,initialvalue,form,validator,...item} = this.props;
        this.itemSpan = span||this.itemSpan;
        //设置item的布局
        this.formLayoutTemp =formlayout|| this.defaultFormLayout;
        //设置item的基础设置
        //设置规则
        this.ItemRule = rules||this.ItemRule;
        this.validator = validator;
        //设置初始值
        if(type==="checkbox"){
            this.ItemConfig.initialValue = !!initialvalue;
        }else {
            this.ItemConfig.initialValue = initialvalue;
        }
        if(type==="inputNumber"){
            this.validator = this.validator||this.validatorFunc;
        }
        if(this.validator) {
            this.ItemRule.push({validator:this.validator});
        }

        this.ItemConfig.rules = this.ItemRule;
        if(type === "checkbox"){
            this.ItemConfig.valuePropName = "checked";
        }
        if(item.currencyCode||item.goContract){
            item.style = currencyCodeStyleLeft;
        }
        let formContent = this.getItem(item, type);
        let content = <Col key={code+'_col'} span={this.itemSpan} style={{display: hidden?'none':'block'}}>
            <FormItem key={code} label={name}
                      {...this.formLayoutTemp} >
                                {form.getFieldDecorator(code, this.ItemConfig)
                                (formContent)
                                }
                                {item.currencyCode&&<Input 
                                    disabled={true} value={item.currencyCode} style={currencyCodeStyleRight}/>}
                                {item.goContract&&<a style={currencyCodeStyleRight} onClick={item.goContract}>
                                    {seiIntl.get({key: 'gwmBdmAm_999996', desc: '查看合同'})}</a>}
                            </FormItem>
                       </Col>;
        const value = form.getFieldValue(code)||"";
        if((item.toolTip||type === "input")&&!noToolTip){
            let title = item.toolTip||"";
            if(value.length>15){
                title = title||value;
            }
            content = <Tooltip title={title}>{content}</Tooltip>;
        }
        return (
            content
        )
    }
}
export default StandardFormItem
