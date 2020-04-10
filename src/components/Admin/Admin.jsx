import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAdmin } from '../../store/actions/auth-actions';
import { findUserByEmail } from '../../store/actions/admin-actions';
import { TextField, Button } from '@material-ui/core';
import SearchUser from './SearchUser';

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
    this.props.findUserByEmail(this.state.email);
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
          >
            FIND
          </Button>
        </form>
        <SearchUser />
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
  addAdmin: (email) => dispatch(addAdmin(email)),
  findUserByEmail: (email) => dispatch(findUserByEmail(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
