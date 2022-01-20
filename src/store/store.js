import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from "redux-logger"

import userReducer from './reducers';

const rootReducer = combineReducers({ userReducer });

export const store = createStore(rootReducer, applyMiddleware(logger));