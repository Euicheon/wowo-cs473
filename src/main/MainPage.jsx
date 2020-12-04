import React from 'react';

import Stopwatch from './Stopwatch';
// import CalendarRecord from '../calendar/CalendarRecord';
import calendar from '../BlueCalendar.png';

const styles = {
	align: {
		textAlign: 'center',
		height: '600px',
		width: '433px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		textAlign: 'center',
	},
	calendar: {
		margin: '10px 0 50px 0',
	},
};

const MainPage = () => {
	return (
		<div style={styles.align}>
			<div>
				<img src={calendar} alt='calendar' style={styles.calendar} />
			</div>
			{/* <CalendarRecord /> */}
			<Stopwatch />
		</div>
	);
};

export default MainPage;