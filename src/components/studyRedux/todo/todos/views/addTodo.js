import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {addTodo} from '../reducer/actions.js';
import {Button,Row, Input,Col,Form} from "antd";

const FormItem =Form.Item;
class AddTodo extends Component {

  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);

    this.state = {
      value: ''
    };
  }

  onSubmit=()=> {
    const inputValue = this.state.value;
    if (!inputValue.trim()) {
     return;
    }
    this.props.onAdd(inputValue);
    this.setState({value: ''});
  }

  onInputChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <div className="add-todo">
        <Row>
          <Col span={6} offset={1}>
          <Input  onChange={this.onInputChange} value={this.state.value} />
          </Col>
          <Col span={2} offset={1}>
          <Button onClick={this.onSubmit} type="submit">
            添加
          </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

AddTodo.propTypes = {
  // onAdd: PropTypes.func.isRequired
};


const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (text) => {
      dispatch(addTodo(text));
    }
  }
};

export default connect(null, mapDispatchToProps)(AddTodo);

