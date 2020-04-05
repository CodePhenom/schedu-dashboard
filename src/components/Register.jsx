import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Paper, TextField, Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { register } from './../store/actions/auth-actions';

const COMPONENT = 'Register';

class Register extends Component {
  state = {
    email: '',
    password: '',
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

const mapDispatchToProps = (dispatch) => ({
  register: (credentials) => dispatch(register(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
