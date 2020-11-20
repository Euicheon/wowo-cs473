import React from 'react';
import {NavLink} from "react-router-dom";
import '../CSS/PostDetail.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const PostDetail = (props) => {
    
    const writer = props.location.state.writer; //{writer: "myoons", title: "7↵", content: "4", imgPath: "https://imageresizer.static9.net.au/vLxMjM1jUUHfeX…es%2F2016%2F11%2F16%2F11%2F03%2Fstepup-111616.jpg", createdAt: "2020-11-16T16:50:48.980Z"} 
    const title = props.location.state.title;
    const content = props.location.state.content;
    const imgPath = props.location.state.imgPath;
    const createdAt = props.location.state.createdAt;

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return ( 
        <Card className='root'>
            <CardHeader
                avatar={<Avatar className='avatar'> {writer[0].toUpperCase()} </Avatar>}
                action={<IconButton aria-label="settings"> <MoreVertIcon /> </IconButton>}
                title={<span className='title'>{title}</span>}
                subheader={<span className='createdAt'>{createdAt.slice(0,10)}</span>}
            />
            <img src={imgPath} alt='' className="img-fluid"/>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites"> 
                    <FavoriteIcon/> 
                </IconButton>
                <IconButton aria-label="share"> 
                    <ShareIcon /> 
                </IconButton>
                <IconButton className={clsx('expand', {'expandOpen': expanded})} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {content}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default PostDetail;