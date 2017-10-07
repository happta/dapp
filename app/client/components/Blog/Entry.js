import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import showdown from 'showdown';
import DOMPurify from 'dompurify';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

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
      <li onClick={this.openModal} data-title={title}>
        {this.formatDate(entry.date)} | {title}

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
          <button onClick={this.closeModal}>Close</button>
        </Modal>
      </li>
    );
  }

  formatDate(date) {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }
}

export default Entry;
