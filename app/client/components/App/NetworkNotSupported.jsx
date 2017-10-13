import React, { Component } from 'react';

import { NavLink } from 'react-router-dom'

class NetworkNotSupported extends Component {
  render() {
    return (
      <div className="container invalidNetwork">
        <div className="Alert Alert--danger invalidNetwork" role="alert">
          We do not support that network. <NavLink to="/">Go to home</NavLink>.
        </div>
      </div>
    )
  }
}

export default NetworkNotSupported;
