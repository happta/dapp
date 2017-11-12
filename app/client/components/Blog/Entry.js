import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import showdown from 'showdown';
import DOMPurify from 'dompurify';

class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contentOpened: false
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
      <div className="card Entry " data-title={title}>
        <div className="card-body Entry-body">
          <div onClick={this.toggleContent} className="cursor">
            <p>{this.formatDate(entry.date)}</p>
            <h2>{title}</h2>
          </div>
          <div>
            { this.state.contentOpened && <div><hr /><div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div></div> }
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
