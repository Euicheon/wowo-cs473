import React from 'react';

import Stopwatch from './Stopwatch';
import calendar from '../calendar.png';

const styles = {
	align: {
		textAlign: 'center',
		height: '600px',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
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
			<Stopwatch />
		</div>
	);
};

export default MainPage;