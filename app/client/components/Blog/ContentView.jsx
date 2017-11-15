import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import showdown from 'showdown';
import DOMPurify from 'dompurify';
import { NavLink } from 'react-router-dom'

class ContentView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const entry = this.props.entry;
    const converter = new showdown.Converter();
    const rawContent = converter.makeHtml(entry.content);

    const sanitizedContent = DOMPurify.sanitize(rawContent);

    const title = entry.title;

    return (
      <div>
        <div className="card Entry Entry-featured" data-title={title} ipfs-hash={entry.identifier}>
          <div className="card-body Entry-body">
            <div className="cursor">
              <p>{this.formatDate(entry.date)}</p>
              <h2>{title}</h2>
            </div>
            <div>
              <hr />
              <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
              <hr />
              <p><a href={`${window.location.href}/${entry.identifier}`}>Direct link</a></p>
              <p>IPFS hash: {entry.identifier} </p>
            </div>
          </div>
        </div>
        <NavLink id="goToRootLink" to={this.props.rootPath}>Go to other content</NavLink>
      </div>
    );
  }

  formatDate(date) {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }
}

export default ContentView;
