import React, { Component } from 'react';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.message = "There is no blog associated to this contract."
  }

  render() {
    return (
      <div className="container" id="#titleContent">
        <div className="notFoundMessage blogContainer">
          <div className="Alert Alert--warning" role="alert">
            {this.message}
          </div>
        </div>
      </div>
    )
  }
}

export default NotFound;
