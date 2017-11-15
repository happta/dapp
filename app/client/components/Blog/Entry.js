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
                  <h2>{title}</h2>
                  <p className="date">on {this.formatDate(entry.date)}</p>
                </div>
              </NavLink>
          </div>
        </div>
      </div>
    );
  }

  formatDate(date) {
    const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]

    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
  }
}

export default Entry;
