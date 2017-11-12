import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import showdown from 'showdown';
import DOMPurify from 'dompurify';

class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contentOpened: this.props.isInitiallyOpen
    };

    this.toggleContent = this.toggleContent.bind(this);
  }

  toggleContent() {
    this.setState({contentOpened: !this.state.contentOpened});
  }

  render() {
    const entry = this.props.entry;
    const converter = new showdown.Converter();
    const rawContent = converter.makeHtml(entry.content);

    const sanitizedContent = DOMPurify.sanitize(rawContent);

    const title = entry.title;

    return (
      <div>
        <div className={`card Entry ${this.props.featured && 'Entry-featured' }`} data-title={title} ipfs-hash={entry.identifier}>
          <div className="card-body Entry-body">
            <div onClick={this.toggleContent} className="cursor">
              <p>{this.formatDate(entry.date)}</p>
              <h2>{title}</h2>
            </div>
            <div>
              { this.state.contentOpened &&
                <div>
                  <hr />
                  <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
                  <hr />
                  <p><a href={`${window.location.href}/${entry.identifier}`}>Direct link</a></p>
                  <p>IPFS hash: {entry.identifier} </p>
                </div> }
            </div>
          </div>
        </div>

        {this.props.featured && <div><h3>Content:</h3></div> }
      </div>
    );
  }

  formatDate(date) {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }
}

export default Entry;
