import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import TodoItem from './todoItem.js';
import {selectVisibleTodos} from '../selector.js';
//随机颜色
const color=["#FFD700"," #FF7F24"," #FF0000"," #FF6EB4","#EEEE00","#E6E6FA","#E066FF","#EE1289",
    "#DEB887"," #D1EEEE"," #C71585","#C6E2FF"," #C67171","#B9D3EE","#B4EEB4"," #87CEEB"," #737373",
    "#556B2F","#303030","#292929","#228B22","#1A1A1A","#473C8B","#7A7A7A","#7EC0EE"
    ,"#87CEFF","#9AFF9A","#B0E0E6","#EE9572","#FA8072","#BDBDBD","#53868B","#48D1CC"];
const TodoList = ({todos, onClickTodo}) => {
  return (
    <ul className="todo-list">
    {

      todos.map((item) =>{
        // let randomColor=color[parseInt(Math.random() * color.length, 10)];
        return (
              <TodoItem
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  completed={item.completed}
                  randomColor={""}
              />
          )
      })
    }
    </ul>
  );
};

TodoList.propTypes = {
  // todos: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    todos: selectVisibleTodos(state)
  };
}

export default connect(mapStateToProps)(TodoList);
