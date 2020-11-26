import React from 'react';
import firebase from '../firebase';
import Demographic from './Demographics'
import Topbar from './Topbar';


import {Link} from 'react-router-dom'
import {Checkbox, Icon, Button} from 'react-materialize'

import './infoPage.css';
import demoProfile from './demoProfile.png';

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
    gender:'Female',
    birth: '991225',
    crew: 'Imposters',
    points:'100',
    profileImgPath: ''
  }




  render() {
    return (
      <div style={{textAlign: "center"}}>
        <h2 id = "ubuntuFont" className="titleProfile">Profile</h2>
        <ColoredLine color="gray" />

        <div className="profile-box">
          <img src={demoProfile} alt="" style={styles.profileImg} ></img>
          <h2 id="ubuntuSmallBold" className="name">{this.state.username}</h2>
          <h2 id="ubuntuSmallGray">{this.state.email}</h2> 
          <h2 id="ubuntuSmallPink">Crew: {this.state.crew} | Points: {this.state.points}</h2> 
        </div>

        <ColoredLine color="gray" />
        

      </div>
    )
  }
}

export default InfoPage;


{/* 

class InfoPage extends React.Component {
  userList = null;

  state = {
    username: '',
    email: '',
    gender:'',
    birth: '',
    crew: '',
    points:'',
    profileImgPath: ''
  }


  getUserInfo(id) {
    for(var key in this.userList) {
      var args = this.userList[key];
      if(args['id']==id) {
        return args;
      }
    }
  }
  getFireDB(dir) {
    if (dir===null)
      dir = '/';
    return firebase.database().ref(dir).once('value')
  }

  download_picture(pictureurl, _this) {
    var Storageref = firebase.storage().ref();
    
    var strarray = pictureurl.split('/')
    const images = Storageref.child(strarray[0])
    const image = images.child(strarray[1]) 
  
    firebase.storage().ref('User').child(strarray[1]).getDownloadURL().then(function(url) {
        
        
        _this.setState({url});
      
        _this.setState({mount:false});
  
    }).catch(function(error) {
      // Handle any errors
      _this.setState({mount:false});
      
      return;
    });
  }

  constructor(props) 
  {
    super(props);
    getFireDB('/User').then(
      result => {
        this.userList = result.val();
        var args = this.getUserInfo('유나');
        this.setState({...this.state, Name:args['name'], Class:args['class'], Age:args['age'], Tel: args['tel']});
        download_picture(args['picture'], this);
      }
    )
  }


  render() {
    return (
      <div className="profile-box" style={{textAlign: "center"}}>
        <div>
          <Topbar name="Profile" showBack={false}></Topbar>
        </div>
        <div className="ProfileContainer">
          <hr style = {{width: "100%", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
          <Demographic Name={this.state.Name} Age={this.state.Age} Tel={this.state.Tel} Class={this.state.Class} ImageURL={this.state.url}/>
          <hr style = {{width: "100%", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
          <div className="ButtonContainer">
            <Link to={"/donation"}>
              <Button className="Button">Update profile</Button>
            </Link>
            <Link to={"/"}>
              <Button className="Button">Logout</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default InfoPage;
*/}



{/*
const InfoPage = () => {
  return (
    <div style={styles.align}>
      InfoPage
    </div>
  );
};
*/}

{/*
class InfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      gender:'',
      birth: '',
      crew: '',
      points:'',
      profileImgPath: ''
    }
  }

  render(){
    return(
      <div classname='profile-box'>
        <label>**Profile**</label>

        <img src={demoProfile} class='profile-img' />
        
        <label>{this.props.result}</label>
      </div>

    )
  }
}

export default InfoPage;

*/}



