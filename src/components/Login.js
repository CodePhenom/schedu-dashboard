import React, { Component } from 'react';
import fire from '../firebase-app';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  componentDidMount() {}

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  login = e => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => console.log(user))
      .catch(error => console.log(error));
  };

  signup = e => {
    console.log(fire);
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => console.log(user))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <form>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            onChange={this.handleChange}
            value={this.state.email}
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            onChange={this.handleChange}
            value={this.state.password}
          />
          <button onClick={this.login}>Login</button>
          <button onClick={this.signup}>Signup</button>
        </form>
      </div>
    );
  }
}

export default Login;
