import React, { Component } from 'react';
import fire from './firebase-app';
import Login from './Components/Login';
import Home from './Components/Home';
import Instructions from './Components/Instructions';
import PrivateRoute from './Components/PrivateRoute';
import NotFound from './Components/NotFound';
import AdminLayout from './Components/Layout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

class App extends Component {
  state = { user: {} };

  componentDidMount() {
    this.authListener();
  }

  authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/auth' component={Login} />
          <Route path='/not-found' component={NotFound} />
          <PrivateRoute
            path='/'
            user={this.state.user}
            component={AdminLayout}
          />
          {/* <Redirect to='/not-found' /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
