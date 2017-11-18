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
      return (
        <section className="container page-body-wrapper">
          <div className="content-wrapper full-page-wrapper" id="#titleContent">
            <Spinner />;
          </div>
        </section>
      )
    }

    if(this.state.isAValidBlog == false) {
      return <NotFound />;
    }

    const publishPostButton = (
      this.state.isTheOwner &&
      <div className="OwnerArea">
        <button className="btn btn-primary" onClick={this.goToPublishPage.bind(this)}>Publish</button>
      </div>
    )

    return (
      <section className="container page-body-wrapper">
        <div className="content-wrapper full-page-wrapper" id="#titleContent">
          <div className="row">
            <div className="col-0 col-md-2"></div>
            <div className="col-12 col-md-8">
              <Title contract={this.contract()} />
              {publishPostButton}
              <Entries
                target={this.props.match.params.reference}
                version={this.props.match.params.version}
                contract={this.contract()}
                isTheOwner={this.state.isTheOwner}
                rootPath={`/${this.props.match.params.network}/${this.props.match.params.address}`} />
            </div>
            <div className="col-0 col-md-2"></div>
          </div>
        </div>
      </section>
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
    this.props.lightWalletClient.eth.getAccounts(function(error, accounts) {
      this.setState({
        isTheOwner: ownerAddress == accounts[0]
      });
    }.bind(this));
  }
}

export default Blog;
