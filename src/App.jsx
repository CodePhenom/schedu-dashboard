import React, { Component } from 'react';
import fire from './config/firebase-config';
import PrivateRoute from './Components/PrivateRoute';
import NotFound from './Components/NotFound';
import Layout from './Components/Layout';
import AdminLayout from './Components/Admin/Layout';
import { publicRoutes } from './routes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserAdminStatus } from './store/actions/admin-actions';
import PrivateAdminRoute from './Components/PrivateAdminRoute';

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
      fire.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const idTokenResult = await user.getIdTokenResult();
          const isAdmin = idTokenResult.claims.admin;
          this.props.setUserAdminStatus(isAdmin);

          // create the user in firestore if it does not exist there (for the Google or Facebook SSO)
          const db = fire.firestore();
          const usersRef = await db.collection('users').doc(user.uid);
          const userDoc = await usersRef.get();
          if (!userDoc.exists) {
            await db
              .collection('users')
              .doc(user.uid)
              .set({
                name: {
                  displayName: user.displayName,
                },
              });
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
            <PrivateRoute path='/' component={Layout} />
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
