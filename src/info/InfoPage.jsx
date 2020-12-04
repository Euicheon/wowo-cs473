import React from 'react';
import firebase from '../firebase';
import PopUp from './InfoPopUp';

import { IconButton } from '@material-ui/core';
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
  constructor(props) {
    super(props);
    this.state = {
      info: false,
      username: 'AmonGus',
      email: 'amongus@gmail.com',
      gender: 'Female',
      birth: '991225',
      crew: 'Imposters',
      points: '0',
      profileImgPath: '',
    }
  }
  userList = null;

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

  onInfoClick() {
    this.setState({ info: !this.state.info })
  }

  render() {
    return (
      <>
        {
          this.state.info &&
          <PopUp handleSubmit={this.onInfoClick.bind(this)} />
        }
        <div style={{ height: "600px", width: "433px", textAlign: "center" }}>
          <h2 id="ubuntuFont" className="titleProfile">Profile</h2>
          <ColoredLine color="gray" />
          <div className="profile-box">
            <img src={demoProfile} alt="" style={styles.profileImg} ></img>
            <h2 id="ubuntuSmallBold" className="name">{this.state.username}</h2>
            <h2 id="ubuntuSmallBlack">{this.state.email}</h2>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <h2 id="ubuntuSmallPink">Crew: {this.state.crew} | Points: {this.state.points}</h2>
              <IconButton onClick={this.onInfoClick.bind(this)}>
                <Info style={{ marginLeft: '1%', marginBottom: '1%' }} />
              </IconButton>
            </div>
          </div>
          <ColoredLine color="gray" />
        </div>
      </>
    )
  }
}

export default InfoPage;
