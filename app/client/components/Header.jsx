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

  render() {
    const network = this.props.network;

    const transactionsHistory = new TransactionsHistory(network.reference);

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

          <div className="smallMenuItem">
            <NavLink className="menuButton" to={`/${network.reference}/transactions`} id="goToSettings">Transactions</NavLink>
          </div>

          <div className="menuSeparator"></div>
          <div className="mediumMenuItem">
            <NetworkBadge network={network} selectionDisabled={this.props.writerModeEnabled} lightWallet={this.props.lightWallet} />
          </div>
          <div className="mediumMenuItem">
            <div className="menuButton">
              <div className="tooltip">
                Publisher: <input type="checkbox" id="writerModeEnabled" onChange={this.props.handleWriterMode} disabled={!this.state.writerModeAvailable}/>

                { !this.state.writerModeAvailable && <span className="tooltipText">You have to have installed MetaMask or Mist.</span> }
              </div>
            </div>
          </div>
          <div className="smallMenuItem" onClick={transactionsHistory.checkPendingTransactions.bind(transactionsHistory)}>
            <div className="tooltip">
              {transactionsHistory.countPendingTransactions()}
              <span className="tooltipText">Pending transactions on the current network.</span>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;
