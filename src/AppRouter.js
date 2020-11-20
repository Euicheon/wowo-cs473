import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Register from './Register';
import firebase, { auth, provider } from './firebase.js'

class AppRouter extends React.Component {
	//Add Contstructor to AppRouter component
	constructor(props) {
		super(props);
		this.state = { user: null }
	}
	//Add componentDidMount lifecycle
	componentDidMount() {
		auth.onAuthStateChanged(user => {
			if (user) {
				this.setState({ user });
			}
		});
	}

	logOutUser () {
		firebase.auth().signOut()
		.then(window.location = "login");
	}

	render() {
		return (
			<Router>
				<div className="app">
					<nav className="main-nav">
						{this.state.user &&
							<a href="/" onClick={this.logOutUser}>Logout</a>
						}
					</nav>

					<Switch>
						<Route path="/" exact render={() => <App user={this.state.user} />} />
						<Route path="/login" exact component={Login} />
						<Route path="/register" exact component={Register} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default AppRouter;