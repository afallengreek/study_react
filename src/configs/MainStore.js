/**
 * Created by liusonglin on 2018/7/13.
 */
import { createStore, applyMiddleware ,compose} from 'redux';
import thunk from 'redux-thunk';
import { CombineReducer } from './CombinReducers'
import Perf from "react-addons-perf";


/* 创建整个应用的中间件 */
const middleware = [ thunk ];

const win = window;
win.Perf = Perf;

const storeEnhancers = compose(
    applyMiddleware(...middleware),
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);
const initialState = {
    todos: [
        {
            id: 0,
            text: 'First',
            completed: true
        },
        {
            id: 1,
            text: 'Second',
            completed: false
        },
        {
            id: 2,
            text: 'Third',
            completed: true
        }
    ]
}
export const MainStore = createStore(
    CombineReducer,initialState, storeEnhancers
);