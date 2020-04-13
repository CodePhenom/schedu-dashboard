import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { findUserByEmail } from '../../store/actions/admin-actions';
import { TextField, Button, Paper } from '@material-ui/core';
import UserTable from './UserTable';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginRight: 10,
    width: 300,
  },
  input: {
    fontSize: 16,
    padding: 10,
  },
}));

const Admin = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (trimmed) {
      props.findUserByEmail(email);
    }
  };

  return (
    <div>
      <Paper>
        <h1>ADMIN</h1>
        <form>
          <TextField
            className={classes.textField}
            id='filled-search'
            placeholder='Search User by Email'
            type='search'
            name='email'
            InputLabelProps={{ shrink: false }}
            InputProps={{
              disableUnderline: true,
              classes: {
                input: classes.input,
              },
            }}
            onChange={handleChange}
          />
          <Button
            onClick={handleSearch}
            variant='contained'
            type='submit'
            size='small'
          >
            FIND
          </Button>
        </form>
      </Paper>
      <UserTable />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  admin: state.admin,
});

const mapDispatchToProps = (dispatch) => ({
  findUserByEmail: (email) => dispatch(findUserByEmail(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
