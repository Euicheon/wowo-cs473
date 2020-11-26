import React from 'react';
import './Calendar.css';
import calendar from './demo_calendar.jpeg';

const styles = {
	align: {
		textAlign: 'center',
		height: '520px',
		width: '90%',
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
		<div className="calendar_img">
			<div style={{textAlign: 'center'}}>
				<h2 id="ubuntuFont" className="titleCalendar">Calendar</h2>
				<ColoredLine color="gray" />
				<img src={calendar} style={styles.align} alt='' />
				</div>
		</div>
	);
};

export default CalendarPage;
