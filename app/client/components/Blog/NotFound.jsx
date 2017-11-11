import React, { Component } from 'react';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.message = "There is no blog associated to this contract."
  }

  render() {
    return (
      <section className="container page-body-wrapper">
        <div className="content-wrapper full-page-wrapper" id="#titleContent">
          <div className="row">
            <div className="col-4"></div>
            <div className="col-4 alert alert-warning" role="alert">
              {this.message}
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      </section>
    )
  }
}

export default NotFound;
