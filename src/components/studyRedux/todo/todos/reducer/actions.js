export const ADD_TODO = 'TODO/ADD';
export const TOGGLE_TODO = 'TODO/TOGGLE';
export const REMOVE_TODO = 'TODO/REMOVE';

let nextTodoId = 10;

export const addTodo = (text) => ({
  type: ADD_TODO,
  completed: false,
  id: nextTodoId ++,
  text: text
});
//
export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id: id
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  id: id
});

