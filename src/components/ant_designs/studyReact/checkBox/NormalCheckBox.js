import {Button, Checkbox, Col, Row} from 'antd';
import React from "react";
const CheckboxGroup = Checkbox.Group;
function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
}
function onChange1(checkedValues) {
    console.log('checked = ', checkedValues);
}
function onChange2(checkedValues) {
    console.log('checked = ', checkedValues);
}
const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
];
const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: false },
];
class NormalCheckBox extends React.Component{
    state = {
        checked: true,
        disabled: false,
    };

    toggleChecked = () => {
        this.setState({ checked: !this.state.checked });
    }

    toggleDisable = () => {
        this.setState({ disabled: !this.state.disabled });
    }

    onChange = (e) => {
        console.log('checked = ', e.target.checked);
        this.setState({
            checked: e.target.checked,
        });
    }
    render=()=>{
        const label = `${this.state.checked ? 'Checked' : 'Unchecked'}-${this.state.disabled ? 'Disabled': 'Enabled'}`;
        return  <div><Checkbox onChange={onChange}>Checkbox</Checkbox>
            <br />
            <Checkbox defaultChecked={false} disabled />
            <Checkbox defaultChecked disabled />
            <p style={{ marginBottom: '20px' }}>
                <Checkbox
                    checked={this.state.checked}
                    disabled={this.state.disabled}
                    onChange={this.onChange}
                >
                    {label}
                </Checkbox>
            </p>
            <p>
                <Button
                    type="primary"
                    size="small"
                    onClick={this.toggleChecked}
                >
                    {!this.state.checked ? 'Check' : 'Uncheck'}
                </Button>
                <Button
                    style={{ marginLeft: '10px' }}
                    type="primary"
                    size="small"
                    onClick={this.toggleDisable}
                >
                    {!this.state.disabled ? 'Disable' : 'Enable'}
                </Button>
            </p>

            <CheckboxGroup options={plainOptions} defaultValue={['Apple']} onChange={onChange1} />
            <br /><br />
            <CheckboxGroup options={options} defaultValue={['Pear']} onChange={onChange1} />
            <br /><br />
            <CheckboxGroup options={optionsWithDisabled} disabled defaultValue={['Apple']} onChange={onChange1} />
            <br/>
            <Checkbox.Group style={{ width: '50%' }} onChange={onChange2}>
                <Row>
                    <Col span={8}><Checkbox value="A">A</Checkbox></Col>
                    <Col span={8}><Checkbox value="B">B</Checkbox></Col>
                    <Col span={8}><Checkbox value="C">C</Checkbox></Col>
                    <Col span={8}><Checkbox value="D">D</Checkbox></Col>
                    <Col span={8}><Checkbox value="E">E</Checkbox></Col>
                    <Col span={8}><Checkbox value="F">F</Checkbox></Col>
                </Row>
            </Checkbox.Group>
        </div>
    }
}
export default NormalCheckBox;
