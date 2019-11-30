import {ADD_TODO, TOGGLE_TODO, REMOVE_TODO}from './actionTypes.js';
const todosInitData = [
    {
        id: 0,
        text: '超级肥王企鹅一号Frist',
        completed: true
    },
    {
        id: 1,
        text: '超级肥王企鹅二号Second',
        completed: false
    },
    {
        id: 2,
        text: '超级肥王企鹅三号Thrid',
        completed: true
    }
]
export default (state = todosInitData, action) => {
  switch(action.type) {
    case ADD_TODO: {
      return [
        {
          id: action.id,
          text: action.text,
          completed: false
        },
        ...state
      ]
    }
    case TOGGLE_TODO: {
      return state.map((todoItem) => {
        if (todoItem.id === action.id) {
           return {...todoItem, completed: !todoItem.completed};
        } else {
          return todoItem;
        }
      })
    }
    case REMOVE_TODO: {
      return state.filter((todoItem) => {
        return todoItem.id !== action.id;
      })
    }
    default: {
      return state;
    }
  }
}
