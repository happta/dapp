import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import NetworkBadge from './App/NetworkBadge'
import TransactionsHistory from './TransactionsHistory'

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      writerModeAvailable: undefined
    }
  }

  componentDidMount() {
    setTimeout(function() {
      this.setState({
        writerModeAvailable: this.props.lightWallet.isPublisherModeAvailable()
      })
    }.bind(this), 1000)

    this.interval = setInterval(() => this.setState({ time: Date.now() }), 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  goToContract() {
    const addressContainer = document.getElementById("contractInput");
    const address = addressContainer.value;
    const network = this.props.match.params.network;
    const route = `/${network}/${address}`;

    this.props.history.push(route);
  }

  _handleKeyPress(e) {
    const arrowKeys = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"]

    if(arrowKeys.indexOf(e.key) == -1) {
      this.goToContract();
    }
  }

  modeIndicator() {
    if(!this.props.writerModeEnabled || this.props.writerModeAvailable) {
      return (
        <i className="mdi mdi-feather cursor" onClick={this.props.toggleWriterMode}></i>
      )
    }

    return (
      <i className="mdi mdi-book-open-variant cursor" onClick={this.props.toggleWriterMode}></i>
    )
  }

  render() {
    const network = this.props.network;

    const transactionsHistory = new TransactionsHistory(network.reference);

    return (
      <nav className="navbar nav navbar-primary col-lg-12 col-12 fixed-top d-flex flex-row">
        <div className="navbar-menu-wrapper d-flex align-items-center w-100">
          <div>
            <NavLink className="menuButton" to={`/${network.reference}`} id="goToHome">
              <span className="logotype">happta</span>
            </NavLink>
          </div>
          <div className="form-inline mt-2 mt-md-0 d-none d-lg-block ml-lg-auto">
            <input className="form-control search" type="text" placeholder="Contract address" onKeyUp={this._handleKeyPress.bind(this)} maxLength="42" id="contractInput" />
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link count-indicator" to={`/${network.reference}`}>
                <i className="mdi mdi-home"></i>
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link count-indicator">
                {this.modeIndicator()}
              </a>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link count-indicator" to={`/${network.reference}/transactions`}>
                <i className="mdi mdi-clock-fast"></i>
                <span className="count bg-warning">{transactionsHistory.countPendingTransactions()}</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link count-indicator" to={`/${network.reference}/settings`} id="goToSettings">
                <i className="mdi mdi-settings"></i>
              </NavLink>
            </li>
            <NetworkBadge network={network} selectionDisabled={this.props.writerModeEnabled} lightWallet={this.props.lightWallet} />
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header;
