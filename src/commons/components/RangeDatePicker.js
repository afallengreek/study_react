/**
 * @Description:
 * @Author: CHEHSHUANG
 * @Date: 2018/11/1
 */
import React, {Component} from "react"
import {DatePicker} from "antd"
import moment from "moment";
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
export default  class RangeDatePicker extends Component {
    static getDerivedStateFromProps(nextProps) {
        if ('value' in nextProps) {
            return {
                ...(nextProps.value || {}),
            };
        }
        return null;
    }

    constructor(props) {
        super(props);
        const value = props.value || {}
        this.state = {
            startDate: value.startDate || null,
            endDate: value.endDate || null
        }
    }
    disabledDateStart = (current)=> {
        if(this.props.type==='currentTime'){
            //与当前时间有关
            return current>= moment().valueOf();
        }else {
            if(!this.state.endDate) return false;
            return current && current > this.state.endDate
        }
    }
    disabledDateEnd = (current)=> {
        if(this.props.type==='currentTime') {
            //与当前时间有关
            return current <= moment().add(-1, "days").valueOf();
        }else {
            if(!this.state.startDate) return false;
            return current && current < this.state.startDate;
        }
    }
    triggerChange = (changeValue) => {
        const {onChange} = this.props
        if (onChange) {
            onChange(Object.assign({}, this.state, changeValue));
        }
    }
    handleChangeEnd = (endDate) => {
        if (!('value' in this.props)) {
            this.setState({endDate})
        }
        this.triggerChange({endDate})
    }
    handleChangeStart = (startDate) => {
        if (!('value' in this.props)) {
            this.setState({startDate})
        }
        this.triggerChange({startDate})
    }
    onClick = (e) => {e.stopPropagation()}
    render() {
        const {startDate, endDate} = this.state;
        const {format,splitStr="~",style,allowClear} = this.props
        return (
            <div style={{display: "flex",alignItems: "center",minWidth: "260px",...style}}>
                <div style={{flex: 1}} onClick={this.onClick}>
                    <DatePicker
                        allowClear={allowClear}
                        placeholder={seiIntl.get({key: 'gwmBdm_000096', desc: '开始日期'})}
                        style={{width: "100%"}}
                        value={startDate}
                        disabled={this.props.disabled}
                        onChange={this.handleChangeStart}
                        format={format}
                        disabledDate={this.disabledDateStart}
                    />
                </div>
                <div style={{width: 20, textAlign: "center"}}>{splitStr}</div>
                <div style={{flex: 1}} onClick={this.onClick}>
                    <DatePicker
                        allowClear={allowClear}
                        placeholder={seiIntl.get({key: 'gwmBdm_000097', desc: '结束日期'})}
                        style={{width: "100%"}}
                        value={endDate}
                        format={format}
                        disabled={this.props.disabled}
                        onChange={this.handleChangeEnd}
                        disabledDate={this.disabledDateEnd}
                    />
                </div>
            </div>
        );
    }

}
