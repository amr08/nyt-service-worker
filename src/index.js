import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {createLogger} from 'redux-logger'
import articlesFetched from './reducers';
import './index.css';
import Main from './containers/Main';
import registerCustomSW from "./registerCustomSW";

const middleware = [thunk];
if(process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

//pulled out root reducer since it's not neccesary for this app
const store = createStore(
  articlesFetched,
  applyMiddleware(...middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>, 
  document.getElementById('root')
);

registerCustomSW();