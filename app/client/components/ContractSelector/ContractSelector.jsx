import React, { Component } from 'react';
import web3 from 'web3';

class ContractSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="contractSelector">
        <form onSubmit={this.goToContract.bind(this)}>
          <input type="text" id="contractInput" />
          <button id="goToContract" onClick={this.goToContract.bind(this)}>Go to blog</button>
        </form>
      </section>
    );
  }

  goToContract() {
    const addressContainer = document.getElementById("contractInput");
    const address = addressContainer.value;
    const network = this.props.match.params.network;
    const route = `/${network}/${address}`;

    this.props.history.push(route);
  }
}

export default ContractSelector;
