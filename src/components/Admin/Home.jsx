import React from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

const Home = (props) => {
  return (
    <div>
      <Paper>
        <h1>Admin Home</h1>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  admin: state.admin,
});

export default connect(mapStateToProps)(Home);
