import React, { useState } from 'react';
import { NavLink, Col } from 'react-bootstrap';
import ReactStopwatch from 'react-stopwatch';

import PopUp from './PopUp';

const styles = {
  btnCircle: {
    marginTop: '400px',
    width: "150px",
    height: "150px",
    padding: "10px 10px",
    borderRadius: "100px",
    borderWidth: '2px',
    borderColor: "#5DB075",
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#5DB075',
  },
}

const Workout = (props) => {
  const [timeSpent, setTimeSpent] = useState('00:00:00');
  const [pop, setPop] = useState(false);
  

  const onClick = () => {
    setPop(true)
  };

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
      formatted = formatted.concat('0', sec)
    } else {
      formatted = formatted.concat(sec)
    }
    return formatted
  }

  return (
    <div>
      <ReactStopwatch
        seconds={0}
        minutes={0}
        hours={0}
        onCallback={() => console.log('Finish')}
        onChange={({hours, minutes, seconds}) => {
          const hey = makeFormat(hours, minutes, seconds);
          setTimeSpent(hey)
        }}
        render={({ formatted }) => (<div>{formatted}</div>)}
      />
      <NavLink to="/main">
        <button
          type="button"
          class="btn"
          style={styles.btnCircle}
          onClick={onClick}
        >
          Done!
        </button>
      </NavLink>
      {pop &&
        <PopUp handleSubmit={setPop} timestamp={props.location.state.timestamp} timeSpent={timeSpent} />
      }
    </div>
  );
}

export default Workout;