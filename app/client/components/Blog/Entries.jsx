import React, { Component } from 'react';
import ipfs from 'ipfs-js'
import Entry from './Entry'

class Entries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    const posts = this.props.posts;

    const ipfsURL = { host: 'ipfs', port: '5001', protocol: 'http' };

    ipfs.setProvider(ipfsURL);

    posts.forEach(function(post) {
      const identifier = post.identifier

      ipfs.cat(identifier, this.loadContent(post).bind(this));
    }.bind(this));
  }

  loadContent(post) {
    return function(err, buffer) {
      const rawContent = buffer.toString();
      const content = JSON.parse(rawContent);

      post.title = content.title
      post.content = content.content

        const allPosts = this.state.posts;

      allPosts.push(post);

      this.setState({
        posts: allPosts
      });
    };
  }

  render() {
    const entries = this.state.posts.map(function(post) {
      return <Entry entry={post} key={post.identifier} />
    }.bind(this));

    return (
      <ul>
        {entries}
      </ul>
    );
  }
}

export default Entries;
