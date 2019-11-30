import React from 'react';
import {view as Todos} from './todos/index';
import {view as Filter} from './filter/index';

function TodoApp() {
  return (
    <div>
      <Todos />
      <Filter />
    </div>
  );
}

export default TodoApp;
