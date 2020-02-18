import React, { Component } from 'react';
import _ from 'lodash';
import fire from './firebase-app';
import Login from './components/Login';
import Home from './components/Home';

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
      <div className='App'>
        {!_.isEmpty(this.state.user) ? <Home /> : <Login />}
      </div>
    );
  }
}

export default App;
