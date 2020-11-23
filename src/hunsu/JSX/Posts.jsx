import React, {useEffect, useState} from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
import '../CSS/posts.css'

import {Loader} from '../components/Loader';
import Post from './Post';
import firebase from '../../firebase';

import {Button} from 'react-bootstrap';
import {NavLink} from "react-router-dom";

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
        
        var users = firebase.firestore().collection('posts');
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
        setHasMore(false);
    }


    return (
        <div className="row" id="scrollableDiv" style={{height: '600px', width: '370px', overflow: 'auto'}}>
            <h2 className='titleHunsu'>Hunsu</h2>
            <NavLink to='/post/create'> <Button className="createButton">Create</Button> </NavLink>
            
            <div className="row">
                <input placeholder="Search" className="searchBar" onChange={onSearchChange}/>

                <div className="col-md-12">
                    <InfiniteScroll
                        scrollableTarget="scrollableDiv"
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