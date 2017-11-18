import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import showdown from 'showdown';
import DOMPurify from 'dompurify';
import { NavLink } from 'react-router-dom'

class ContentView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSharingArea: false,
      showHistoryArea: false
    }
  }

  entryToShow() {
    const entry = this.props.entry;
    const updates = Object.assign([], entry.updates);

    if(this.props.version) {
      const versionEntries = updates.reverse()
      versionEntries.unshift(entry);

      return versionEntries[this.props.version];
    }

    return entry.updates[0] || entry
  }

  historicEntries() {
    const baseEntry = this.props.entry;
    const versionsUpdates = Object.assign([], baseEntry.updates);
    versionsUpdates.push(baseEntry);

    return versionsUpdates.map(function(version){
      const currentVersionIndex = [].concat(versionsUpdates).reverse().
        findIndex(function(e){
          return e.id == version.id && e.parent == version.parent
        });

      return (<p key={version.title} >
        <NavLink to={`${this.props.rootPath}/${baseEntry.id}/${currentVersionIndex}`}>{version.date.toString()} | {version.title} {currentVersionIndex == this.props.version && <i className="mdi mdi-arrow-left"></i>}</NavLink>
      </p>)
    }.bind(this))
  }

  render() {
    const converter = new showdown.Converter();

    let entryToShow = this.entryToShow();

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
              <button className="btn btn-primary sharing-button cursor" onClick={this.toggleSharingArea.bind(this)}>Share <i className="mdi mdi-arrow-down"></i></button>
              {this.state.showSharingArea && <div className="sharing-area">
                <p><a href={`${window.location.href}`}>Direct link</a></p>
                <p><a href={`${window.location.href}?noHeader=true`}>Direct link without header</a></p>
                <p>IPFS hash: {entryToShow.identifier}</p>
              </div>}
            </div>
          </div>
        </div>
        <button className="btn btn-secondary sharing-button cursor" onClick={this.toggleHistoryArea.bind(this)}>History <i className="mdi mdi-arrow-down"></i></button>
        {this.state.showHistoryArea && <div className="history-area">
          {this.historicEntries()}
        </div>}
        <NavLink id="goToRootLink" to={this.props.rootPath}><i className="mdi mdi-keyboard-backspace"></i> Go to the rest of the content</NavLink>
      </div>
    );
  }

  toggleSharingArea() {
    this.setState({
      showSharingArea: !this.state.showSharingArea
    })
  }

  toggleHistoryArea() {
    this.setState({
      showHistoryArea: !this.state.showHistoryArea
    })
  }

  formatDate(date) {
    const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]

    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
  }
}

export default ContentView;
