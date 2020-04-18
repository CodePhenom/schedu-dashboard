import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Snackbar,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import {
  updateAdminRole,
  updateEnableDisableUser,
  removeNotificationMessage,
} from '../../store/actions/admin-actions';
import { red, green, teal } from '@material-ui/core/colors';

const StyledTableCell = withStyles((theme) => {
  return {
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 12,
    },
  };
})(TableCell);

const StyledTableRow = withStyles((theme) => {
  return {
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.common.white,
      },
    },
  };
})(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tableContainer: {
    width: '48%',
  },
  userInfoKeyCell: {
    color: 'grey',
  },
  userInfoValueCell: {
    fontWeight: 600,
  },
  buttonDisable: {
    color: theme.palette.getContrastText(red[900]),
    backgroundColor: red[900],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  buttonEnable: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
    '&:hover': {
      backgroundColor: teal[700],
    },
  },
}));

const UserTable = (props) => {
  const classes = useStyles();

  const { searchedUser, notificationMessage } = props.admin;
  console.log('props.admin ', props.admin);

  const handleupdateAdminRole = () => {
    console.log('UserTable', searchedUser.customClaims['isAdmin']);
    props.updateAdminRole({
      uid: searchedUser.uid,
      email: searchedUser.email,
      isAdmin: !searchedUser.customClaims
        ? false
        : !searchedUser.customClaims['isAdmin'],
    });
  };

  const handleUpdateEnableDisaleUser = () => {
    props.updateEnableDisableUser({
      uid: searchedUser.uid,
      isDisable: !searchedUser.disabled,
    });
  };

  const handleCloseSnackBar = (id) => {
    props.removeNotificationMessage(id);
  };

  const renderEnableDisableButton = () => {
    const { disabled } = searchedUser;
    const buttonClass = disabled ? 'buttonEnable' : 'buttonDisable';
    const buttonLable = disabled ? 'Enable' : 'Disable';

    return (
      <Button
        className={classes[buttonClass]}
        size='small'
        onClick={handleUpdateEnableDisaleUser}
      >
        {buttonLable}
      </Button>
    );
  };

  const renderAdminUpdateButton = () => {
    let isAdmin = null;
    if (searchedUser.customClaims) {
      isAdmin = searchedUser.customClaims['isAdmin'];
    }

    const buttonClass = isAdmin ? 'buttonDisable' : 'buttonEnable';
    const buttonLable = isAdmin ? 'Remove' : 'Add';

    return (
      <Button
        className={classes[buttonClass]}
        size='small'
        onClick={handleupdateAdminRole}
      >
        {buttonLable}
      </Button>
    );
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
      <div className={classes.tableContainer}>
        <Typography className={classes.title} variant='h6' component='div'>
          Personal Info
        </Typography>
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
                  {searchedUser ? searchedUser.email : ''}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell className={classes.userInfoKeyCell}>
                  Display Name
                </StyledTableCell>
                <StyledTableCell className={classes.userInfoValueCell}>
                  {searchedUser ? searchedUser.displayName : ''}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell className={classes.userInfoKeyCell}>
                  Provider
                </StyledTableCell>
                <StyledTableCell className={classes.userInfoValueCell}>
                  {searchedUser ? (
                    <List
                      component='nav'
                      aria-label='secondary mailbox folders'
                    >
                      {searchedUser.providerData.map((provider, id) => (
                        <ListItem
                          key={id}
                          className={classes.userInfoValueCell}
                        >
                          {provider.providerId}
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    ''
                  )}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell className={classes.userInfoKeyCell}>
                  Createion Time
                </StyledTableCell>
                <StyledTableCell className={classes.userInfoValueCell}>
                  {searchedUser ? searchedUser.metadata.creationTime : ''}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell className={classes.userInfoKeyCell}>
                  Last Login Time
                </StyledTableCell>
                <StyledTableCell className={classes.userInfoValueCell}>
                  {searchedUser ? searchedUser.metadata.lastSignInTime : ''}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={classes.tableContainer}>
        <Typography className={classes.title} variant='h6' component='div'>
          Admin Actions
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell className={classes.userInfoKeyCell}>
                  Status
                </StyledTableCell>
                <StyledTableCell>
                  {searchedUser ? renderEnableDisableButton() : ''}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell className={classes.userInfoKeyCell}>
                  Admin Role
                </StyledTableCell>
                <StyledTableCell>
                  {searchedUser ? renderAdminUpdateButton() : ''}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
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
