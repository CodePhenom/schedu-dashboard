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
  Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import {
  updateAdminRole,
  updateEnableDisableUser,
  removeAdminErrorMessage,
  adminDeletesUser,
} from '../../store/slices/admin/actions';

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
  deleteButton: {
    margin: theme.spacing(1),
    backgroundColor: 'red',
  },
}));

const UserTable = (props) => {
  const classes = useStyles();

  const { searchedUser, adminErrorMessage } = props.admin;

  const handleupdateAdminRole = () => {
    props.updateAdminRole({
      id: searchedUser.id,
      email: searchedUser.email,
      isAdmin: !searchedUser.isAdmin,
    });
  };

  const handleUpdateEnableDisaleUser = () => {
    props.updateEnableDisableUser({
      id: searchedUser.id,
      isDisabled: !searchedUser.isDisabled,
    });
  };

  const handleCloseSnackBar = (id) => {
    props.removeAdminErrorMessage(id);
  };

  const renderUserInfoInTable = (key) => {
    if (key === 'createdAt' || key === 'lastLoginAt') {
      if (searchedUser) {
        const date = new Date(searchedUser[key]);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const format = `${day}.${month}.${year} ${hour}:${minute}`;
        return <Typography>{format}</Typography>;
      } else {
        return '';
      }
    }

    return searchedUser ? <Typography>{searchedUser[key]}</Typography> : '';
  };

  const handleDeleteUser = () => {
    props.adminDeletesUser(searchedUser.id);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={Boolean(adminErrorMessage)}
        onClose={handleCloseSnackBar}
        message={adminErrorMessage}
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
              <StyledTableRow>
                <StyledTableCell className={classes.userInfoKeyCell}>
                  Last Login At
                </StyledTableCell>
                <StyledTableCell className={classes.userInfoValueCell}>
                  {renderUserInfoInTable('lastLoginAt')}
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
                      checked={!searchedUser.isDisabled}
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
              <StyledTableRow>
                <StyledTableCell className={classes.userInfoKeyCell}>
                  Delete User
                </StyledTableCell>
                <StyledTableCell>
                  {searchedUser && (
                    <Button
                      variant='contained'
                      color='secondary'
                      className={classes.deleteButton}
                      startIcon={<DeleteIcon />}
                      onClick={handleDeleteUser}
                    >
                      Delete
                    </Button>
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
  removeAdminErrorMessage: (id) => dispatch(removeAdminErrorMessage(id)),
  adminDeletesUser: (id) => dispatch(adminDeletesUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
