import React, { Component } from 'react';
import fire from './firebase-app';
import Login from './Components/Login';
import Home from './Components/Home';
import Instructions from './Components/Instructions';
import PrivateRoute from './Components/PrivateRoute';
import NotFound from './Components/NotFound';
import Layout from './Components/Layout';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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
        <Layout>
          <ul>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/instructions'>Instructions</Link>
          </ul>
          <Switch>
            <PrivateRoute
              exact
              path='/'
              user={this.state.user}
              component={Home}
            />
            <Route path='/login' component={Login}></Route>
            <PrivateRoute
              user={this.state.user}
              path='/instructions'
              component={Instructions}
            />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
