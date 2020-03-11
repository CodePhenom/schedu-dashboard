import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/root-reducer';
import thunk from 'redux-thunk';
import { getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebaseConfig from './config/firebase-config';

const rrfConfig = { userProfile: 'users' };

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk.withExtraArgument(getFirebase)))
);

// adfadfadf

const rrfProps = {
  firebase: {},
  config: rrfConfig,
  dispatch: store.dispatch
};

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue
  }
});

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);
