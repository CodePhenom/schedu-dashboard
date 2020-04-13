import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { deepOrange, teal, indigo, blueGrey } from '@material-ui/core/colors';
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

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: blueGrey,
    secondary: indigo,
  },
});

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return null;
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <MuiThemeProvider theme={theme}>
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
      </MuiThemeProvider>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);
