import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as homeReducer } from '../containers/Home/store';

const reducer = combineReducers({
	home: homeReducer
});

// 使用函数，避免共用一个实例
export const getStore = () => {
	return createStore(reducer, applyMiddleware(thunk));
}

export const getClientStore = () => {
	const initialState = window.context.state;
	return createStore(reducer, initialState, applyMiddleware(thunk));
}