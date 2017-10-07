import React, { Component } from 'react';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.message = "There is no blog associated to this contract."
  }

  render() {
    return (
      <div id="#titleContent">
        {this.message}
      </div>
    )
  }
}

export default NotFound;
