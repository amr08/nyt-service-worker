import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {applyMiddleware, createStore, compose} from "redux";
import thunk from "redux-thunk";
import {createLogger} from 'redux-logger'
import rootReducer from './reducers';
import './index.css';
import {swUpdateAvailable} from "./actions";
import Main from './containers/Main';

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if(process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
} 

const store = createStore(  rootReducer,composeEnhancers(
  applyMiddleware(...middleware)
));

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>, 
  document.getElementById('root')
);

//Register SW, moved into root to get access to store
register();

function register() {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
        registerValidSW(swUrl);
    });
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
        	console.log(installingWorker)
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
                //If new SW is available, send signal (data) to actions to alert user
                store.dispatch(swUpdateAvailable(true));
                //Listen for updates to state which will happen when user selects "update" in user notification
                store.subscribe(() => {
                  let {userSwUpdateSelection} = store.getState();
                  if(userSwUpdateSelection){
                    //Send signal to service worker to skipWaiting
                    installingWorker.postMessage({update: true});
                   }
                  })
            } else {
              console.log('Content is cached for offline use.');
            }
          }
        };
       };
     })
    .catch(error => {
      console.error('Error during service worker registration:', error);
  });
}