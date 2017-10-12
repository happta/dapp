import React, { Component } from 'react';

import { NavLink } from 'react-router-dom'

import NetworkBadge from './App/NetworkBadge'

class Header extends Component {
  render() {
    const network = this.props.network;

    return (
      <header className="header">
        <div className="menuContainer">
          <div className="smallMenuItem">
            <div className="logotype">
              happta
            </div>
          </div>
          <div className="smallMenuItem">
            <NavLink className="menuButton" to={`/${network.reference}`} id="goToHome">Home</NavLink>
          </div>
          <div className="smallMenuItem">
            <NavLink className="menuButton" to={`/${network.reference}/settings`} id="goToSettings">Settings</NavLink>
          </div>

          <div className="menuSeparator"></div>
          <div className="mediumMenuItem">
            <NetworkBadge network={network} selectionDisabled={this.props.writerModeEnabled} lightWallet={this.props.lightWallet} />
          </div>
          <div className="mediumMenuItem">
            <div className="menuButton">
              Publisher mode <input type="checkbox" id="writerModeEnabled" onChange={this.props.handleWriterMode} disabled={!this.props.lightWallet.isPublisherModeAvailable()}/>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;
