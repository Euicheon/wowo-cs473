import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import SwipeableRoutes from 'react-swipeable-routes';
import { Col, Navbar, Nav, } from 'react-bootstrap';

import MainPage from './main/MainPage';
import CrewPage from './crew/CrewPage';
import Posts from './hunsu/JSX/Posts';
import CalendarPage from './calendar/CalendarPage';
import InfoPage from './info/InfoPage';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
  Home,
  Forum,
  Dashboard,
  DateRange,
  AccountCircle,
} from '@material-ui/icons'
import firebase from './firebase';

import './App.css';
import logo_img from './wowo_logo.png';

var db = firebase.firestore();

const styles = {
  fixSize: {
    height: '600px',
    // width: '350px',
  },
  navigation: {
    backgroundColor: '#EEEEEE',
  }
};

const App = (props) => {
  const [crew, setCrew] = useState(null);
  const [index, setIndex] = useState(props.index || 0);

  const handleChange = (event, value) => {
    setIndex(parseInt(value))
  };

  const handleChangeIndex = (value) => {
    setIndex(value)
  };

  const crewValidity = (uid) => {
    var docRef = db.collection("users").doc(uid);
    docRef.get().then(function (doc) {
      if (doc.data().crew != null) {
        setCrew(doc.data().crew)
      } else {
        // doc.data() will be undefined in this case
        // console.log(doc);
				console.log("No such document!");
			}
		}).catch(function(error) {
			console.log("Error getting document:", error);
		});
  }
  // console.log("beforeUSE",props)
  // useEffect(() => {
  //   // const user = firebase.auth().currentUser;
  //   // crewValidity(props.user.uid);
  // 	console.log('컴포넌트가 화면에 나타남',props);
  // 	return () => {
  // 	  console.log('컴포넌트가 화면에서 사라짐');
  // 	};
  //   }, []);]
  if (props.user) {
    crewValidity(props.user.uid)
  }
  // console.log("afterUSE",props)
  return (
    <>
      {props.user &&
        <Col lg={4} md={6} sm={8}>
          <Navbar bg="light" expand="sm" align = "center" class = "navbar-custom">
            {/* <Navbar.Brand>wowo</Navbar.Brand> */}
            <a class="navbar-brand" href="/">
              <div class="logo-image">
                <img src={logo_img} class="img-fluid" />
              </div>
            </a>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" style={{flexDirection: 'row',}}>
              <Nav className="ml-auto">
                <Nav.Link onClick={() => firebase.auth().signOut()} href="/login">Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <SwipeableRoutes animateHeight={true} style={styles.fixSize} index={index} onChangeIndex={handleChangeIndex} enableMouseEvents>
            <Route path="/main" component={MainPage} />
            <Route path="/crew" component={() => <CrewPage user={props.user} crew={crew} />} />
            <Route path="/hunsu" component={Posts} />
            <Route path="/calendar" component={CalendarPage} />
            <Route path="/info" component={InfoPage} />
          </SwipeableRoutes>
          <BottomNavigation style={styles.navigation} value={index} onChange={handleChange} showLabels>
            <BottomNavigationAction label="Main" value="0" icon={<Home />} />
            <BottomNavigationAction label="Crew" value="1" icon={<Forum />} />
            <BottomNavigationAction label="Hunsu" value="2" icon={<Dashboard />} />
            <BottomNavigationAction label="Calendar" value="3" icon={<DateRange />} />
            <BottomNavigationAction label="Profile" value="4" icon={<AccountCircle />} />
          </BottomNavigation>
        </Col>
      }
    </>
  );
}

export default App;
