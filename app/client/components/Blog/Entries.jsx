import React, { Component } from 'react';
import Entry from './Entry'
import Spinner from './Spinner'

class Entries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      postsLoading: true,
      postsCount: -1
    }

    this.handlePostCount = this.handlePostCount.bind(this)
    this.handlePostLoad = this.handlePostLoad.bind(this)
  }

  componentDidMount() {
    this.fetchPosts()
  }

  render() {
    if(this.state.postsLoading) {
      return <Spinner />;
    }

    if(this.state.posts.length == 0) {
      return (
        <div className="alert alert-info" role="alert">
          There are no posts yet
        </div>
      )
    }

    const entries = this.state.posts.sort(this.newPostsFirst).map(function(post) {
      return <Entry isInitiallyOpen={false} entry={post} key={`${post.identifier}${post.date}`} />
    }.bind(this));

    if(this.props.target) {
      const featuredPost = this.state.posts.find(function(post) {
        return post.identifier == this.props.target
      }.bind(this));

      if (featuredPost) {
        entries.unshift(<Entry isInitiallyOpen={true} entry={featuredPost} key={`${featuredPost.identifier}${featuredPost.date}-featured`} featured />)
      }
    }

    return entries;
  }

  newPostsFirst(aPost, anotherPost) {
    return aPost.date < anotherPost.date;
  }

  fetchPosts() {
    this.props.contract.countPosts(this.handlePostCount)
    this.props.contract.loadPosts(this.handlePostLoad)
  }

  handlePostLoad(post) {
    const posts = this.state.posts
    posts.push(post);

    this.setState({ posts: posts }, this.checkIfAllPostsAreLoaded);
  }

  checkIfAllPostsAreLoaded() {
    if(this.state.posts.length == this.state.postsCount) {
      this.setState({
        postsLoading: false
      });
    }
  }

  handlePostCount(count) {
    this.setState({
      postsCount: count
    }, this.checkIfAllPostsAreLoaded)
  }
}

export default Entries;
