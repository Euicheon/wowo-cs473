import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase, {auth} from './firebase.js'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import Login from './Login';
import Register from './Register';
import Create from './hunsu/JSX/Create';
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

	logOutUser() {
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
					<div className="container-fluid">
						<Switch>
							<Route path="/" exact render={() => <App user={this.state.user} index={this.props.index} />} />
							<Route path="/login" exact component={Login} />
							<Route path="/register" exact component={Register} />
							<Route path="/hunsu/post/create" exact component={Create}></Route>
							<Route path="/hunsu/post/detail" exact component={PostDetail}></Route>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default AppRouter;