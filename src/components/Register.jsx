import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Paper, TextField, Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { register } from './../store/actions/auth-actions';
import firebase from './../config/firebase-config';

const COMPONENT = 'Register';

class Register extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    shouldRedirect: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSignup = async (e) => {
    e.preventDefault();
    try {
      await this.props.register({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      });
      this.setState({ shouldRedirect: true });
    } catch (error) {
      console.log(COMPONENT, error);
    }
  };

  render() {
    if (this.state.shouldRedirect === true || !this.props.auth.isEmpty) {
      return <Redirect to='/' />;
    }

    const { authError } = this.props;

    return (
      <Paper elevation={3}>
        <h1>Register</h1>
        <form>
          <TextField
            required
            id='email'
            name='email'
            label='Email'
            variant='outlined'
            placeholder='Email'
            onChange={this.handleChange}
            value={this.state.email}
          />
          <TextField
            required
            id='firstName'
            name='firstName'
            label='Firstame'
            variant='outlined'
            placeholder='Firstname'
            onChange={this.handleChange}
            value={this.state.firstName}
          />
          <TextField
            required
            id='lastName'
            name='lastName'
            label='Lastname'
            variant='outlined'
            placeholder='Lastname'
            onChange={this.handleChange}
            value={this.state.lastName}
          />
          <TextField
            required
            id='password'
            name='password'
            label='Password'
            type='password'
            placeholder='Password'
            variant='outlined'
            onChange={this.handleChange}
            value={this.state.password}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={this.handleSignup}
          >
            Signup
          </Button>
        </form>
        <Typography component={Link} to='/login'>
          Already have an account? Login!
        </Typography>
        {authError && <Typography>{authError}</Typography>}
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => dispatch(register(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
