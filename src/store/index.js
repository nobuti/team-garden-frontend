import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import reducers from '~/store/slices';

const createRootReducer = () =>
  combineReducers({
    ...reducers,
  });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  createRootReducer(),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
