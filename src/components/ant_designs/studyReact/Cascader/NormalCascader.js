import { Cascader } from 'antd';
import React from "react";
const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
            code: 43200,
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            code: 453434,
            disabled: true,
        },{
            value: 'youxianzhen',
            label: '游仙镇',
            code: 453400,
        }],
    }],
}];

function filter(inputValue, path) {
    return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
}
function onChange(value) {
    console.log(value);
}

function handleAreaClick(e, label, option) {
    e.stopPropagation();
    console.log('clicked', label, option);
}

const displayRender = (labels, selectedOptions) => labels.map((label, i) => {
    const option = selectedOptions[i];
    if (i === labels.length - 1) {
        return (
            <span key={option.value}>
        {label} (<a onClick={e => handleAreaClick(e, label, option)}>{option.code}</a>)
      </span>
        );
    }
    return <span key={option.value}>{label} / </span>;
});
class NormalCascader extends React.Component{
    state = {
        text: 'Unselect',
    };

    onChange = (value, selectedOptions) => {
        console.log("我的选择",selectedOptions);
        console.log("我的选择",selectedOptions.map(o => o.label));
        console.log("我的选择",selectedOptions.map(o => o.label).join(', '));
        this.setState({
            text: selectedOptions.map(o => o.label).join(', '),
        });
    }
    render=()=>{
        return  <div>
                 <Cascader
                     defaultValue={['zhejiang', 'hangzhou', 'xihu']}
                     options={options}
                     onChange={onChange}
                     placeholder="Please select"
                     displayRender={displayRender}
                     style={{ width: '100%' }}
                 />
                <br/><br/>
                 <span>
                        {this.state.text}
                                &nbsp;
                                <Cascader
                                    options={options}
                                    onChange={this.onChange}
                                    expandTrigger="hover"
                                    showSearch={{ filter }}


                                >
                          <a href="#">Change city</a>
                        </Cascader>
                </span>
            </div>
    }
}
export default NormalCascader;