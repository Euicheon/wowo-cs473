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

const makeFormat = (h, m, s) => {
  const hour = h.toString(); 
  const min = m.toString(); 
  const sec = s.toString();
  var formatted = '';

  // console.log(hour, min, sec);

  if (hour.length === 1) {
    formatted = formatted.concat('0', hour, ':')
  } else {
    formatted = formatted.concat(hour, ':')
  }

  if (min.length === 1) {
    formatted = formatted.concat('0', min, ':')
  } else {
    formatted = formatted.concat(min, ':')
  }

  if (sec.length === 1) {
    formatted = formatted.concat('0', sec, ':')
  } else {
    formatted = formatted.concat(sec, ':')
  }
  return formatted
}

const Stopwatch = () => {
  const [start, setStart] = useState(false);
  const [pop, setPop] = useState(false);
  const [timeSpent, setTimeSpent] = useState('00:00:00');
  const [doneTime, setDoneTime] = useState(new Date());

  const onClick = () => {
    if (start) {
      setPop(true)
      setDoneTime(new Date())
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
          onChange={({hours, minutes, seconds}) => {
            const formatted = makeFormat(hours, minutes, seconds);
            setTimeSpent(formatted)
          }}
          render={({ formatted }) => (<div>{formatted}</div>)}
        />}
      {pop &&
        <PopUp handleSubmit={setPop} timestamp={doneTime} timeSpent={timeSpent} />
      }
      <button style={styles.button} onClick={onClick}>
        {start ? 'DONE' : 'START'}
      </button>
    </>
  );
};

export default Stopwatch;
