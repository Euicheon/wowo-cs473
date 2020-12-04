import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { Col, Navbar, Nav } from 'react-bootstrap';

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
  const [index, setIndex] = useState(props.index || 'main');
  const [redirect, setRedirect] = useState(true);

  const handleChange = (event, value) => {
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
    }).catch(function (error) {
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
    console.log(props.user.uid)
    console.log(props.user)
  }
  // console.log("afterUSE",props)
  return (
    <>
      {props.user &&
        <Col lg={3.5} md={5.5} sm={7.5}>
          <Navbar bg="light" expand="sm" align="center" className="navbar-custom">
            {/* <Navbar.Brand>wowo</Navbar.Brand> */}
            <a className="navbar-brand" href={process.env.PUBLIC_URL + "/main"}>
              <div className="logo-image">
                <img src={logo_img} alt="logo" className="img-fluid" />
              </div>
            </a>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" style={{ flexDirection: 'row', }}>
              <Nav className="ml-auto">
                <a onClick={() => firebase.auth().signOut()} href={process.env.PUBLIC_URL + "/login"}>Logout</a>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Route path={process.env.PUBLIC_URL + "/main"} component={MainPage} />
          <Route path={process.env.PUBLIC_URL + "/crew"} component={() => <CrewPage user={props.user} crew={crew} />} />
          <Route path={process.env.PUBLIC_URL + "/hunsu"} component={Posts} />
          <Route path={process.env.PUBLIC_URL + "/calendar"} component={CalendarPage} />
          <Route path={process.env.PUBLIC_URL + "/info"} component={() => <InfoPage user={props.user} />} />

          <BottomNavigation style={styles.navigation} value={index} onChange={handleChange} showLabels>
            <BottomNavigationAction component={Link} to={process.env.PUBLIC_URL + "/main"} label="Main" value="main" icon={<Home />} />
            <BottomNavigationAction component={Link} to={process.env.PUBLIC_URL + "/crew"} label="Crew" value="crew" icon={<Forum />} />
            <BottomNavigationAction component={Link} to={process.env.PUBLIC_URL + "/hunsu"} label="Hunsu" value="hunsu" icon={<Dashboard />} />
            <BottomNavigationAction component={Link} to={process.env.PUBLIC_URL + "/calendar"} label="Calendar" value="calendar" icon={<DateRange />} />
            <BottomNavigationAction component={Link} to={process.env.PUBLIC_URL + "/info"} label="Profile" value="profile" icon={<AccountCircle />} />
          </BottomNavigation>
        </Col>
      }
    </>
  );
}

export default App;
