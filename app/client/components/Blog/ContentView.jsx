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
        <div className="card ContentView" data-title={title} ipfs-hash={entry.identifier}>
          <div className="card-body">
            <div className="cursor header">
              <h2>{title}</h2>
              <p>on {this.formatDate(entry.date)}</p>
            </div>
            <div>
              <div className="actual-content" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
              <hr />
              <h2>Share:</h2>
              <ul>
                <li><p><a href={`${window.location.href}`}>Direct link</a></p></li>
                <li><p><a href={`${window.location.href}?noHeader=true`}>Direct link without header</a></p></li>
                <li><p>IPFS hash: {entry.identifier}</p></li>
              </ul>
            </div>
          </div>
        </div>
        <NavLink id="goToRootLink" to={this.props.rootPath}><i className="mdi mdi-keyboard-backspace"></i> Go to the rest of the content</NavLink>
      </div>
    );
  }

  formatDate(date) {
    const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]

    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
  }
}

export default ContentView;
