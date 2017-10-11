import React, { Component } from 'react';

import { NavLink } from 'react-router-dom'

import NetworkBadge from './App/NetworkBadge'

class Header extends Component {
  render() {
    const network = this.props.network;

    return (
      <div>
        <ul>
          <li>
            <NavLink to={`/${network.reference}`} id="goToHome">Home</NavLink>
          </li>
          <li>
            <NavLink to={`/${network.reference}/settings`} id="goToSettings">Settings</NavLink>
          </li>
          <li>
            <NetworkBadge network={network} lightWallet={this.props.lightWallet} />
          </li>
        </ul>
      </div>
    )
  }
}

export default Header;
