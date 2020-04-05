import React, { Component } from 'react';
import fire from './config/firebase-config';
import PrivateRoute from './Components/PrivateRoute';
import NotFound from './Components/NotFound';
import AdminLayout from './Components/Layout';
import { publicRoutes } from './routes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    // this.authListener();
  }

  authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user });
      }
    });
  };

  render() {
    return (
      <Router>
        <Switch>
          {publicRoutes.map((route, id) => {
            return <Route {...route} key={id} />;
          })}
          <Route path='/not-found' component={NotFound} />
          <PrivateRoute path='/' component={AdminLayout} />
          <Redirect to='/not-found' />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(App);
