import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Post extends Component {

    state = {
        writier: 'Default Writer',
        title: 'Default Title',
        content: 'Default Content',
        imgPath: 'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png',
        createdAt: 'Default Date'
    }

    defaultImages = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9PawT5R-v46qd-UWP26cLsMpKRt8jyb2Ljw&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxwulJ5gamHicy4FeuF_saPT6VuMeOdKaw3g&usqp=CAU',
        'https://imageresizer.static9.net.au/GEYhFMytSzg08d9HzfT_6t9iUiE=/400x0/https%3A%2F%2Fprod.static9.net.au%2F_%2Fmedia%2FNetwork%2FImages%2F2016%2F11%2F16%2F11%2F03%2Fsquat-111616.jpg',
        'https://imageresizer.static9.net.au/vLxMjM1jUUHfeXoXR_HjLd-53_w=/400x0/https%3A%2F%2Fprod.static9.net.au%2F_%2Fmedia%2FNetwork%2FImages%2F2016%2F11%2F16%2F11%2F03%2Fstepup-111616.jpg',
        'https://clipartstation.com/wp-content/uploads/2018/10/squat-clipart-7.jpg'
    ]

    handleProps = (info) => {
        if (info.writer !== undefined) {this.setState({writer: info.writer})}
        if (info.title !== undefined) {this.setState({title: info.title})}
        if (info.content !== undefined) {this.setState({content: info.content})}
        if (info.createdAt !== undefined) {this.setState({createdAt: info.createdAt})}
    }

    handleImgPath = (info) => {
        if (info.imgPath !== undefined) {this.setState({imPath: info.imgPath})}
        else {
            var randImage = Math.floor(Math.random() * this.defaultImages.length)
            this.setState({imgPath: this.defaultImages[randImage]})
        }
    }

    componentDidMount() {
        this.handleProps(this.props.info);
        this.handleImgPath(this.props.info);
    }

    render() {
      const {imgPath} = this.state;

      return (
          <div className="row">
              <div className="col-md-12 px-0">
                  <div className="rounded-lg overflow-hidden">
                      <NavLink to='/post/detail'>
                          <img src={imgPath} alt='' className="img-fluid"/>
                      </NavLink>
                  </div>
              </div>
          </div>
      );
    }
}

export default Post;