import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

const StyledTableCell = withStyles((theme) => {
  console.log('theme ', theme);
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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const SearchUser = (props) => {
  const classes = useStyles();

  const { searchedUser } = props.admin;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell align='center'>Display Name</StyledTableCell>
            <StyledTableCell align='center'>Provider(s)</StyledTableCell>
            <StyledTableCell align='center'>Created At</StyledTableCell>
            <StyledTableCell align='center'>Last SignIn At</StyledTableCell>
            <StyledTableCell align='center'>Diabled</StyledTableCell>
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
              {searchedUser ? (searchedUser.disabled ? 'Yes' : 'No') : ''}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
  };
};

export default connect(mapStateToProps)(SearchUser);
