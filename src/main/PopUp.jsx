import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import firebase from '../firebase';

const styles = {
  background: {
    position: 'fixed',
    zIndex: '1',
    width: '400px',
		height: '700px',
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

var db = firebase.firestore();
var rtdb = firebase.database();
const increment = firebase.firestore.FieldValue.increment(1); 
// increment 안에 숫자 변경하면 증가하는 point 증가 

const PopUp = (props) => {
  const user = firebase.auth().currentUser;
  const dh = parseInt(props.timeSpent / 1000 / 60 / 60);
  const dm = parseInt(props.timeSpent / 1000 / 60);
  const ds = parseInt(props.timeSpent / 1000);
  const formattedDuration = (h, m, s) => {
    var duration = s + " sec.";
    if (h === 0 && m === 0) {
      return duration
    }
    if (h === 0) {
      return m + " min " + duration
    }
    return h + " hour " + m + " min " + duration
  }


  const uploadMessage =
    "[SYSTEM] " + user.displayName + " worked out for " + formattedDuration(dh, dm - dh*60, ds - dm*60)

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

    db.collection('users').doc(user.uid).update({
      points: increment
    })

    alert('You got 1 point!');
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

    db.collection('users').doc(user.uid).update({
      points: increment
    })

    alert('You got 1 point!');
  }

  return (
    <div style={styles.background}>
      <div style={styles.popup}>
        <h2>Great Job!</h2>
        <div>Would you share this exercise record with your Crew?</div>
        <div style={styles.upload}>{uploadMessage}</div>
        <div style={{ display: 'flex', flexDirection: 'column', }}>
          <NavLink to={process.env.PUBLIC_URL + "/crew"}><Button style={styles.btnShare} onClick={onShare}>Share</Button></NavLink>
          <NavLink to={process.env.PUBLIC_URL + "/main"}><Button style={styles.btnCancel} onClick={onCancel}>Cancel</Button></NavLink>
        </div>
      </div>
    </div>
  )
}

export default PopUp;