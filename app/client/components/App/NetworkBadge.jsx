import React, { Component } from 'react';

import { withRouter } from 'react-router';

class NetworkBadge extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const networkOptions = this.props.lightWallet.networks().map(function(network){
      return <option key={network.reference}>{network.name}</option>
    }.bind(this));

    return (
      <div>
        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
          <div className="input-group-addon">
            <i className="mdi mdi-access-point-network"></i>
          </div>

          <select className="Select selectNetwork" onChange={this.changeNetwork.bind(this)} defaultValue={this.props.network.name} disabled={this.props.selectionDisabled}>
            {networkOptions}
          </select>
        </div>
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
