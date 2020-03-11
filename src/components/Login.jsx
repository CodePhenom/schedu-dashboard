import React, { Component } from 'react';
// import { login } from '../clients/auth';
import { Redirect } from 'react-router-dom';
import { Paper, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { login } from './../store/actions/auth-actions';

const COMPONENT = 'Login';

class Login extends Component {
  state = {
    email: '',
    password: '',
    shouldRedirect: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogin = async e => {
    e.preventDefault();
    try {
      this.props.login({
        email: this.state.email,
        password: this.state.password
      });
      this.setState({ shouldRedirect: true });
    } catch (error) {
      console.log(COMPONENT, error);
    }
  };

  render() {
    if (this.state.shouldRedirect === true) {
      return <Redirect to='/' />;
    }

    return (
      <Paper elevation={3}>
        <h1>Login</h1>
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
            onClick={this.handleLogin}
            variant='contained'
            color='primary'
          >
            Login
          </Button>
        </form>
      </Paper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(login(credentials))
});

export default connect(null, mapDispatchToProps)(Login);
