import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import storiesReducer from './stories';
import commentReducer from './comment';
import clapsReducer from './claps';

const rootReducer = combineReducers({
  session: sessionReducer,
  stories: storiesReducer,
  comments: commentReducer,
  claps: clapsReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


// This function will be used by index.js to attach the Redux store to the React application.
const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };



export default configureStore;
