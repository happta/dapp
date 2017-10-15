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

    this.state = {
      isAValidBlog: undefined,
      isTheOwner: undefined
    }

    this.handleBlogValidity = this.handleBlogValidity.bind(this);
    this.checkIfIsTheOwner = this.checkIfIsTheOwner.bind(this)
  }

  componentDidMount() {
    const contract = new Contract(this.props.lightWalletClient, this.props.match.params.address);

    contract.checkIfItsAValidBlog(this.handleBlogValidity);
    contract.loadOwner(this.checkIfIsTheOwner);
  }

  componentWillReceiveProps(newProps) {
    const contract = new Contract(newProps.lightWalletClient, newProps.match.params.address);

    contract.checkIfItsAValidBlog(this.handleBlogValidity);
    contract.loadOwner(this.checkIfIsTheOwner);
  }

  render() {
    if(this.state.isAValidBlog == undefined) {
      return <Spinner />;
    }

    if(this.state.isAValidBlog == false) {
      return <NotFound />;
    }

    const publishPostLink = (
      this.state.isTheOwner &&
      <div>
        <div className="separator"></div>
        <button className="Button Button--primary Button--block" onClick={this.goToPublishPage.bind(this)}>Publish</button>
      </div>

    )

    return (
      <div className="container">
        <div className="blogContainer">
          <Title contract={this.contract()} />
          <Entries contract={this.contract()} />
          {publishPostLink}
        </div>
      </div>
    )
  }

  goToPublishPage() {
    const route = `/${this.props.match.params.network}/${this.props.match.params.address}/publish`

    this.props.history.push(route)
  }

  handleBlogValidity(blogValidity) {
    this.setState({
      isAValidBlog: blogValidity
    });
  }

  contract() {
    return new Contract(this.props.lightWalletClient, this.props.match.params.address)
  }

  checkIfIsTheOwner(ownerAddress) {
    const currentAddress = this.props.lightWalletClient.eth.accounts[0];

    this.setState({
      isTheOwner: ownerAddress == currentAddress
    });
  }
}

export default Blog;
