import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import axios from "axios";
import CKEditor from "ckeditor4-react";

import '../CSS/create.css';
import upload from '../images/preview.png'
import { alignPropType } from "react-bootstrap/esm/DropdownMenu";

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

    const handleChange = evt => {setTitle(evt.target.value)};
    const onEditorChange = evt => {setData(evt.editor.getData());};

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

    const divStyle = {margin: 50};
    const titleStyle = {marginBottom: 5};
    const buttonStyle = {marginTop: 5};
    
    let profile_preview = null;
    if (file !== '') {profile_preview = <img className='profile_preview' src={previewURL} alt={title} />}
    else {profile_preview= <img src={upload} className='profile_preview' alt={title} />}

    return (
      <div style={divStyle} className="create">
        <h2>Create New Posts!</h2>
          <Form.Control
            type="text"
            style={titleStyle}
            onChange={handleChange}
            placeholder="Title"
          />
            <div>
              <label htmlFor="input" className="img-holder">
                  {profile_preview}      
              </label>
                <input id ='input' type='file' accept='image/jpg, image/png, image/jpeg, image/gif' name='image-upload' onChange={handleFileOnChange}/>
					      <div className="label">
                  <label className="image-upload" htmlFor="input">
						          Choose your Photo
					        </label>
                </div>              
                <CKEditor data={data} onChange={onEditorChange}/>
            </div>
            <div className='col-md-12'>
              <Button style={buttonStyle} onClick={writeBoard} block> Save </Button>
              <NavLink to='/hunsu'> <Button style={buttonStyle} block> Quit </Button> </NavLink>
            </div>
      </div>
    );
}

export default Create;