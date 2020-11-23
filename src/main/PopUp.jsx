import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    position: 'absolute',
    top: '20%',
    left: '30%',
    width: '40%',
    padding: '20px',
    borderRadius: '5px',
  },
  upload: {
    border: '1px solid lightGrey',
    padding: '10px 10px 10px 10px',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#EEEEEE',
  },
  btnShare: {
    width: '230px',
    marginTop: '10px',
    marginBottom: '5px',
    background: '#5DB075',
    borderColor: 'none',
    color: 'white',
  },
  btnCancel: {
    width: '230px',
    background: 'white',
    borderColor: '#5DB075',
    color: '#5DB075',
  },
}

var db = firebase.firestore();
var rtdb = firebase.database();

const PopUp = (props) => {
  const user = firebase.auth().currentUser;
  const dh = parseInt(props.timeSpent/1000/60/60);
  const dm = parseInt(props.timeSpent/1000/60);
  const ds = parseInt(props.timeSpent/1000);
  const formattedDuration = (h, m, s) => {
    var duration = s +" sec.";
    if (h === 0 && m === 0) {
      return duration
    }
    if (h === 0) {
      return m + " min " + duration
    }
    return h + " hour " + m + " min " + duration
  }


  const uploadMessage = 
    "[SYSTEM] " + user.displayName + " worked out for " + formattedDuration(dh, dm, ds)

  const onShare = () => {
    props.handleSubmit(false)
    console.log("this is props: ", props)
    // 소속 crew에 운동기록 올리고 이동
    db.collection("users").doc(user.uid).update({
      workoutHistory: firebase.firestore.FieldValue.arrayUnion(
        { timestamp: props.timestamp, duration: props.timeSpent })
    })
      .then(() => {
        db.collection("users").doc(user.uid).get()
          .then((doc) => {
            console.log("find it!: ", doc.data())
            // 해당 crew real-time db 에 운동기록 메세지 추가
            rtdb.ref().child(doc.data().crew).push({
              message: uploadMessage,
              user: 'system',
              timestamp: new Date().getTime()
            })
          })
          .catch(function (error) {
            console.error("Error getting document: ", error);
          });
        console.log("Adding document");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });


  }
  const onCancel = () => {
    props.handleSubmit(false)
    console.log("this is props: ", props)

    const user = firebase.auth().currentUser;

    db.collection("users").doc(user.uid).update({
      workoutHistory: firebase.firestore.FieldValue.arrayUnion(
        { timestamp: props.timestamp, duration: props.timeSpent })
    })
      .then(function () {
        console.log("Adding document");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  return (
    <div style={styles.background}>
      <div style={styles.popup}>
        <h2>Great Job!</h2>
        <div>Would you share this exercise record with your Crew?</div>
        <div style={styles.upload}>{uploadMessage}</div>
        <NavLink to="/crew"><Button style={styles.btnShare} onClick={onShare}>Share</Button></NavLink>
        <NavLink to="/main"><Button style={styles.btnCancel} onClick={onCancel}>Cancel</Button></NavLink>
      </div>
    </div>
  )
}

export default PopUp;