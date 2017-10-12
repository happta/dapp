import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import showdown from 'showdown';
import DOMPurify from 'dompurify';

class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const entry = this.props.entry;
    const converter = new showdown.Converter();
    const rawContent = converter.makeHtml(entry.content);

    const sanitizedContent = DOMPurify.sanitize(rawContent);

    const title = entry.title;

    return (
      <div onClick={this.openModal} className="entryTitle" data-title={title}>
        <h5>{this.formatDate(entry.date)} | {title}</h5>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >

          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
          <button onClick={this.closeModal}>Close</button>
        </Modal>
      </div>
    );
  }

  formatDate(date) {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }
}

export default Entry;
