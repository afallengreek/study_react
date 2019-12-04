/**
 * @Description:
 * @Author: CHEHSHUANG
 * @Date: 2018/11/1
 */
import React, {Component} from "react"
import CustomComponent from "./mapComponentType";
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
export default  class RangeInput extends Component {
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
            start: value.start || null,
            end: value.end || null
        }
    }
    triggerChange = (changeValue) => {
        const {onChange} = this.props
        if (onChange) {
            onChange(Object.assign({}, this.state, changeValue));
        }
    }
    handleChangeEnd = (end) => {
        if (!('value' in this.props)) {
            this.setState({end})
        }
        this.triggerChange({end})
    }
    handleChangeStart = (start) => {
        if (!('value' in this.props)) {
            this.setState({start})
        }
        this.triggerChange({start})
    }
    onClick = (e) => {e.stopPropagation()}
    render() {
        const {start, end} = this.state;
        const {type="number",splitStr=seiIntl.get({key: 'gwmBdm_000098', desc: '到'}),style,placeholders=[],...restAll} = this.props;
        const {value,id,onChange,...rest} = restAll;
        return (
            <div style={{display: "flex",alignItems: "center",minWidth: "260px",...style}}>
                <div style={{flex: 1}} onClick={this.onClick}>
                  <CustomComponent
                    type={type}
                    style={{width: "100%"}}
                    placeholder={placeholders[0]}
                    value={start}
                    onChange={this.handleChangeStart}
                    {...rest}
                  />
                </div>
                <div style={{width: 20, textAlign: "center"}}>{splitStr}</div>
                <div style={{flex: 1}} onClick={this.onClick}>
                  <CustomComponent
                    type={type}
                    style={{width: "100%"}}
                    placeholder={placeholders[1]}
                    value={end}
                    onChange={this.handleChangeEnd}
                    {...rest}
                  />
                </div>
            </div>
        );
    }

}
