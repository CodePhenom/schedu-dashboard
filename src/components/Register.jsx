import React, { Component } from 'react';
import { signup } from '../clients/auth';
import { Redirect } from 'react-router-dom';
import { Paper, TextField, Button } from '@material-ui/core';

const COMPONENT = 'Register';

class Register extends Component {
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

  handleSignup = async e => {
    e.preventDefault();
    try {
      await signup(this.state.email, this.state.password);
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
      </Paper>
    );
  }
}

export default Register;
