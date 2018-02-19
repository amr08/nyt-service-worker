import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {createLogger} from 'redux-logger'
import rootReducer from './reducers';
import './index.css';
import {swUpdateAvailable} from "./actions";
import Main from './containers/Main';

const middleware = [thunk];
if(process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>, 
  document.getElementById('root')
);

//Register SW
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
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
            	console.log('New content is available; please refresh.');
                store.dispatch(swUpdateAvailable(true))

                 store.subscribe(() => {
                   let {userSwUpdateSelection} = store.getState();

                   if(userSwUpdateSelection){
                    installingWorker.postMessage({update: true});
                    console.log("UPDATE!!!")
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





// function checkValidServiceWorker(swUrl) {
// //   // Check if the service worker can be found. If it can't reload the page.
//   fetch(swUrl)
//     .then(response => {
//       // Ensure service worker exists, and that we really are getting a JS file.
//       if (
//         response.status === 404 ||
//         response.headers.get('content-type').indexOf('javascript') === -1
//       ) {
//         // No service worker found. Probably a different app. Reload the page.
//         navigator.serviceWorker.ready.then(registration => {
//           registration.unregister().then(() => {
//             window.location.reload();
//           });
//         });
//       } else {
//         // Service worker found. Proceed as normal.
//         registerValidSW(swUrl);
//       }
//     })
//     .catch(() => {
//       console.log(
//         'No internet connection found. App is running in offline mode.'
//       );
//     });
// }