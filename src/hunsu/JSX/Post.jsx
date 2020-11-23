import React, {useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
import '../CSS/Post.css';

const Post = (props) => {

    const [title, setTitle] = useState('Default Title');
    const [imgPath, setImgPath] = useState('https://firebasestorage.googleapis.com/v0/b/wowo-cs473.appspot.com/o/wowo_logo.png?alt=media&token=fc8dfa4e-777f-4746-9aa0-cca5268e7008');

    const handleProps = (data) => {
        if (data.title !== undefined) {setTitle(data.title)};
    }

    const handleImgPath = (data) => {
        if (data.imgPath !== undefined) {setImgPath(data.imgPath)}
    }

    useEffect(() => {
        handleProps(props.info.data);
        handleImgPath(props.info.data); 
    }, [])
    
    return (
        <div className="row">
            <div className="col-md-12 px-0">
                <div className="rounded-lg overflow-hidden">
                {/*<div className='description'>♥{props.info.data.whoLikes.length}</div>*/}
                    <NavLink to={{
                        pathname: '/post/detail',
                        state: props.info}}>
                        <img src={imgPath} alt={props.info.id} className="img-fluid"/>
                    </NavLink>
                    <div className='postDescription'>{title}</div>
                </div>
            </div>
        </div>
    );
}

export default Post;