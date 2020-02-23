import React, { Component } from 'react';
import fire from '../firebase-app';
import { httpClient } from '../clients/http';

class Home extends Component {
  sendRequest = async () => {
    try {
      const currentUser = fire.auth().currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken();
        const res = await httpClient({
          method: 'get',
          url: '/auth',
          headers: {
            AuthToken: token
          }
        });
        console.log('res ', res);
      }
    } catch (error) {
      console.log('error ', error);
    }
  };

  render() {
    return (
      <div>
        <h1>home</h1>
        <button onClick={this.sendRequest}>Request</button>
      </div>
    );
  }
}

export default Home;
