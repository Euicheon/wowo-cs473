import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import '../CSS/create.css';
import firebase from '../../firebase';

const Create = () => {

    const [data, setData] = useState('');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');
    const [previewURL, setPreViewURL] = useState('');
    const [username, setUserName] = useState('');
    const [imgPath, setImgPath] = useState('https://firebasestorage.googleapis.com/v0/b/wowo-cs473.appspot.com/o/wowo_logo.png?alt=media&token=fc8dfa4e-777f-4746-9aa0-cca5268e7008');

    const rtdb = firebase.database();
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;

    db.collection('users').doc(user.uid).get().then(userdata => {
      console.log('user : ',userdata.data().username);
      setUserName(userdata.data().username);
    })
    
    const increment = firebase.firestore.FieldValue.increment(2);

    const writeBoard = async () => {

        const boardTitle = title;
        const boardContent = data;
    
        if (boardTitle === undefined || boardTitle === "") {
          alert("Write the title");
          return;
        }

        db.collection("users").doc(user.uid).get().then(doc => {

          db.collection('users').doc(user.uid).update({
            points: increment
          })

          rtdb.ref().child(doc.data().crew).push({
              message: username + " wrote a new post / " + 'Title : ' + title,
              user: 'system',
              timestamp: new Date().getTime()
            })
          })
          .catch(function (error) {
            console.error("Error getting document: ", error);
          });

        const posts = firebase.firestore().collection('posts');
        posts.add({
            writer: username,
            title: boardTitle,
            content: boardContent,
            imgPath: imgPath,
            timestamp: new Date(),
            whoLikes: [],
            comments: []
        }).then(docRef => {
            console.log('New Post Created : ', docRef.id)
            alert('You got 2 points!');
            window.location.href = process.env.PUBLIC_URL + "/hunsu";
          }).catch(err => {
            console.log('New Posting Failed : ',err)
            alert("Posting Failed");
          })
    };

    const handleTitleChange = evt => {setTitle(evt.target.value)};

    const handleFileOnChange = evt => {
      evt.preventDefault();
      let reader = new FileReader();
      let prevFile = file;
      let currentFile = evt.target.files[0];
      reader.onloadend = () => {
        setFile(currentFile);
        setPreViewURL(reader.result);

        const storageRef = firebase.storage().ref('postImages');
        storageRef.child(currentFile.name).put(currentFile).then(snapshot => {
          snapshot.ref.getDownloadURL().then(image => {
            setImgPath(image)
          });
        })
      }

      if (currentFile!==undefined) {reader.readAsDataURL(currentFile);}
      else {
        setFile(prevFile);
        alert("Canceled changing image");
        console.log(file)
      }
    }

    let profile_preview = null;
    if (file !== '') {profile_preview = <img className='profile_preview' src={previewURL} alt={title} />}
    else {profile_preview = <div className='empty'> <br/> <br/> Click to upload image</div>}

    return (
      <div className="create">
        <h4>Create New Posts!</h4>
        <h5 className='description'>Title</h5>
          <input
            type="text"
            className='title'
            onChange={handleTitleChange}
          />
          
          <div>
          <h5 className='description'>Image</h5>
            <label htmlFor="input" className="img-holder">
                {profile_preview}      
            </label>
              <input id ='input' type='file' accept='image/jpg, image/png, image/jpeg, image/gif' name='image-upload' onChange={handleFileOnChange}/>
            
            <h5 className='description'>Content</h5>
            <ReactQuill theme="bubble" className='editor' value={data} onChange={setData}/>
          </div>
            
          <div className='buttonContainer'>
            <Button onClick={writeBoard} className='button'> Save </Button>
            <NavLink to={process.env.PUBLIC_URL + '/hunsu'}> <Button className='button'> Quit </Button> </NavLink>
          </div>
      </div>
    );
}

export default Create;