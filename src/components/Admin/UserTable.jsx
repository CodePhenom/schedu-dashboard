import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core';
import { connect } from 'react-redux';
import {
  updateAdminRole,
  updateEnableDisableUser,
} from '../../store/actions/admin-actions';
import { red, green } from '@material-ui/core/colors';

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

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.primary[50],
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  buttonDisable: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  buttonEnable: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}));

const UserTable = (props) => {
  const classes = useStyles();

  const { searchedUser } = props.admin;

  const handleupdateAdminRole = () => {
    props.updateAdminRole({
      uid: searchedUser.uid,
      email: searchedUser.email,
      isAdmin: !searchedUser.customClaims['admin'],
    });
  };

  const handleUpdateEnableDisaleUser = () => {
    props.updateEnableDisableUser({
      uid: searchedUser.uid,
      isDisable: !searchedUser.disabled,
    });
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
    const isAdmin = searchedUser.customClaims['admin'];
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
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align='center'>Display Name</StyledTableCell>
              <StyledTableCell align='center'>Provider(s)</StyledTableCell>
              <StyledTableCell align='center'>Created At</StyledTableCell>
              <StyledTableCell align='center'>Last SignIn At</StyledTableCell>
              <StyledTableCell align='center'>Status</StyledTableCell>
              <StyledTableCell align='center'>Admin</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component='th' scope='row'>
                {searchedUser ? searchedUser.email : ''}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {searchedUser ? searchedUser.displayName : ''}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {searchedUser ? (
                  <ul component='nav' aria-label='secondary mailbox folders'>
                    {searchedUser.providerData.map((provider, id) => (
                      <li key={id}>{provider.providerId}</li>
                    ))}
                  </ul>
                ) : (
                  ''
                )}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {searchedUser ? searchedUser.metadata.creationTime : ''}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {searchedUser ? searchedUser.metadata.lastSignInTime : ''}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {searchedUser ? renderEnableDisableButton() : ''}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {searchedUser ? renderAdminUpdateButton() : ''}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
