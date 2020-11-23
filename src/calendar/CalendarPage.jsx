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

const CalendarPage = () => {
	return (
		<div class = "calendar_img">
			<img src={calendar} style={styles.align} alt='' />
		</div>
	);
};

export default CalendarPage;
