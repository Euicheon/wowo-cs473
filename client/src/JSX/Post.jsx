import React, {useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
import '../CSS/Post.css';

const Post = (props) => {

    const [title, setTitle] = useState('Default Title');
    const [imgPath, setImgPath] = useState('https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png');

    const defaultImages = [
        'https://upload.wikimedia.org/wikipedia/commons/7/7d/Wildlife_at_Maasai_Mara_%28Lion%29.jpg',
        'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/headshot-of-giraffe-sabi-sands-game-reserve-royalty-free-image-1573571198.jpg',
        'https://i.insider.com/5c79a8cfeb3ce837863155f5?width=750&format=jpeg&auto=webp',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIl3UD4gJg9U-NL5g0eB41JR8fib0ig7f2-A&usqp=CAU',
        'https://images.ctfassets.net/9l3tjzgyn9gr/photo-112402/19dee2e6d21904e3762aecd9b1e061c0/112402-rabbit-lucky-animals-510x600.jpg?fm=jpg&fl=progressive&q=50&w=1200',
        'https://images.pexels.com/photos/3396657/pexels-photo-3396657.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLTrOmIvGN9Q0JDoB-Jtqw2ghF_olbXY9Nng&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9VddEIDX7IhCwFjF67rGGbBoNG5USUAGGFg&usqp=CAU',
        'https://www.nationalgeographic.com/content/dam/animals/2020/05/big-five-endangered-species/01-the-big-five-unknown-1.adapt.470.1.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWEDzWm3_Zn2-6FZ8KtVc6DsHiykjcQQ5vw&usqp=CAU',
        'https://images.unsplash.com/photo-1544211412-2a32426e7fd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
        'https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        'https://i.pinimg.com/originals/b3/fe/cc/b3fecc1dae7445d73ebe81bf0db3b318.jpg',
        'https://www.thoughtco.com/thmb/fZGivPijVE1b0BV0PqywnUzccU0=/1920x1271/filters:no_upscale():max_bytes(150000):strip_icc()/lemur-949422_1920-248f897d117340b2ba827db16a94f4e2.jpg'
    ]

    const handleProps = (info) => {
        if (info.data.title !== undefined) {setTitle(info.data.title)};
    }

    const handleImgPath = (info) => {
        if (info.data.imgPath !== undefined) {setImgPath(info.data.imgPath)}
        else {
            var randImage = Math.floor(Math.random() * defaultImages.length)
            setImgPath(defaultImages[randImage])
        }
    }

    useEffect(() => {
        handleProps(props.info);
        handleImgPath(props.info); 
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
                    <div className='description'>{title}</div>
                </div>
            </div>
        </div>
    );
}

export default Post;