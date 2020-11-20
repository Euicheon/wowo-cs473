import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
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
  align: {
    textAlign: 'center',
    height: '650px',
    width: '400px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixSize: {
    height: '650px',
    width: '400px',
  }
};

const App = (props) => {
  const [index, setIndex] = useState(0);
  const [crew, setCrew] = useState(null);

  const handleChange = (event, value) => {
    setIndex(parseInt(value))
  };

  const handleChangeIndex = (value) => {
    setIndex(value)
  };

	const crewValidity = (uid) => {
		var docRef = db.collection("users").doc(uid);
		docRef.get().then(function(doc) {
			if (doc.data().crew != null) {
				setCrew(doc.data().crew)
			} else {
        // doc.data() will be undefined in this case
        console.log(doc);
				console.log("No such document!");
			}
		}).catch(function(error) {
			console.log("Error getting document:", error);
		});
  }
  console.log("beforeUSE",props)
  // useEffect(() => {
  //   // const user = firebase.auth().currentUser;
  //   // crewValidity(props.user.uid);
	// 	console.log('컴포넌트가 화면에 나타남',props);
	// 	return () => {
	// 	  console.log('컴포넌트가 화면에서 사라짐');
	// 	};
  //   }, []);]
  if(props.user){
    crewValidity(props.user.uid)
  }
  console.log("afterUSE",props)
  return (
    <div className="home--container">
      <h1>Welcome to the wowo!</h1>
      {props.user &&
        <div style={styles.align}>
          <SwipeableViews style={styles.fixSize} index={index} onChangeIndex={handleChangeIndex} enableMouseEvents>
            <MainPage />
            <CrewPage user={props.user} crew={crew} />
            <HunsuPage />
            <CalendarPage />
            <InfoPage />
          </SwipeableViews>
          <BottomNavigation value={index} onChange={handleChange} showLabels>
            <BottomNavigationAction label="Main" value="0" icon={<Home />} />
            <BottomNavigationAction label="Crew" value="1" icon={<Forum />} />
            <BottomNavigationAction label="Hunsu" value="2" icon={<Dashboard />} />
            <BottomNavigationAction label="Calendar" value="3" icon={<DateRange />} />
            <BottomNavigationAction label="Info" value="4" icon={<AccountCircle />} />
          </BottomNavigation>
        </div>
      }
      {!props.user &&
        <div className="disallow-chat">
          <p><Link to="/login">Login</Link> or <Link to="/register">Register</Link> to start chatting!</p>
        </div>
      }
    </div>
  );
}

export default App;
