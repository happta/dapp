import React, { Component } from 'react';

import { withRouter } from 'react-router';

class NetworkBadge extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.selectionDisabled) {
      return (
        <div className="menuButton">
          {this.props.network.name}
        </div>
      )
    }

    const networkOptions = this.props.lightWallet.networks().map(function(network){
      return <option key={network.reference}>{network.name}</option>
    }.bind(this));

    return (
      <div>
        <select className="Select selectNetwork" onChange={this.changeNetwork.bind(this)} defaultValue={this.props.network.name}>
          {networkOptions}
        </select>
      </div>
    );
  }

  changeNetwork(event) {
    const selectedOption = event.target.selectedIndex
    const selectedNetwork = this.props.lightWallet.networks()[selectedOption];

    const resource = this.props.match.params.resource;

    if(resource) {
      this.props.history.push(`/${selectedNetwork.reference}/${resource}`)
      return
    }

    this.props.history.push(`/${selectedNetwork.reference}`)
  }
}

export default withRouter(NetworkBadge);
