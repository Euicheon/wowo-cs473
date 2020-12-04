import React from 'react';
import firebase from '../firebase';

import { Info } from '@material-ui/icons';

import './infoPage.css';
import demoProfile from './demoProfile.png';

var db = firebase.firestore();

const styles = {
  align: {
    backgroundColor: 'white',
    textAlign: 'center',
    height: '600px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  profileImg: {
    width: '150px',
    height: '150px',
    resizeMode: 'contain',
    margin: '10px 0 0 0',
  },
};

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 1
    }}
  />
);

class InfoPage extends React.Component {
  userList = null;

  state = {
    username: 'AmonGus',
    email: 'amongus@gmail.com',
    gender: 'Female',
    birth: '991225',
    crew: 'Imposters',
    points: '0',
    profileImgPath: ''
  }


  componentDidMount() {
    var user = firebase.auth().currentUser;
    const ref = db.collection('users').doc(user.uid);
    console.log('users', ref.data);

    db.collection("users").doc(user.uid).get()
      .then((doc) => {
        console.log("find it!: ", doc.data())
        console.log("Name1", doc.data().username)
        this.setState({ ...this.state, username: doc.data().username, email: doc.data().email, crew: doc.data().crew, points: doc.data().points })

      })
      .catch(function (error) {
        console.error("Error getting document: ", error);
      });

  }


  render() {
    return (
      <div style={{ height: "600px", width: "433px", textAlign: "center" }}>
        <h2 id="ubuntuFont" className="titleProfile">Profile</h2>
        <ColoredLine color="gray" />
        <div className="profile-box">
          <img src={demoProfile} alt="" style={styles.profileImg} ></img>
          <h2 id="ubuntuSmallBold" className="name">{this.state.username}</h2>
          <h2 id="ubuntuSmallBlack">{this.state.email}</h2>
          <div style={{ marginLeft: '20%'}}>
            <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
              <h2 id="ubuntuSmallPink">Crew: {this.state.crew} | Points: {this.state.points}</h2>
              <Info style={{ marginLeft: '1%' }} />
            </div>
          </div>
        </div>
        <ColoredLine color="gray" />


      </div>
    )
  }
}

export default InfoPage;
