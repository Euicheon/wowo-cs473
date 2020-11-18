import React from 'react';
import {NavLink} from "react-router-dom";

const PostDetail = (props) => {
    
    console.log('writer : ',props.location.state.writer); //{writer: "myoons", title: "7↵", content: "4", imgPath: "https://imageresizer.static9.net.au/vLxMjM1jUUHfeX…es%2F2016%2F11%2F16%2F11%2F03%2Fstepup-111616.jpg", createdAt: "2020-11-16T16:50:48.980Z"} 
    console.log('title : ',props.location.state.title);
    console.log('content : ',props.location.state.content);
    console.log('imgPath : ',props.location.state.imgPath);
    console.log('createdAt : ',props.location.state.createdAt);

    return ( 
        <div> 
            <h1>Post Detail</h1>
        </div>
    );
};

export default PostDetail;