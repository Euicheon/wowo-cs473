import React, {useState, useEffect} from 'react';
import '../CSS/PostDetail.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx';

import ReactQuill from 'react-quill';
import CommentsBlock from 'simple-react-comments';
import {firestore} from '../firebase';

const PostDetail = (props) => {

    console.log('ID : ', props.location.state.id);
    console.log('DATA : ', props.location.state.data);

    const id = props.location.state.id;
    const writer = props.location.state.data.writer;
    const title = props.location.state.data.title;
    const content = props.location.state.data.content;
    const imgPath = props.location.state.data.imgPath;
    const timestamp =  props.location.state.data.timestamp;

    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const [likeArray, setLikeArray] = useState(props.location.state.data.whoLikes);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const posts = firestore.collection("posts");

    const handleLike = () => {

        posts.doc(id).update({
            whoLikes: [...likeArray, 'userID']
          });

        setLikeArray(prev => [...prev, 'userID']);
    }

    const cancelLike = () => {

        var removedArray = likeArray.filter(item => {return item !== 'userID'})
        console.log('Removed ARRAY: ',removedArray)
        
        setLikeArray(removedArray);
        posts.doc(id).update({
            whoLikes: removedArray
        });
    }

    const parseComments = (commentList) => {

        for (var i = 0; i < commentList.length; i++) {
            const tempComment = commentList[i];
            const newComment = {
                authorUrl: tempComment.authorUrl,
                avatarUrl: tempComment.avatarUrl,
                createdAt: tempComment.createdAt.toDate(),
                fullName: tempComment.fullName,
                text: tempComment.text
            }
            setComments(prev => [ ...prev, newComment]);
        }
    }

    const handleComment = (commentText) => {

        var newComment = {
            authorUrl: 'https://www.w3schools.com/w3css/img_lights.jpg',
            avatarUrl: 'https://www.w3schools.com/w3css/img_lights.jpg',
            createdAt: new Date(),
            fullName: 'userID',
            text: commentText
        }

        setComments([ ...comments, newComment]);
        posts.doc(id).update({
            comments: [...comments, newComment]
        });
    }

    useEffect(() => {
        parseComments(props.location.state.data.comments);
    }, []);

    return ( 
        <div>
            <Card className='root'>
            <CardHeader
                avatar={<Avatar className='avatar'> {writer[0].toUpperCase()} </Avatar>}
                title={<span className='title'>{title}</span>}
                subheader={<span className='createdAt'>{timestamp.toDate().toDateString()}</span>}
            />
            <img src={imgPath} alt='' className="img-fluid"/>
            <CardActions disableSpacing>
                {likeArray.includes('userID') 
                ?   <IconButton aria-label="remove from favorites" onClick={cancelLike}> 
                        <FavoriteIcon/>
                    </IconButton>
                
                :   <IconButton aria-label="add to favorites" onClick={handleLike}> 
                        <FavoriteBorderIcon/>
                    </IconButton>}
                {likeArray.length}
                <IconButton className={clsx('expand', {'expandOpen': expanded})} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    <ReactQuill theme="bubble" className='editor' value={content} readOnly={true}/>
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>

            <div className='commentBlock'>
                <CommentsBlock
                comments={comments}
                signinUrl={'/login'}
                isLoggedIn={true}
                onSubmit={commentText => {
                    if (commentText.length > 0) { handleComment(commentText)
                    console.log('submit:', commentText);
                    } else {
                        alert('No comments written');
                    }
                }}/>
            </div>
        </div>
    );
};

export default PostDetail;