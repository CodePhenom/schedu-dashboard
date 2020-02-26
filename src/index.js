import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/root-reducer';

const store = createStore(rootReducer);

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
