import React from 'react';
import firebase from '../firebase';

const styles = {
  background: {
    position: 'fixed',
    zIndex: '1',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  popup: {
    backgroundColor: 'white',
    position: 'absolute',
    top: '20%',
    left: '30%',
    width: '40%',
    padding: '20px',
    borderRadius: '5px',
    border: '2px solid black',
  },
}

var db = firebase.firestore();
const user = firebase.auth().currentUser;

const PopUp = (props) => {
  const onShare = () => {
    // 소속 crew에 운동기록 올리고 이동
  }
  const onCancel = () => {
    db.collection("users").doc(user.uid).set({
      workoutHistory: {timestamp: props.timestamp, duration: props.timeSpent}
    }, {merge: true})
    .then(function() {
      console.log("Adding document");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
    props.handleCancel()
  }

  return (
    <div style={styles.background}>
      <div style={styles.popup}>
        <button onClick={onShare} >Share</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default PopUp;