import React from 'react';
import './Calendar.css';
import CalendarRecord from './CalendarRecord';
import calendar from './demo_calendar.jpeg';

const styles = {
	align: {
		width: '433px',
		height: '600px',
		display: 'flex',
		justifyContent: 'center',
	},
	calendar: {
		marginTop: '5%',
	}
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
		<div style={styles.align}>
			<div style={{textAlign: 'center'}}>
				<h2 id="ubuntuFont" className="titleCalendar">Calendar</h2>
				<ColoredLine color="gray" />
				{/* <img src={calendar} style={styles.align} alt='' /> */}
				<CalendarRecord />
				</div>
		</div>
	);
};

export default CalendarPage;
