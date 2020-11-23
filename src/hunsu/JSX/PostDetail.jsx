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
import firebase from '../../firebase';

const PostDetail = (props) => {

    const [postId, setPostId] = useState(''); 
    const [writer, setWriter] = useState('');  
    const [title, setTitle] = useState(''); 
    const [content, setContent] = useState(''); 
    const [imgPath, setImgPath] = useState(''); 
    const [timestamp, setTimestamp] = useState((new Date()).toString()); 

    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const [likeArray, setLikeArray] = useState([]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const posts = firebase.firestore().collection("posts");

    const parsePost = () => {

        posts.doc(props.location.state.id).get().then(post => {
            
            setPostId(post.id);
            setWriter(post.data().writer[0].toUpperCase());
            setTitle(post.data().title);
            setContent(post.data().content);
            setImgPath(post.data().imgPath);
            setTimestamp(post.data().timestamp.toDate().toString().slice(0,21));
            setLikeArray(post.data().whoLikes);
            
            const commentArray = post.data().comments;

            for (var i = 0; i < commentArray.length; i++) {
                const tempComment = commentArray[i];
                const newComment = {
                    authorUrl: tempComment.authorUrl,
                    avatarUrl: tempComment.avatarUrl,
                    createdAt: tempComment.createdAt.toDate(),
                    fullName: tempComment.fullName,
                    text: tempComment.text
                }
                setComments(prev => [ ...prev, newComment]);
            }
        })
    }

    const handleLike = () => {

        posts.doc(props.location.state.id).update({
            whoLikes: [...likeArray, 'userID']
          });

        setLikeArray(prev => [...prev, 'userID']);
    }

    const cancelLike = () => {

        var removedArray = likeArray.filter(item => {return item !== 'userID'})
        console.log('Removed ARRAY: ',removedArray)
        
        setLikeArray(removedArray);
        posts.doc(props.location.state.id).update({
            whoLikes: removedArray
        });
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
        posts.doc(props.location.state.id).update({
            comments: [...comments, newComment]
        });
    }

    useEffect(() => {
        parsePost()
    }, []);

    const commentStyle = {// Use base styles of btn and override background to red
        btn: base => ({
            ...base,
            background: '#123456',
        }),
        comment: base => ({ ...base }),
        textarea: base => ({ ...base }),
    }

    return ( 
        <div>
            <Card className='root'>
                <CardHeader
                    avatar={<Avatar className='avatar'> {writer} </Avatar>}
                    title={<span className='title'>{title}</span>}
                    subheader={<span className='createdAt'>{timestamp}</span>}
                />
                <img src={imgPath} alt={postId} className="img-fluid"/>
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
                styles={commentStyle}
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