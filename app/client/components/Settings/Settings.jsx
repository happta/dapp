import React, { Component } from 'react';

class Settings extends Component {
  constructor() {
    super()

    this.hostReference = "ipfsNode";
    this.portReference = "portNode";
    this.protocolReference = "protocolNode";

    this.defaultNodeHost = "ipfs"
    this.defaultNodePort = "5001"
    this.defaultNodeProtocol = "http"

    this.changeHost = this.changeHost.bind(this);
    this.changePort = this.changePort.bind(this);
    this.changeProtocol = this.changeProtocol.bind(this);
    this.reset = this.reset.bind(this);

    this.state = {
      host: this.host(),
      port: this.port(),
      protocol: this.protocol()
    }
  }

  render() {
    return (
      <div>
        <h2>Settings Page {this.state.wadus}</h2>
        <div>
          IPFS Node Host: <input type="text" value={this.state.host} id="hostField" onChange={this.changeHost} />
        </div>
        <div>
          IPFS Node Port: <input type="text" value={this.state.port} id="portField" onChange={this.changePort} />
        </div>
        <div>
          IPFS Node Protocol: <input type="text" value={this.state.protocol} id="protocolField" onChange={this.changeProtocol} />
        </div>
        <div>
          <button onClick={this.reset} id="resetSettings">Reset to default node</button>
        </div>
      </div>
    )
  }

  host() {
    const nodeHost = localStorage.getItem(this.hostReference);

    if(nodeHost == undefined) {
      return this.defaultNodeHost;
    }

    return nodeHost;
  }

  changeHost(input) {
    const newHost = input.target.value
    localStorage.setItem(this.hostReference, newHost);

    this.setState({
      host: newHost
    });
  }

  port() {
    const nodePort = localStorage.getItem(this.portReference);

    if(nodePort == undefined) {
      return this.defaultNodePort;
    }

    return nodePort;
  }

  changePort(input) {
    const newPort = input.target.value
    localStorage.setItem(this.portReference, newPort);

    this.setState({
      port: newPort
    });
  }

  protocol() {
    const nodeProtocol = localStorage.getItem(this.protocolReference);

    if(nodeProtocol == undefined) {
      return this.defaultNodeProtocol;
    }

    return nodeProtocol;
  }

  changeProtocol(input) {
    const newProtocol = input.target.value
    localStorage.setItem(this.protocolReference, newProtocol);

    this.setState({
      protocol: newProtocol
    });
  }

  reset() {
    localStorage.removeItem(this.hostReference);
    localStorage.removeItem(this.portReference);
    localStorage.removeItem(this.protocolReference);

    this.setState({
      host: this.host(),
      port: this.port(),
      protocol: this.protocol()
    });
  }
}

export default Settings;
