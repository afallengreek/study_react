/**
 * Created by liusonglin on 2018/7/13.
 */
import {combineReducers} from "redux";
import SharedReducer from './SharedReducer'
import  todosReducer from '../components/studyRedux/todo/todos/reducer/todosReducer';
import  filterReducer from '../components/studyRedux/todo/filter/reducer/filterReducer';



export const CombineReducer = combineReducers({
    SharedReducer,
    todos:todosReducer,
    filter:filterReducer,
});
