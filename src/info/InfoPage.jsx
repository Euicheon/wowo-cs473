import React from 'react';

const styles = {
  align: {
    backgroundColor: 'skyblue',
    textAlign: 'center',
		height: '680px',
		width: '400px',
		margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const InfoPage = () => {
  return (
    <div style={styles.align}>
      InfoPage
    </div>
  );
};

export default InfoPage;