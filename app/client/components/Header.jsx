import React, { Component } from 'react';

import { NavLink } from 'react-router-dom'

import NetworkBadge from './App/NetworkBadge'

class Header extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <NavLink to="/" id="goToHome">Home</NavLink>
          </li>
          <li>
            <NavLink to="/settings" id="goToSettings">Settings</NavLink>
          </li>
          <li>
            <NetworkBadge />
          </li>
        </ul>
      </div>
    )
  }
}

export default Header;
