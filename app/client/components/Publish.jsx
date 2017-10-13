import React, { Component } from 'react';

import Contract from './Blog/Contract';

class Publish extends Component {
  constructor(props) {
    super(props);

    this.network = this.props.match.params.network;
    this.address = this.props.match.params.address;

    this.lightWalletClient = this.props.lightWalletClient;

    this.contract = new Contract(this.lightWalletClient, this.address);
  }

  render() {
    const publishForm = (
      <div>
        <div className="separator"></div>
        <label>Title:</label>
        <input type="text" className="Input" id="newPostTitle"/>
        <br/>
        <label>Content (in markdown):</label>
        <textarea className="Textarea" id="newPostContent"></textarea>
        <br />
        <button className="Button Button--primary marginRight-sm">Preview</button>
        <button className="Button Button--primary" onClick={this.publishEntry.bind(this)}>Publish</button>
      </div>
    )

    return (<div>{publishForm}</div>)
  }

  publishEntry(event) {
    event.preventDefault();

    const title = document.getElementById("newPostTitle").value;
    const content = document.getElementById("newPostContent").value;

    this.contract.publishPost({title: title, content: content}, function(txHash){
      this.contract.waitForTransaction(txHash).then(function(a) {
        this.props.history.push(`/${this.network}/${this.address}`);
      }.bind(this));
    }.bind(this))
  }
}

export default Publish;
