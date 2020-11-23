import React from 'react';
import { NavLink } from 'react-router-dom';

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

const Stopwatch = () => (
    <NavLink to={{
      pathname: '/main/workout',
      state: {timestamp: new Date()}}}>
      <button
        type="button"
        class="btn"
        style={styles.btnCircle}
      >
        Exercise!
      </button>
    </NavLink>
  );

export default Stopwatch;
