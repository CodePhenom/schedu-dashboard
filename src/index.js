import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider, useSelector } from 'react-redux';
import rootReducer from './store/reducers/root-reducer';
import thunk from 'redux-thunk';
import {
  isLoaded,
  getFirebase,
  ReactReduxFirebaseProvider,
} from 'react-redux-firebase';
import firebase from './config/firebase-config';
import { composeWithDevTools } from 'redux-devtools-extension';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(getFirebase)))
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return null;
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);
