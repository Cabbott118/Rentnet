// Entry to REDUX store
// Holds entire state tree of app
// Set up as object with methods
// Only way to change state inside is to DISPATCH an ACTION on it

// Reducers interact with the front-end

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;
