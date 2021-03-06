import React, { Component } from 'react';
import firebase from './config/firebase-config';
import PrivateRoute from './apps/common/PrivateRoute';
import NotFound from './apps/common/NotFound';
import UserLayout from './apps/user/layout';
import AdminLayout from './apps/admin/layout';
import { publicRoutes } from './routes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserAdminStatus } from './store/slices/auth/actions';
import PrivateAdminRoute from './apps/common/PrivateAdminRoute';
import { MuiThemeProvider } from '@material-ui/core';
import themes from './themes';

class App extends Component {
  _isMounted = false;

  state = {
    isLoading: true,
  };

  componentDidMount() {
    this._isMounted = true;
    this.authListener();
  }

  authListener = () => {
    if (this._isMounted) {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const idTokenResult = await user.getIdTokenResult();
            const serializedIdTokenResult = JSON.stringify(idTokenResult);
            localStorage.setItem('idTokenResult', serializedIdTokenResult);

            const isAdmin = idTokenResult.claims['isAdmin'];
            this.props.setUserAdminStatus(isAdmin);
          } catch (error) {
            console.log(error);
            localStorage.removeItem('firebaseIdToken');
          }
        }
      });
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <MuiThemeProvider theme={themes[this.props.theme.currentTheme]}>
        <Router>
          <Switch>
            {publicRoutes.map((route, id) => {
              return <Route {...route} key={id} />;
            })}
            <Route path='/not-found' component={NotFound} />
            <PrivateAdminRoute path='/admin' component={AdminLayout} />
            <PrivateRoute path='/' component={UserLayout} />
            <Redirect to='/not-found' />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    theme: state.theme,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setUserAdminStatus: (isAdmin) => dispatch(setUserAdminStatus(isAdmin)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
