import React, { useState } from 'react';
import ReactStopwatch from 'react-stopwatch';

import PopUp from './PopUp'
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
  const [pop, setPop] = useState(false);
  const [timeSpent, setTimeSpent] = useState('00:00:00');
  const [doneTime, setDoneTime] = useState(Date.now);

  const onClick = () => {
    if (start) {
      setPop(true)
      setDoneTime(Date.now)
    }
    setStart(!start)
  };

  return (
    <>
      {start &&
        <ReactStopwatch
          seconds={0}
          minutes={0}
          hours={0}
          onCallback={() => console.log('Finish')}
          render={({ formatted }) => {
            setTimeSpent(formatted)
            return (<div>{formatted}</div>)
          }}
        />}
      {pop &&
        <PopUp handleCancel={setPop} timestamp={doneTime} timeSpent={timeSpent} />
      }
      <button style={styles.button} onClick={onClick}>
        {start ? 'DONE' : 'START'}
      </button>
    </>
  );
};

export default Stopwatch;
