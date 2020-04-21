import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  findUserByEmail,
  findUserById,
} from '../../store/actions/admin-actions';
import { TextField, Button, Paper, NativeSelect } from '@material-ui/core';
import UserTable from './UserTable';

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      background: theme.palette.common.white,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 30px',
      marginBottom: 40,
    },
    title: {
      color: theme.palette.grey['800'],
    },
    searchForm: {
      display: 'flex',
      alignItems: 'center',
    },
    textField: {
      width: 200,
      height: 35,
      border: `1px solid ${theme.palette.secondary['300']}`,
      borderRadius: 3,
    },
    input: {
      fontSize: 14,
      padding: 10,
      background: theme.palette.secondary,
      color: theme.palette.grey['900'],
    },
    select: {
      height: 35,
      border: `1px solid ${theme.palette.secondary['300']}`,
      borderRadius: 3,
      color: theme.palette.grey['600'],
      fontSize: 14,
      padding: 10,
      marginRight: 5,
    },
    searchButton: {
      height: 33,
      outline: 'none',
      backgroundColor: theme.palette.primary['300'],
    },
  };
});

const Users = (props) => {
  const classes = useStyles();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = React.useState('id');

  const handleChangeEmail = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleChangeSearchBy = (event) => {
    setSearchBy(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmed = searchQuery.trim();
    if (trimmed) {
      switch (searchBy) {
        case 'id':
          props.findUserById(trimmed);
          break;
        case 'email':
          props.findUserByEmail(trimmed);
          break;
        default:
          return;
      }
    }
  };

  return (
    <div>
      <Paper square className={classes.paper}>
        <h1 className={classes.title}>Users</h1>
        <form className={classes.searchForm}>
          <TextField
            className={classes.textField}
            id='filled-search'
            placeholder='Search User'
            type='search'
            name='email'
            InputLabelProps={{ shrink: false }}
            InputProps={{
              disableUnderline: true,
              classes: {
                input: classes.input,
              },
            }}
            onChange={handleChangeEmail}
          />
          <NativeSelect
            native
            className={classes.select}
            defaultValue='id'
            placeholder='Search By'
            id='grouped-native-select'
            onChange={handleChangeSearchBy}
            InputProps={{
              disableUnderline: true,
              classes: {
                input: classes.input,
              },
            }}
          >
            <option value='id'>By ID</option>
            <option value='email'>By Email</option>
          </NativeSelect>
          <Button
            onClick={handleSearch}
            variant='contained'
            type='submit'
            size='small'
            className={classes.searchButton}
          >
            Search
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
  findUserById: (id) => dispatch(findUserById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
