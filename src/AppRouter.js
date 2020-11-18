import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Register from './Register';

class AppRouter extends React.Component{
	render(){
		return(
			<Router>
				<div className="app">
					<nav className="main-nav">
						<Link to="/">App</Link>
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
					</nav>
					<Switch>
						<Route path="/" exact component={App} />
						<Route path="/login" exact component={Login} />
						<Route path="/register" exact component={Register} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default AppRouter;