import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import '../CSS/create.css';

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

const Create = () => {

    const [data, setData] = useState('');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');
    const [previewURL, setPreViewURL] = useState('');

    const writeBoard = () => {
        let url;
        let send_param;

        const boardTitle = title;
        const boardContent = data;
    
        if (boardTitle === undefined || boardTitle === "") {
          alert("Write the title");
          return;
        } else if (boardContent === undefined || boardContent === "") {
          alert("Write the contents");
          return;
        }

        url = "http://localhost:8080/post/write";
        send_param = {
            headers,
            "_id" : 'myoons',
            "title": boardTitle,
            "content": boardContent,
        };
    
        axios.post(url, send_param)
          // Successed
          .then(returnData => {
            if (returnData.data.message) {
              alert(returnData.data.message);
              window.location.href = "/hunsu";
            } else {
              alert("Posting Failed");
            }
          })
          // Error
          .catch(err => {
            console.log(err);
          });
    };

    const handleTitleChange = evt => {setTitle(evt.target.value)};

    const handleFileOnChange = evt => {
      evt.preventDefault();
      let reader = new FileReader();
      let file = evt.target.files[0];
      reader.onloadend = () => {
        setFile(file);
        setPreViewURL(reader.result);
      }
      reader.readAsDataURL(file);
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
            <NavLink to='/hunsu'> <Button className='button'> Quit </Button> </NavLink>
          </div>
      </div>
    );
}

export default Create;