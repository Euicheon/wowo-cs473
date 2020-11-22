import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import SwipeableRoutes from 'react-swipeable-routes';

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

import './App.css';

const styles = {
  fixSize: {
    height: '600px',
    width: '350px',
  },
  navigation: {
    backgroundColor: '#EEEEEE',
  }
};

const App = (props) => {
  const [index, setIndex] = useState(props.index || 0);

  const handleChange = (event, value) => {
    setIndex(parseInt(value))
  };

  const handleChangeIndex = (value) => {
    setIndex(value)
  };

  return (
    <div className="app-home--container">
      {props.user &&
        <>
          <SwipeableRoutes animateHeight={true} style={styles.fixSize} index={index} onChangeIndex={handleChangeIndex} enableMouseEvents>
            <Route path="/main" component={MainPage} />
            <Route path="/crew" component={() => <CrewPage user={props.user} />} />
            <Route path="/hunsu" component={HunsuPage} />
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
        </>
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
