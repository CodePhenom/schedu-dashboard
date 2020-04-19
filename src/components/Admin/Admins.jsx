import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { fetchAllAdmins } from '../../store/actions/admin-actions';

const Users = (props) => {
  useEffect(() => {
    props.fetchAllAdmins();
  }, []);

  const renderAdmins = () => {
    const { admins } = props.admin;
    return admins.length ? (
      admins.map((admin) => admin.firstName)
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
  admin: state.admin,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllAdmins: (accessToken) => dispatch(fetchAllAdmins(accessToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
