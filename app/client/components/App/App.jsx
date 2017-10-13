import React, { Component } from 'react';
import BrowserRouter from 'react-router-dom'
import ContractSelector from '../ContractSelector/ContractSelector'
import Blog from '../Blog/Blog'
import Header from '../Header'
import Settings from '../Settings/Settings'
import LightWallet from '../LightWallet'
import Publish from '../Publish'

import { Switch, Route, NavLink } from 'react-router-dom'
import css from '../../styles/flystyles.min.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      writerModeEnabled: false,
      writerNetworkId: undefined
    }

    this.lightWallet = new LightWallet();

  }

  componentDidMount() {
    setInterval(function(){
      if(this.state.writerModeEnabled){
        this.lightWallet.networkId(this.lightWalletClient(), function(networkId) {
          if(this.state.writerNetworkId != networkId) {
            this.setState({ writerNetworkId: networkId }, function(){
              const network = this.network();
              this.props.history.push(`/${network.reference}`)
            });
          }
        }.bind(this));
      }
    }.bind(this), 250)
  }

  render() {
    this.networkReference = this.props.match.params.network;
    const isAValidNetwork = this.lightWallet.isAValidNetwork(this.networkReference);

    if(!isAValidNetwork) {
      return (
        <div className="container invalidNetwork">
          <div className="Alert Alert--danger invalidNetwork" role="alert">
            We do not support that network. <NavLink to="/">Go to home</NavLink>.
          </div>
        </div>
      )
    }

    const network = this.lightWallet.findNetworkByReference(this.networkReference);

    return (
      <div>
        <Header
          network={this.network()}
          lightWallet={this.lightWallet}
          handleWriterMode={this.handleWriterMode.bind(this)}
          writerModeEnabled={this.state.writerModeEnabled} />

        <Switch>
          <Route path="/:network/settings" exact component={Settings} />
          <Route path="/:network/:address/publish" render={(props) => (<Publish {...props} lightWalletClient={this.lightWalletClient()} />)} />
          <Route path="/:network/:address" render={(props) => (<Blog {...props} lightWalletClient={this.lightWalletClient()} />)} />
          <Route path="/:network" render={(props) => (<ContractSelector {...props} writerModeEnabled={this.state.writerModeEnabled} lightWalletClient={this.lightWalletClient()} />)} />
        </Switch>
      </div>
    )
  }

  network() {
    if(this.state.writerModeEnabled){
      return this.lightWallet.findNetworkByIdWithFallback(this.state.writerNetworkId);
    }

    return this.lightWallet.findNetworkByReference(this.networkReference);
  }

  lightWalletClient() {
    if(this.state.writerModeEnabled){
      return this.lightWallet.publisherClient();
    }

    return this.lightWallet.client(this.networkReference);
  }

  handleWriterMode(event) {
    const activatedOrNot = event.target.checked

    this.setState({
      writerModeEnabled: activatedOrNot,
      writerNetwork: undefined
    })
  }
}

export default App;
