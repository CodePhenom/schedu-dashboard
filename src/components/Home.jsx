import React, { Component } from 'react';
import { httpClient } from '../clients/http';
import { connect } from 'react-redux';

class Home extends Component {
  sendRequest = async () => {
    try {
      const { accessToken } = this.props.auth.stsTokenManager;
      if (accessToken) {
        const res = await httpClient.post('/users');
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
        <h3>Hi</h3>
        <button onClick={this.sendRequest}>Request</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default connect(mapStateToProps)(Home);
