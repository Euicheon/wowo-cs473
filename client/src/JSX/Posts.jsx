import React, {useEffect, useState} from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';

import {Loader} from '../components/Loader';
import Post from './Post';

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

const Posts = () => {
    
    const [posts, setPosts] = useState([]);
    const [hasmore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

    const breakpointsColumnsObj = {default: 2, 1200: 3, 992: 3, 768: 2, 576: 1}

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        const send_param = {headers, _id: 'myoons', _page: page};
        axios
            .post("http://localhost:8080/post/getPostList", send_param)
            .then(returnData => {
                if (returnData.data.length === 0) {
                    alert("All posts loaded");
                    setHasMore(false)}
                else {
                    setPosts((prev) => [...prev, ...returnData.data.posts])
                    setPage(prev => prev + 1)
                }
            }).catch(err => {console.log(err);}); 
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchPosts}
                    hasMore={hasmore}
                    loader={<Loader/>}>

                    <Masonry
                        breakpointCols={breakpointsColumnsObj} 
                        className="masonry-grid" 
                        columnClassName="masonry-grid_column">
                        {posts.map((post) => (<Post key={post._id} info={post}/>))}
                    </Masonry>

                </InfiniteScroll>
            </div>
        </div>
    );
}

export default Posts;