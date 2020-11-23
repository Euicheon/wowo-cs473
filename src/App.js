import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import SwipeableRoutes from 'react-swipeable-routes';
import { Col, Navbar, Nav, } from 'react-bootstrap';

import MainPage from './main/MainPage';
import CrewPage from './crew/CrewPage';
import HunsuPage from './hunsu/HunsuPage';
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
        console.log(doc);
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }
  console.log("beforeUSE", props)
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
  console.log("afterUSE", props)
  return (
    <>
      {props.user &&
        <Col lg={4} md={6} sm={8}>
          <Navbar bg="light" expand="sm">
            <Navbar.Brand>wowo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link onClick={() => firebase.auth().signOut()}href="/login">Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <SwipeableRoutes animateHeight={true} style={styles.fixSize} index={index} onChangeIndex={handleChangeIndex} enableMouseEvents>
            <Route path="/main" exact component={MainPage} />
            <Route path="/crew" exact component={() => <CrewPage user={props.user} />} />
            <Route path="/hunsu" exact component={HunsuPage} />
            <Route path="/calendar" exact component={CalendarPage} />
            <Route path="/info" exact component={InfoPage} />
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
