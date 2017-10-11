import React, { Component } from 'react';
import LightWallet from '../LightWallet'

import { withRouter } from 'react-router';

class NetworkBadge extends Component {
  constructor(props) {
    super(props);

    const lightWallet = new LightWallet();

    this.networks = lightWallet.networks();
  }

  render() {
    const networkOptions = this.networks.map(function(network){
      return <option key={network.reference} selected={this.props.network.reference == network.reference}>{network.name}</option>
    }.bind(this));

    return (
      <div>
        <select onChange={this.changeNetwork.bind(this)}>
          {networkOptions}
        </select>
      </div>
    );
  }

  changeNetwork(event) {
    const selectedOption = event.target.selectedIndex
    const selectedNetwork = this.networks[selectedOption];

    this.props.history.push(`/${selectedNetwork.reference}`)
  }
}

export default withRouter(NetworkBadge);
