import React, { Component } from 'react';

class Settings extends Component {
  constructor() {
    super()

    this.hostReference = "ipfsNode";
    this.portReference = "portNode";
    this.protocolReference = "protocolNode";

    this.defaultNodeHost = "ipfs"
    this.defaultNodePort = "5002"
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
      <div className="container formsContainer">
        <h2 className="settingsTitle">Settings Page {this.state.wadus}</h2>
        <div className="separator"></div>
        <div className="FormGroup">
          <label>IPFS Node host:</label>
          <input type="text" className="Input" value={this.state.host} id="hostField" onChange={this.changeHost} />
        </div>
        <div className="FormGroup">
          <label>IPFS Node port:</label>
          <input type="text" className="Input" value={this.state.port} id="portField" onChange={this.changePort} />
        </div>
        <div className="FormGroup">
          <label>IPFS Node protocol:</label>
          <input type="text" className="Input" value={this.state.protocol} id="protocolField" onChange={this.changeProtocol} />
        </div>
        <div className="FormGroup">
          <button className="Button Button--primary Button--block" onClick={this.reset} id="resetSettings">Reset to default node</button>
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
