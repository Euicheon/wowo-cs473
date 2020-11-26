import React from 'react';
import './Calendar.css';
import calendar from './demo_calendar.jpeg';

const styles = {
	align: {
		textAlign: 'center',
		height: '600px',
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
		<div style={styles.align} >
			<h2 id = "ubuntuFont" className="titleCalendar">Calendar</h2>
      <ColoredLine color="gray" />
			<img src={calendar} alt='' />
		</div>
	);
};

export default CalendarPage;
