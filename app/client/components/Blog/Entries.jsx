import React, { Component } from 'react';
import Entry from './Entry'
import ContentView from './ContentView'
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

    if(this.props.target) {
      return this.singleEntry(this.props.target);
    } else {
      return this.allEntries();
    }
  }

  singleEntry(target) {
    const featuredPost = this.state.posts.find(function(post) {
      return post.id == this.props.target
    }.bind(this));

    if (!featuredPost) {
      return <div>Not found</div>
    }

    return (<ContentView entry={featuredPost} rootPath={this.props.rootPath} />)
  }

  allEntries() {
    const entriesViews = this.state.posts.sort(this.newPostsFirst).map(function(post) {
      return <Entry rootPath={this.props.rootPath} entry={post} key={`${post.id}${post.identifier}${post.date}`} />
    }.bind(this));

    return entriesViews;
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
