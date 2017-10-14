import React, { Component } from 'react';

import Contract from './Blog/Contract';
import Spinner from './Blog/Spinner';

class Publish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      publishingPost: false
    }

    this.network = this.props.match.params.network;
    this.address = this.props.match.params.address;

    this.lightWalletClient = this.props.lightWalletClient;

    this.publishEntry = this.publishEntry.bind(this)
    this.contract = new Contract(this.lightWalletClient, this.address);
  }

  render() {
    if(this.state.publishingPost) {
      return <Spinner />
    }

    return (
      <div className="container formsContainer">
        <div className="FormGroup">
          <label>Title:</label>
          <input type="text" className="Input" id="newPostTitle"/>
          <label>Content (in markdown):</label>
          <textarea className="Textarea" id="newPostContent"></textarea>
        </div>
        <div className="FormGroup">
          <button className="Button Button--primary marginRight-sm">Preview</button>
          <button className="Button Button--primary" onClick={this.publishEntry}>Publish</button>
        </div>
      </div>
    )
  }

  publishEntry(event) {
    event.preventDefault();

    this.setState({
      publishingPost: true
    })

    const title = document.getElementById("newPostTitle").value;
    const content = document.getElementById("newPostContent").value;

    const post = { title: title, content: content }

    this.contract.publishPost(post, this.redirectToBlog.bind(this));
  }

  redirectToBlog() {
    this.setState({
      publishingPost: false
    })

    this.props.history.push(`/${this.network}/${this.address}`);
  }
}

export default Publish;
