import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Checkbox, Tag} from "antd";
import {toggleTodo, removeTodo} from '../reducer/actions.js';
const TodoItem =({onToggle, onRemove, completed, text,randomColor })=>{
    function onToggleIt(){
        onToggle();
    }
    return(
      <li className="todo-item"
        style={{
          textDecoration: completed ? 'line-through' : 'none'
        }}
      >
        <Checkbox className="complete" checked={completed} readOnly onClick={onToggleIt} />
        <Tag  style={{textDecoration: completed ? 'line-through' : 'none',color:randomColor}} className="tag"
        >{text}</Tag>
        <button className="remove" onClick={onRemove}>×</button>
      </li>
    )
  };

TodoItem.propTypes = {
  // onToggle: PropTypes.func.isRequired,
  // onRemove: PropTypes.func.isRequired,
  // completed: PropTypes.bool.isRequired,
  // text: PropTypes.string.isRequired
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {id} = ownProps;
  return {
    onToggle: () => dispatch(toggleTodo(id)),
    onRemove: () => dispatch(removeTodo(id))
  }
};

export default connect(null, mapDispatchToProps)(TodoItem);

