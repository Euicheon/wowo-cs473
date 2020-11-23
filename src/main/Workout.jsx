import React, { useState } from 'react';
import { NavLink, Col } from 'react-bootstrap';
import ReactStopwatch from 'react-stopwatch';

import PopUp from './PopUp';

const styles = {
  stopwatch: {
    fontStyle: 'italic',
    fontSize: '50px',
    fontWeight: 'bold',
    marginTop: '200px',
  },
  beforeMargin: {
    marginTop: '20vh',
  },
  afterMargin: {
    marginTop: '50vh',
  },
  doneButton: {
    width: "150px",
    height: "150px",
    padding: "10px 10px",
    borderRadius: "100px",
    borderWidth: '2px',
    backgroundColor: "#5DB075",
    fontSize: '20px',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#FFFFFF',
  },
  fixSize: {
    height: '600px',
    width: '100%',
    textAlign: 'center',
  },
}

const Workout = (props) => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [pop, setPop] = useState(false);
  const timestamp = new Date().getTime();

  const onClick = () => {
    setPop(true);
    setTimeSpent(new Date().getTime() - timestamp);
  };

  return (
    <>
      <Col lg={4} md={6} sm={8}>
        <div style={styles.fixSize}>
          {!pop &&
            <ReactStopwatch
              seconds={0}
              minutes={0}
              hours={0}
              render={({ formatted }) => (<div style={styles.stopwatch}>{formatted}</div>)}
            />
          }
          <NavLink to="/main">
            <button
              type="button"
              class="btn"
              style={!pop ? {...styles.doneButton, ...styles.beforeMargin} : {...styles.doneButton, ...styles.afterMargin}}
              onClick={onClick}
            >
              Done!
        </button>
          </NavLink>
        </div>
      </Col>
      {
        pop &&
        <PopUp handleSubmit={setPop} timestamp={timestamp} timeSpent={timeSpent} />
      }
    </>
  );
}

export default Workout;