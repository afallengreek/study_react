import {
    Form, Input, Select, Button, Row, Col,
} from 'antd';
import React from "react";

const FormItem = Form.Item;
const Option = Select.Option;

class PriceInput extends React.Component {
    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return {
                ...(nextProps.value || {}),
            };
        }
        return null;
    }

    constructor(props) {
        super(props);

        const value = props.value || {};
        this.state = {
            number: value.number || 0,
            currency: value.currency || 'rmb',
        };
    }

    handleNumberChange = (e) => {
        const number = parseInt(e.target.value || 0, 10);
        if (Number.isNaN(number)) {
            return;
        }
        if (!('value' in this.props)) {
            this.setState({ number });
        }
        this.triggerChange({ number });
    }

    handleCurrencyChange = (currency) => {
        if (!('value' in this.props)) {
            this.setState({ currency });
        }
        this.triggerChange({ currency });
    }

    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }

    render() {
        const { size } = this.props;
        const state = this.state;
        return (
            <span>
        <Input
            type="text"
            size={size}
            value={state.number}
            onChange={this.handleNumberChange}
            style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
            value={state.currency}
            size={size}
            style={{ width: '32%' }}
            onChange={this.handleCurrencyChange}
        >
          <Option value="rmb">RMB</Option>
          <Option value="dollar">Dollar</Option>
        </Select>
      </span>
        );
    }
}

class formMyDefine extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    checkPrice = (rule, value, callback) => {
        if (value.number > 0) {
            callback();
            return;
        }
        callback('金额必须大于0!');
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row>
                <Col offset={9} style={{marginTop:300}}>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <FormItem label="Price">
                            {getFieldDecorator('price', {
                                initialValue: { number: 0, currency: 'rmb' },
                                rules: [{ validator: this.checkPrice }],
                            })(<PriceInput />)}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default formMyDefine = Form.create()(formMyDefine);