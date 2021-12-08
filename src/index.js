import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from './Config/FirebaseConfig';

import { createStore, applyMiddleware } from 'redux';
import rootReducer from './Reducers/rootReducer';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';




let initialState;


const store = createStore(
  rootReducer, initialState,
  applyMiddleware(thunk.withExtraArgument({ getFirebase }))
);

const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance
}
const rootElement = document.getElementById('root');

  ReactDOM.render(
  <Provider store = {store}>
    <React.StrictMode>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </React.StrictMode>
  </Provider>,
  rootElement
);




