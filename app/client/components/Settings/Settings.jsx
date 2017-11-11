import React, { Component } from 'react';

class Settings extends Component {
  constructor() {
    super()

    this.hostReference = "ipfsNode";
    this.portReference = "portNode";
    this.protocolReference = "protocolNode";

    this.defaultNodeHost = "50.112.194.81"
    this.defaultNodePort = "8080"
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
      <section className="container page-body-wrapper">
        <div className="content-wrapper full-page-wrapper" id="#titleContent">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <h1 className="page-title">Settings Page</h1>
              <div className="card">
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="hostField">IPFS Node host (should be writable and have cors activated):</label>
                    <input type="text" className="form-control p-input" value={this.state.host} id="hostField" onChange={this.changeHost} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="portField">IPFS Node port:</label>
                    <input type="text" className="form-control p-input" value={this.state.port} id="portField" onChange={this.changePort} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="protocolField">IPFS Node protocol:</label>
                    <input type="text" className="form-control p-input" value={this.state.protocol} id="protocolField" onChange={this.changeProtocol} />
                  </div>
                  <button className="btn btn-secondary cursor" onClick={this.reset} id="resetSettings">Reset to default node</button>
                </div>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </section>
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
