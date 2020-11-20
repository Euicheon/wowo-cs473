import React, { useState } from 'react';
import ReactStopwatch from 'react-stopwatch';

const styles = {
  button: {
    position: 'absolute',
    bottom: '200px',
    backgroundColor: "#4CAF50",
    border: 'none',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    borderRadius: '50%',
  }
}

const Stopwatch = () => {
  const [start, setStart] = useState(false);

  const onClick = () => {
    setStart(!start)
  };

  return (
    <>
      {start && <ReactStopwatch
        seconds={0}
        minutes={0}
        hours={0}
        onCallback={() => console.log('Finish')}
        render={({ formatted }) => (
            <div>{formatted}</div>)}
      />}
      <button style={styles.button} onClick={onClick}>
        {start ? 'STOP' : 'START'}
      </button>
    </>
  );
};

export default Stopwatch;