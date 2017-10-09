import React, { Component } from 'react';
import Contract from './Contract'
import NotFound from './NotFound'
import Entries from './Entries'
import Spinner from './Spinner'
import Title from './Title'

class Blog extends Component {
  constructor(props) {
    super(props);

    const address = props.match.params.address;
    this.contract = new Contract(address);

    this.state = {
      isAValidBlog: undefined
    }

    this.handleBlogValidity = this.handleBlogValidity.bind(this);
  }

  componentDidMount() {
    this.contract.checkIfItsAValidBlog(this.handleBlogValidity);
  }

  render() {
    if(this.state.isAValidBlog == undefined) {
      return <Spinner />;
    }

    if(this.state.isAValidBlog == false) {
      return <NotFound />;
    }

    return (
      <div>
        <Title contract={this.contract} />
        <Entries contract={this.contract} />
      </div>
    )
  }

  goToContractSelector() {
    this.props.history.push('/');
  }

  handleBlogValidity(blogValidity) {
    this.setState({
      isAValidBlog: blogValidity
    });
  }
}

export default Blog;
