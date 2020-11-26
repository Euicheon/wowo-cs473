import React from 'react';
import './Calendar.css';
import calendar from './demo_calendar.jpeg';

const styles = {
	align: {
		backgroundColor: 'skyblue',
		textAlign: 'center',
		height: '100%',
		width: '100%',
	},
};


const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 1
      }}
  />
);

const CalendarPage = () => {
	return (
		<div class = "calendar_img">
			<h2 id = "ubuntuFont" className="titleCalendar">Calendar</h2>
      <ColoredLine color="gray" />
			<img src={calendar} style={styles.align} alt='' />
		</div>
	);
};

export default CalendarPage;
