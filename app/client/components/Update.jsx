import React, { Component } from 'react';
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css';

import Contract from './Blog/Contract';
import Spinner from './Blog/Spinner';

import TransactionsHistory from './TransactionsHistory'

import showdown from 'showdown';

class Update extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updatingPost: false
    }

    this.network = this.props.match.params.network;
    this.address = this.props.match.params.address;

    this.lightWalletClient = this.props.lightWalletClient;

    this.updateEntry = this.updateEntry.bind(this)
    this.contract = new Contract(this.lightWalletClient, this.address);
  }

  componentDidMount() {
    this.editor = new SimpleMDE({
      element: document.getElementById("updatePostContent"),
      spellChecker: false,
      previewRender: function(plainText) {
        const converter = new showdown.Converter();
        return converter.makeHtml(plainText)
      }
    });
  }

  render() {
    if(this.state.updatingPost) {
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
              <label htmlFor="updatePostTitle">Title:</label>
              <input type="text" className="form-control p-input" id="updatePostTitle"/>
            </div>
            <div className="form-group">
              <label htmlFor="updatePostContent">Content (in markdown):</label>
              <textarea id="updatePostContent"></textarea>
            </div>
            <button className="btn btn-primary cursor" onClick={this.updateEntry}>Publish</button>
          </form>
        </div>
      </section>
    )
  }

  updateEntry(event) {
    event.preventDefault();

    this.setState({
      updatingPost: true
    })

    const title = document.getElementById("updatePostTitle").value;
    const content = this.editor.value();

    const post = { id: this.props.match.params.reference, title: title, content: content }

    this.contract.updatePost(post, this.registerEvent.bind(this), this.redirectToUpdatedContent.bind(this));
  }

  registerEvent(tx, address, title) {
    if(!tx) {
      return;
    }

    const transactionsHistory = new TransactionsHistory(this.props.match.params.network);

    const eventTitle = "Update content";
    const additionalInfo = {
      'Title': title,
      'Contract address': address
    }

    transactionsHistory.registerNewTransaction(tx, eventTitle, additionalInfo);
  }

  redirectToUpdatedContent(reference) {
    const contract = new Contract(this.props.lightWalletClient, this.address)

    setTimeout(function() {
      this.setState({
        publishingPost: false
      })

      contract.countPosts(function(numberOfPosts){
        this.props.history.push(`/${this.network}/${this.address}/${reference}`);
      }.bind(this))
    }.bind(this), 500);
  }
}

export default Update;
