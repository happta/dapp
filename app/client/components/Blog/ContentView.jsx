import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import showdown from 'showdown';
import DOMPurify from 'dompurify';
import { NavLink } from 'react-router-dom'

class ContentView extends Component {
  constructor(props) {
    super(props);
  }

  entryToShow() {
    const entry = this.props.entry;

    if(this.props.version) {
      const versionEntries = entry.updates.reverse()
      versionEntries.unshift(entry);

      return versionEntries[this.props.version];
    }

    return entry.updates[0] || entry
  }

  render() {
    const converter = new showdown.Converter();

    let entryToShow = this.entryToShow();

    console.log(entryToShow);

    const rawContent = converter.makeHtml(entryToShow.content);
    const sanitizedContent = DOMPurify.sanitize(rawContent);

    return (
      <div>
        {this.props.isTheOwner && <NavLink className="btn btn-primary" to={`${this.props.rootPath}/${this.props.entry.id}/update`}>Update</NavLink>}
        <div className="card ContentView" data-title={entryToShow.title} ipfs-hash={entryToShow.identifier}>
          <div className="card-body">
            <div className="cursor header">
              <h2>{entryToShow.title}</h2>
              <p>on {this.formatDate(entryToShow.date)}</p>
            </div>
            <div>
              <div className="actual-content" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
              <hr />
              <h2>Share:</h2>
              <ul>
                <li><p><a href={`${window.location.href}`}>Direct link</a></p></li>
                <li><p><a href={`${window.location.href}?noHeader=true`}>Direct link without header</a></p></li>
                <li><p>IPFS hash: {entryToShow.identifier}</p></li>
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
