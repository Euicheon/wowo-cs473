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

import './App.css';

const styles = {
	align: {
		textAlign: 'center',
		height: '650px',
		width: '400px',
  },
  fixSize: {
    overflowX: 'hidden',
    height: '600px',
		width: '400px',
  }
};

const App = (props) => {
  const [index, setIndex] = useState(0);

  const handleChange = (event, value) => {
    setIndex(parseInt(value))
  };

  const handleChangeIndex = (value) => {
    setIndex(value)
  };

  return (
    <div className="home--container">
      <h1>Welcome to the wowo!</h1>
      {props.user &&
        <div style={styles.align}>
          <SwipeableViews style={styles.fixSize} index={index} onChangeIndex={handleChangeIndex} enableMouseEvents>
            <MainPage />
            <CrewPage user={props.user} />
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
