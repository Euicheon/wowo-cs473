import React from 'react';
import firebase from './firebase'
import './Auth.css';

const styles = {
  fixSize: {
    height: '600px',
    width: '350px',
    borderColot: 'black',
  },
  margin: {
		marginBottom: '40px',
	},
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      error: null
    }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.props.history.push('/main');
      })
      .catch(error => {
        this.setState({ error });
      });
  }
  render() {
    const { email, password, error } = this.state;
    return (
      <div className="auth--container" style={styles.fixSize}>
        <h2 style={styles.margin}>Login your account</h2>
        {error && <p className="error-message">{error.message}</p>}
        <form onSubmit={this.handleSubmit}>
          {/* <label htmlFor="username">Username</label> */}
          {/* <input type="text" name="username" id="username" value={username} onChange={this.handleChange} /> */}
          <label htmlFor="email">Email address</label>
          <input type="text" name="email" id="email" value={email} onChange={this.handleChange} />
          <label htmlFor="password">Enter password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            style={styles.margin}
            onChange={this.handleChange}
          />
          <button className="general-submit" children="Get Started" />
          {/* <p>Already have an account? <Link className="login-btn" to="/login">Login here</Link></p> */}
        </form>
      </div>
    );
  }
}
export default Login;