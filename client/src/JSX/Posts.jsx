import React, {useEffect, useState} from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
import '../CSS/posts.css'

import {Input} from 'mdbreact';
import {Loader} from '../components/Loader';
import Post from './Post';
import {firestore} from '../firebase';

const Posts = () => {
    
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [hasmore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    const breakpointsColumnsObj = {default: 2}

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = () => {
        
        var users = firestore.collection('posts');
        users.get().then(query => {
            
            var fetchPosts = []
            query.forEach(doc => {
                fetchPosts.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            
            fetchPosts.sort(function(a, b) { // 오름차순
                return a.data.timestamp > b.data.timestamp ? -1 : a.data.timestamp < b.data.timestamp ? 1 : 0;
            });

            console.log('ALL : ', fetchPosts)
            setAllPosts(fetchPosts);

            var currentPage = 10 * page;
            var loadLists;
                
            if (fetchPosts.length >= currentPage+10) {
                loadLists = fetchPosts.slice(currentPage, currentPage+10);
                setPosts((prev) => [...prev, ...loadLists]); 
                setPage(prev => prev + 1); 
                console.log('loadPosts_IF : ',loadLists);
            } else {
                loadLists = fetchPosts.slice(currentPage)
                setPosts((prev) => [...prev, ...loadLists]); 
                setHasMore(false);
                console.log('loadPosts_ELSE : ',loadLists);
            }
        })
    }

    const onSearchChange = evt => {
        let filteredPosts = allPosts.filter(post => {return post.data.title.toLowerCase().includes(evt.target.value.toLowerCase())})
        setPosts(filteredPosts);
    }


    return (
        <div className="row">
            <div>
            <Input label="Serach Posts" onChange={onSearchChange}/>
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
                            {posts.map((post) => (<Post key={post.id} info={post}/>))}
                        </Masonry>

                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
}

export default Posts;