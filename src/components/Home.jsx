import React, { Component } from 'react';
import fire from '../config/firebase-config';
import { httpClient } from '../clients/http';
import { connect } from 'react-redux';
import { createTask } from './../store/actions/task-actions';

class Home extends Component {
  sendRequest = async () => {
    try {
      const currentUser = fire.auth().currentUser;
      if (currentUser) {
        // const token = await currentUser.getIdToken();
        // const res = await httpClient({
        //   method: 'post',
        //   url: '/users',
        //   headers: {
        //     AuthToken: token,
        //   },
        // });
        // console.log('res ', res);
        await this.props.createTask({ name: 'new task' });
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

const mapDispatchToProps = (dispatch) => ({
  createTask: (task) => dispatch(createTask(task)),
});

export default connect(null, mapDispatchToProps)(Home);
