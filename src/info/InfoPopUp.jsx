import React from 'react';
import { Button } from 'react-bootstrap';

const styles = {
  background: {
    position: 'fixed',
    zIndex: '1',
    width: '433px',
    height: '600px',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    textAlign: 'center',
  },
  popup: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: '80%',
    padding: '20px',
    borderRadius: '5px',
  },
  upload: {
    border: '1px solid lightGrey',
    padding: '10px 10px 10px 10px',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#EEEEEE',
    whiteSpace: 'pre-wrap'
  },
  btnShare: {
    width: '100%',
    marginTop: '10px',
    marginBottom: '5px',
    background: '#41ABFF',
    borderColor: 'none',
    color: 'white',
  },
  btnCancel: {
    width: '100%',
    background: 'white',
    borderColor: '#41ABFF',
    color: '#41ABFF',
  },
}
const PopUp = (props) => {
  return (
    <div style={styles.background}>
      <div style={styles.popup}>
        <h4>How can I get the points?</h4>
        {/* <div>Would you share this exercise record with your Crew?</div> */}
        <div style={styles.upload}>
          🏋️‍♂️ WORKOUT on the Main tab!
          <br />
          (1pt for each 10min)
          <br />
          📝 POST on the Hunsu tab.
          <br />
          (2pt for each post)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', }}>
          <Button style={styles.btnCancel} onClick={props.handleSubmit}>Back</Button>
        </div>
      </div>
    </div>
  )
}

export default PopUp;