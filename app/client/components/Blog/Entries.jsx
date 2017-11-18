import React, { Component } from 'react';
import Entry from './Entry'
import ContentView from './ContentView'
import Spinner from './Spinner'

class Entries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      updates: [],
      postsLoading: true,
      postsCount: -1,
      updatesLoading: true,
      updatesCount: -1
    }

    this.handlePostCount = this.handlePostCount.bind(this)
    this.handlePostLoad = this.handlePostLoad.bind(this)
    this.handleUpdatesCount = this.handleUpdatesCount.bind(this)
    this.handleUpdatesLoad = this.handleUpdatesLoad.bind(this)
  }

  componentDidMount() {
    this.fetchPosts()
    this.fetchUpdates()
  }

  render() {
    if(this.state.postsLoading || this.state.updatesLoading) {
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
      return this.singleEntry(this.props.target, this.props.version);
    } else {
      return this.allEntries();
    }
  }

  singleEntry(target, version) {
    const featuredPost = this.entriesWithUpdates().find(function(post) {
      return post.id == this.props.target
    }.bind(this));

    if (!featuredPost) {
      return <div>Not found</div>
    }

    return (<ContentView isTheOwner={this.props.isTheOwner} entry={featuredPost} version={version} rootPath={this.props.rootPath} />)
  }

  allEntries() {
    const entriesViews = this.entriesWithUpdates().map(function(post) {
      return <Entry rootPath={this.props.rootPath} entry={post} key={`${post.id}${post.identifier}${post.date}`} />
    }.bind(this));

    return entriesViews;
  }

  entriesWithUpdates() {
    return this.state.posts.map(function(post){
      post['updates'] = this.state.updates.filter(function(update){
        return update.parent == post.id
      }).sort(this.newPostsFirst);

      return post
    }.bind(this)).sort(this.newPostsFirst);
  }

  newPostsFirst(aPost, anotherPost) {
    return aPost.date < anotherPost.date;
  }

  fetchPosts() {
    this.props.contract.countPosts(this.handlePostCount)
    this.props.contract.loadPosts(this.handlePostLoad)
  }

  fetchUpdates() {
    this.props.contract.countUpdates(this.handleUpdatesCount)
    this.props.contract.loadUpdates(this.handleUpdatesLoad)
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

  handleUpdatesLoad(update) {
    const updates = this.state.updates
    updates.push(update);

    this.setState({ updates: updates }, this.checkIfAllUpdatesAreLoaded);
  }

  checkIfAllUpdatesAreLoaded() {
    if(this.state.updates.length == this.state.updatesCount) {
      this.setState({
        updatesLoading: false
      });
    }
  }

  handleUpdatesCount(count) {
    this.setState({
      updatesCount: count
    }, this.checkIfAllUpdatesAreLoaded)
  }
}

export default Entries;
