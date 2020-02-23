import React, { Component } from 'react';
import fire from './firebase-app';
import Login from './components/Login';
import Home from './components/Home';
import Instructions from './components/Instructions';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
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
        <div className='App'>
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
        </div>
      </Router>
    );
  }
}

export default App;
