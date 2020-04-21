import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Snackbar,
  Typography,
  Switch,
} from '@material-ui/core';
import { connect } from 'react-redux';
import {
  updateAdminRole,
  updateEnableDisableUser,
  removeNotificationMessage,
} from '../../store/actions/admin-actions';

const StyledTableCell = withStyles((theme) => {
  return {
    body: {
      fontSize: 12,
    },
  };
})(TableCell);

const StyledTableRow = withStyles((theme) => {
  return {
    root: {
      backgroundColor: theme.palette.common.white,
    },
  };
})(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    padding: 20,
    borderBottom: `1px solid ${theme.palette.secondary['200']}`,
  },
  tableContainer: {
    marginBottom: 20,
  },
  userInfoKeyCell: {
    fontWeight: 600,
    width: 200,
    color: theme.palette.secondary['800'],
  },
  userInfoValueCell: {
    fontWeight: 500,
    color: theme.palette.secondary['900'],
  },
}));

const UserTable = (props) => {
  const classes = useStyles();

  const { searchedUser, notificationMessage } = props.admin;

  const handleupdateAdminRole = () => {
    props.updateAdminRole({
      uid: searchedUser.id,
      email: searchedUser.email,
      isAdmin: !searchedUser.isAdmin,
    });
  };

  const handleUpdateEnableDisaleUser = () => {
    props.updateEnableDisableUser({
      uid: searchedUser.id,
      isEnable: !searchedUser.isEnable,
    });
  };

  const handleCloseSnackBar = (id) => {
    props.removeNotificationMessage(id);
  };

  const renderUserInfoInTable = (key) => {
    return searchedUser ? <Typography>{searchedUser[key]}</Typography> : '';
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={notificationMessage}
        onClose={handleCloseSnackBar}
        message={notificationMessage}
        autoHideDuration={5000}
      ></Snackbar>
      <Paper className={classes.tableContainer}>
        <div className={classes.title}>
          <Typography variant='h6' component='div'>
            User's Info
          </Typography>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell className={classes.userInfoKeyCell}>
                  Email
                </StyledTableCell>
                <StyledTableCell
                  scope='row'
                  className={classes.userInfoValueCell}
                >
                  {renderUserInfoInTable('email')}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell className={classes.userInfoKeyCell}>
                  First Name
                </StyledTableCell>
                <StyledTableCell className={classes.userInfoValueCell}>
                  {renderUserInfoInTable('firstName')}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell className={classes.userInfoKeyCell}>
                  Last Name
                </StyledTableCell>
                <StyledTableCell className={classes.userInfoValueCell}>
                  {renderUserInfoInTable('lastName')}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell className={classes.userInfoKeyCell}>
                  Created At
                </StyledTableCell>
                <StyledTableCell className={classes.userInfoValueCell}>
                  {renderUserInfoInTable('createdAt')}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Paper className={classes.tableContainer}>
        <div className={classes.title}>
          <Typography variant='h6' component='div'>
            Admin Actions
          </Typography>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell className={classes.userInfoKeyCell}>
                  Status
                </StyledTableCell>
                <StyledTableCell>
                  {searchedUser ? (
                    <Switch
                      checked={searchedUser.isEnable}
                      onChange={handleUpdateEnableDisaleUser}
                      color='primary'
                    />
                  ) : (
                    ''
                  )}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell className={classes.userInfoKeyCell}>
                  Admin Role
                </StyledTableCell>
                <StyledTableCell>
                  {searchedUser ? (
                    <Switch
                      checked={searchedUser.isAdmin}
                      onChange={handleupdateAdminRole}
                      color='primary'
                    />
                  ) : (
                    ''
                  )}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    admin: state.admin,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateAdminRole: (email) => dispatch(updateAdminRole(email)),
  updateEnableDisableUser: (data) => dispatch(updateEnableDisableUser(data)),
  removeNotificationMessage: (id) => dispatch(removeNotificationMessage(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
