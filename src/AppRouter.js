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
									<Route path="/" render={() => <App user={this.state.user} index={this.props.index} />} />
									<Route path="/hunsu/post/create" exact component={Create}></Route>
									<Route path="/hunsu/post/detail" exact component={PostDetail}></Route>
								</Switch>
							</>
						}
						{!this.state.user &&
							<Switch>
								<Route path="/" exact component={Login} />
								<Route path="/login" exact component={Login} />
								<Route path="/register" exact component={Register} />
							</Switch>
						}
					</Row>
				</Container>
			</Router >
		);
	}
}

export default AppRouter;
