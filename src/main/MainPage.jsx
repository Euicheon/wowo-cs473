import React from 'react';
import Stopwatch from './Stopwatch';

const styles = {
	align: {
		backgroundColor: 'skyblue',
		textAlign: 'center',
		height: '600px',
		width: '400px',
	},
};

const MainPage = () => {
	return (
		<div style={styles.align}>
			<Stopwatch />
		</div>
	);
};

export default MainPage;