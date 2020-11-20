import React, {useEffect, useState} from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
import '../CSS/posts.css'

import {Input} from 'mdbreact';
import {Loader} from '../components/Loader';
import Post from './Post';

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

const Posts = () => {
    
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [hasmore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const breakpointsColumnsObj = {default: 2}

    useEffect(() => {
        fetchAllPosts();
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        const send_param = {headers, _id: 'myoons', _page: page};
        axios
            .post("http://localhost:8080/post/getPostList", send_param)
            .then(returnData => {
                if (returnData.data.length === 0) {
                    console.log('fetchPostsFinished',returnData.data);
                    alert("All posts loaded");
                    setHasMore(false)}
                else {
                    console.log('fetchPosts',returnData.data);
                    setPosts((prev) => [...prev, ...returnData.data.posts]);
                    setPage(prev => prev + 1);      
                }
            }).catch(err => {console.log(err);}); 
    };

    const fetchAllPosts = () => {
        const send_param = {headers, _id: 'myoons'};
        axios
            .post("http://localhost:8080/post/getAll", send_param)
            .then(returnData => {
                setAllPosts(returnData.data.posts)
            }).catch(err => {console.log(err);}); 
    };

    const onChange = evt => {

        let filteredPosts = allPosts.filter(post => {
            return post.title.toLowerCase().includes(evt.target.value.toLowerCase());
        })
        setPosts(filteredPosts);
    }

    return (
        <div className="row">
            <div>
            <Input label="Serach Posts" onChange={onChange}/>
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
        </div>
    );
}

export default Posts;