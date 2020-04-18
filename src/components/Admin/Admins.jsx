import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { fetchAllAdmins } from '../../store/actions/admin-actions';

const Users = (props) => {
  const { accessToken } = props.auth.stsTokenManager;

  useEffect(() => {
    props.fetchAllAdmins(accessToken);
  }, []);

  const renderAdmins = () => {
    const { admins } = props.admin;
    return admins.length ? (
      admins.map((admin) => admin.name.displayName)
    ) : (
      <div>No Admin</div>
    );
  };

  return (
    <div>
      <Paper>
        <h1>Admins</h1>
        {renderAdmins()}
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  admin: state.admin,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllAdmins: (accessToken) => dispatch(fetchAllAdmins(accessToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
