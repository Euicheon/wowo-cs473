import React from 'react';
import {NavLink} from "react-router-dom";

const PostDetail = (props) => {
    
    console.log(props.location.state); //{writer: "myoons", title: "7↵", content: "4", imgPath: "https://imageresizer.static9.net.au/vLxMjM1jUUHfeX…es%2F2016%2F11%2F16%2F11%2F03%2Fstepup-111616.jpg", createdAt: "2020-11-16T16:50:48.980Z"} 

    return ( 
        <div> 
            <h1>Post Detail</h1>
        </div>
    );
};

export default PostDetail;