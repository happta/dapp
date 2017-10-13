import React, { Component } from 'react';
import Contract from './Contract'
import NotFound from './NotFound'
import Entries from './Entries'
import Spinner from './Spinner'
import Title from './Title'

import { NavLink } from 'react-router-dom'

class Blog extends Component {
  constructor(props) {
    super(props);

    this.network = this.props.match.params.network;
    this.address = this.props.match.params.address;

    this.lightWalletClient = this.props.lightWalletClient;

    this.contract = new Contract(this.lightWalletClient, this.address);

    this.state = {
      isAValidBlog: undefined,
      isTheOwner: false
    }

    this.handleBlogValidity = this.handleBlogValidity.bind(this);
  }

  componentDidMount() {
    this.contract.checkIfItsAValidBlog(this.handleBlogValidity);
    this.contract.loadOwner(this.setOwner.bind(this));
  }

  setOwner(ownerAddress) {
    const currentAddress = this.lightWalletClient.eth.accounts[0];
    if(ownerAddress == currentAddress) {
      this.setState({
        isTheOwner: true
      });
    }
  }

  render() {
    if(this.state.isAValidBlog == undefined) {
      return <Spinner />;
    }

    if(this.state.isAValidBlog == false) {
      return <NotFound />;
    }

    return (
      <div className="container">
        <div className="blogContainer">
          <Title contract={this.contract} />
          <Entries contract={this.contract} />
          {this.state.isTheOwner && <NavLink to={`/${this.network}/${this.address}/publish`}>Publish Post</NavLink>}
        </div>
      </div>
    )
  }

  handleBlogValidity(blogValidity) {
    this.setState({
      isAValidBlog: blogValidity
    });
  }
}

export default Blog;
