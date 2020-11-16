import React, {useState, useEffect} from 'react';

import InfiniteScroll from 'react-infinite-scroller';
import Masonry from 'react-masonry-css';

import API from './API';
import Image from './Image';

const Images = () => {
    
    let pageNum = 1;

    const [imagesArray, setImagesArray] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const breakpointsColumnsObj = {
        default: 6,
        1200: 3,
        992: 3,
        768: 2,
        576: 1
    }

    const fetchImages = (pageNumber) => {
        API.get("/", {params:{page:pageNumber}}).then(res => {
            setImagesArray([...imagesArray, ...res.data.hits]);
            setTotalPages(res.data.totalHits / res.data.hits.length);
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        fetchImages(pageNum);
    },[]);
      
    return (
        <div className="row">
          <div className="col-md-12">
            <InfiniteScroll 
            pageStart={0} 
            loadMore={() => fetchImages(++pageNum)} 
            hasMore={pageNum < totalPages ? true : false}>
              <Masonry 
              breakpointCols={breakpointsColumnsObj} 
              className="masonry-grid" 
              columnClassName="masonry-grid_column">
                
                {imagesArray.map((image) => (
                  <Image key={image.id} {...image}/>
                ))}
              </Masonry>
            </InfiniteScroll>
          </div>
        </div>
    );
};

export default Images;