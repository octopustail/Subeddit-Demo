import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleWare from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import {selectSubreddit, fetchPosts} from "./actions/action";
import rootReducer from './actions/reducers';
import 'babel-polyfill'

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleWare, loggerMiddleware)
)

store.dispatch(selectSubreddit('reactjs'));
store.dispatch(fetchPosts('react.js')).then(() => console.log(store.getState()))
ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
