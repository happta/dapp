import React, { Component } from 'react';
import BrowserRouter from 'react-router-dom'
import ContractSelector from '../ContractSelector/ContractSelector'
import Blog from '../Blog/Blog'
import Header from '../Header'
import Settings from '../Settings/Settings'
import LightWallet from '../LightWallet'

import { Switch, Route } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);

    this.lightWallet = new LightWallet();
  }

  render() {
    const networkReference = this.props.match.params.network;

    const isAValidNetwork = this.lightWallet.isAValidNetwork(networkReference);

    if(!isAValidNetwork) {
      return (
        <div>
          We do not support that network
        </div>
      )
    }

    const network = this.lightWallet.findNetworkByReference(networkReference);

    return (
      <div>
        <Header network={network} />

        <Switch>
          <Route path="/:network/settings" exact component={Settings} />
          <Route path="/:network/:address" component={Blog} />
          <Route path="/:network" component={ContractSelector} />
        </Switch>
      </div>
    )
  }
}

export default App;
