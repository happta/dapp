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

    const lastUpdate = entry.updates[0] || entry

    return (
      <div>
        <div className="card Entry" data-title={lastUpdate.title} ipfs-hash={lastUpdate.identifier}>
            <div className="card-body Entry-body">
              <NavLink className="like-no-link" to={`${this.props.rootPath}/${entry.id}`}>
                <div className="cursor">
                  <h2>{lastUpdate.title}</h2>
                  <p className="date">on {this.formatDate(lastUpdate.date)}</p>
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
