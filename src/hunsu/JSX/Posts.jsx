import React, {useEffect, useState} from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
import '../CSS/posts.css'

import {Input} from 'mdbreact';
import {Loader} from '../components/Loader';
import Post from './Post'

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

const HunsuPage = () => {
    
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [hasmore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    const breakpointsColumnsObj = {default: 2}

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = () => {
        
        const send_param = {headers, _id: 'myoons'};
        axios
            .post("http://localhost:8080/post/getAll", send_param)
            .then(returnData => {
                setAllPosts(returnData.data.posts);
                
                var currentPage = 10 * page;
                var loadLists;
                console.log('ALL : ', returnData.data.posts)
                if (returnData.data.posts.length >= currentPage+10) {
                    loadLists = returnData.data.posts.slice(currentPage, currentPage+10);
                    console.log('loadPosts_IF : ',loadLists);
                    setPosts((prev) => [...prev, ...loadLists]); 
                    setPage(prev => prev + 1); 
                } else {
                    loadLists = returnData.data.posts.slice(currentPage)
                    console.log('loadPosts_ELSE : ',loadLists);
                    setPosts((prev) => [...prev, ...loadLists]); 
                    setHasMore(false);
                }

            }).catch(err => {console.log(err);}); 
    }

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
                        next={loadPosts}
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

export default HunsuPage;