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

const CalendarPage = () => {
	return (
		<div style={styles.align} >
			<img src={calendar} className="calendar_img" alt='' />
		</div>
	);
};

export default CalendarPage;
