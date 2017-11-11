import React, { Component } from 'react';
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css';

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

  componentDidMount() {
    this.editor = new SimpleMDE({
      element: document.getElementById("newPostContent"),
      spellChecker: false
    });
  }

  render() {
    if(this.state.publishingPost) {
      return (
        <section className="container page-body-wrapper">
          <div className="content-wrapper full-page-wrapper">
          <Spinner />
          </div>
        </section>
      )
    }

    return (
      <section className="container page-body-wrapper">
        <div className="content-wrapper full-page-wrapper">
          <form className="forms-sample">
            <div className="form-group">
              <label htmlFor="newPostTitle">Title:</label>
              <input type="text" className="form-control p-input" id="newPostTitle"/>
            </div>
            <div className="form-group">
              <label htmlFor="newPostContent">Content (in markdown):</label>
              <textarea id="newPostContent"></textarea>
            </div>
            <button className="btn btn-primary cursor" onClick={this.publishEntry}>Publish</button>
          </form>
        </div>
      </section>
    )
  }

  publishEntry(event) {
    event.preventDefault();

    this.setState({
      publishingPost: true
    })

    const title = document.getElementById("newPostTitle").value;
    const content = this.editor.value();

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
