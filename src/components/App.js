import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';
// import Search from './Header/Search/Search';

const baseURL = 'https://practiceapi.devmountain.com/api/posts'

// prettier-ignore
class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.filterPosts = this.filterPosts.bind( this )
  }

  componentDidMount = () => {
    axios.get(baseURL)
    .then(res => {
      this.setState({ posts: res.data})
    })
  }

  updatePost(id, text) {
    axios.put(`${baseURL}?id=${id}`, { text }).then((res) => {
      this.setState({ posts: res.data })
    })
  }

  deletePost( id ) {
    axios.delete(`${baseURL}?id=${id}`)
    .then(res => {
      this.setState({ posts: res.data })
    })
  }

  createPost( text ) {
    axios.post(baseURL, { text })
    .then(res =>{
      this.setState({ posts: res.data })
    })
  }

  async filterPosts( text ){
    await axios.get(`${baseURL}/filter?text=${text}`)
    .then(res => {
      this.setState({ posts: res.data })
    })
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="App__parent">
        <Header filterPostsFn={ this.filterPosts }/>

        <section className="App__content">

          <Compose createPostFn={ this.createPost }/>
          {posts.map(post => {
           return <Post key={ post.id } 
                    text={ post.text } 
                    date={ post.date } 
                    id={ post.id } 
                    updatePostFn={ this.updatePost } 
                    deletePostFn={ this.deletePost }
                  />
                }
          )}
        </section>
      </div>
    );
  }
}

export default App;
