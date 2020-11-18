import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import MainPage from './main/MainPage';
import CrewPage from './crew/CrewPage';
import HunsuPage from './hunsu/HunsuPage';
import CalendarPage from './calendar/CalendarPage';
import InfoPage from './info/InfoPage';

import './App.css';

const App = () => (
  <SwipeableViews enableMouseEvents>
    <MainPage />
    <CrewPage />
    <HunsuPage />
    <CalendarPage />
    <InfoPage />
  </SwipeableViews>
);

export default App;
