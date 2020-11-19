import React from 'react';
import Stopwatch from './Stopwatch';

const styles = {
	align: {
		backgroundColor: 'skyblue',
		textAlign: 'center',
		height: '650px',
		width: '400px',
		margin: 'auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
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