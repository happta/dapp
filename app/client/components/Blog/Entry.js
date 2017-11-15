import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import showdown from 'showdown';
import DOMPurify from 'dompurify';

import { NavLink } from 'react-router-dom'

class Entry extends Component {
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
        <div className="card Entry" data-title={title} ipfs-hash={entry.identifier}>
            <div className="card-body Entry-body">
              <NavLink className="like-no-link" to={`${this.props.rootPath}/${entry.identifier}`}>
                <div className="cursor">
                  <p>{this.formatDate(entry.date)}</p>
                  <h2>{title}</h2>
                </div>
              </NavLink>
          </div>
        </div>
      </div>
    );
  }

  formatDate(date) {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }
}

export default Entry;
