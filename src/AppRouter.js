import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { auth } from './firebase.js'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import Login from './Login';
import Register from './Register';
import Create from './hunsu/JSX/Create';
import PostDetail from './hunsu/JSX/PostDetail';
import Workout from './main/Workout';

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
				<Container fluid>
					<Row className="justify-content-sm-center">
						{this.state.user &&
							<>
								<Switch>
									<Route path="/post/create" exact component={Create}></Route>
									<Route path="/post/detail" exact component={PostDetail}></Route>
									<Route path="/main/workout" exact component={Workout} />
									<Route path="/" render={() => <App user={this.state.user} index={this.props.index} />} />
								</Switch>
							</>
						}
						{!this.state.user &&
							<Switch>
								<Route path="/login" exact component={Login} />
								<Route path="/register" exact component={Register} />
								<Route path="/" exact component={Login} />
							</Switch>
						}
					</Row>
				</Container>
			</Router >
		);
	}
}

export default AppRouter;
