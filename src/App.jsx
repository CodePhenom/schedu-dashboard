import React, { Component } from 'react';
import fire from './firebase-app';
import Login from './components/Login';
import Home from './components/Home';
import Instructions from './components/Instructions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

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
          <Switch>
            <Route path='/login' component={Login}></Route>
            <PrivateRoute
              user={this.state.user}
              path='/instructions'
              component={Instructions}
            />
            <PrivateRoute user={this.state.user} path='/' component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
