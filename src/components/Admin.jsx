import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAdmin } from '../store/actions/auth-actions';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>ADMIN</h1>
        <h3>
          Hi {this.props.auth.displayName || this.props.profile.firstName} the
          admin
        </h3>
        <button onClick={this.sendRequest}>Request</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

const mapDispatchToProps = (dispatch) => ({
  addAdmin: (email) => dispatch(addAdmin(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
