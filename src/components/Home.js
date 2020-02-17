import React, { Component } from 'react';
import fire from '../firebase-app';

class Home extends Component {
  state = {};

  logout = () => {
    fire.auth().signOut();
  };

  render() {
    return (
      <div>
        <h1>home</h1>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Home;
