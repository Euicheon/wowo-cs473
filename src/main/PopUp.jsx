import React from 'react';
import { NavLink } from 'react-router-dom'; 
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
// var realtimeDB = f

const PopUp = (props) => {
  const onShare = () => {
    props.handleSubmit(false)
    console.log("this is props: ", props)
    const user = firebase.auth().currentUser;
    // 소속 crew에 운동기록 올리고 이동
    db.collection("users").doc(user.uid).set({
      workoutHistory: {timestamp: props.timestamp, duration: props.timeSpent},
    }, {merge: true})
    .then(() => {
      // db.collection("users").doc(user.uid).get()
      // .then((doc) => {
      //   console.log("find it!: ", doc.data())
      //   // 해당 crew real-time db 에 운동기록 메세지 추가
      // })
      // .catch(function(error) {
      //   console.error("Error getting document: ", error);
      // });
      console.log("Adding document");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });


  }
  const onCancel = () => {
    props.handleSubmit(false)
    console.log("this is props: ", props)

    const user = firebase.auth().currentUser;

    db.collection("users").doc(user.uid).set({
      workoutHistory: {timestamp: props.timestamp, duration: props.timeSpent.toString()}
    }, {merge: true})
    .then(function() {
      console.log("Adding document");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  return (
    <div style={styles.background}>
      <div style={styles.popup}>
        <NavLink to="/crew"><button onClick={onShare}>Share</button></NavLink>
        <NavLink to="/main"><button onClick={onCancel}>Cancel</button></NavLink>
      </div>
    </div>
  )
}

export default PopUp;