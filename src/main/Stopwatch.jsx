import React from 'react';
import { NavLink } from 'react-router-dom';

const styles = {
  exerciseButton: {
    width: "150px",
    height: "150px",
    padding: "10px 10px",
    borderRadius: "100px",
    borderWidth: '2px',
    borderColor: "#51BBFF",
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#51BBFF',
    display: 'inline-block',
  },
}

const Stopwatch = () => (
  <NavLink to='main/workout'>
    <button
      type="button"
      className="btn"
      style={styles.exerciseButton}
    >
      Exercise!
      </button>
  </NavLink>
);

export default Stopwatch;
