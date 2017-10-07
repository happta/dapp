import React, { Component } from 'react';
import Contract from './Contract'
import NotFound from './NotFound'
import Entries from './Entries'

class Blog extends Component {
  constructor(props) {
    super(props);

    this.address = props.match.params.address;
  }

  render() {
    const contract = new Contract(this.address);

    const isNotAValidBlog = !contract.isABlog();

    if(isNotAValidBlog) {
      return <NotFound />;
    }

    const posts = contract.posts();
    const title = contract.title();

    return (
      <div>
        <a onClick={this.goToContractSelector.bind(this)}>Back</a>
        <h1 id="titleContent">{title}</h1>
        <Entries posts={posts} />
      </div>
    )
  }

  goToContractSelector() {
    this.props.history.push('/');
  }
}

export default Blog;
