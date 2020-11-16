import React, {Component} from "react";
import CKEditor from "ckeditor4-react";
import {Button, Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";

import axios from "axios";

import '../CSS/create.css';

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Create extends Component {

    state = {
        data: ''
    };

    writeBoard = () => {
        let url;
        let send_param;
    
        const boardTitle = this.boardTitle.value;
        const boardContent = this.state.data;
    
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
            "id" : 'myoons',
            "title": boardTitle,
            "content": boardContent
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

    onEditorChange = evt => {
        this.setState({
            data: evt.editor.getData()
        });
    };

    render() {
        
        const divStyle = {margin: 50};
        const titleStyle = {marginBottom: 5};
        const buttonStyle = {marginTop: 5};

        return (
            <div style={divStyle} className="create">
                <h2>Create</h2>
                <Form.Control
                    type="text"
                    style={titleStyle}
                    placeholder="Title"
                    ref={ref => (this.boardTitle = ref)}
                />
                <CKEditor data={this.state.data} onChange={this.onEditorChange}/>
                <Button style={buttonStyle} onClick={this.writeBoard} block> Save </Button>
                <NavLink to='/hunsu'> <Button style={buttonStyle} block> Quit </Button> </NavLink>
            </div>
        );
    }
}

export default Create;