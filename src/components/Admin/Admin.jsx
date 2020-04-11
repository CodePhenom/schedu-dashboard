import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findUserByEmail } from '../../store/actions/admin-actions';
import { TextField, Button } from '@material-ui/core';
import UserTable from './UserTable';

class Home extends Component {
  state = {
    email: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const trimmed = email.trim();
    if (trimmed) {
      this.props.findUserByEmail(this.state.email);
    }
  };

  render() {
    return (
      <div>
        <h1>ADMIN</h1>
        <form>
          <TextField
            id='filled-search'
            label='Search User by Email'
            type='search'
            variant='filled'
            name='email'
            onChange={this.handleChange}
          />
          <Button
            onClick={this.handleSearch}
            color='primary'
            variant='contained'
            type='submit'
          >
            FIND
          </Button>
        </form>
        <UserTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  admin: state.admin,
});

const mapDispatchToProps = (dispatch) => ({
  findUserByEmail: (email) => dispatch(findUserByEmail(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
