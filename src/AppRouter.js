import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Register from './Register';
import firebase, { auth, provider } from './firebase.js'
import Create from './hunsu/JSX/Create';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostDetail from './hunsu/JSX/PostDetail';
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

	render() {
		return (
			<Router>
				<div className="app">
					<nav className="main-nav">
						{this.state.user &&
							<a href="#!" onClick={this.logOutUser}>Logout</a>
						}
					</nav>
					<div className="container-fluid">
						<Switch>
							<Route path="/" exact render={() => <App user={this.state.user} />} />
							<Route path="/login" exact component={Login} />
							<Route path="/register" exact component={Register} />
							<Route path="/create" component={Create}></Route>
							<Route path="/post/detail" component={PostDetail}></Route>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default AppRouter;