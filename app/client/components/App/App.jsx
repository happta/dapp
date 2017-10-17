import React, { Component } from 'react';
import BrowserRouter from 'react-router-dom'
import ContractSelector from '../ContractSelector/ContractSelector'
import Blog from '../Blog/Blog'
import Header from '../Header'
import Settings from '../Settings/Settings'
import Transactions from '../Transactions'
import LightWallet from '../LightWallet'
import Publish from '../Publish'
import NetworkNotSupported from './NetworkNotSupported'

import TransactionsHistory from '../TransactionsHistory'

import { Switch, Route } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      writerModeEnabled: false,
      writerNetworkId: undefined
    }

    this.checkIfWriterModeNetworkChanged = this.checkIfWriterModeNetworkChanged.bind(this);
    this.changeWriterNetwork = this.changeWriterNetwork.bind(this)
  }

  componentDidMount() {
    this.checkOftenTheWriterModeNetwork();
    this.checkPendingTransactionsOften();
  }

  lightWallet() {
    return new LightWallet();
  }

  render() {
    const isAValidNetwork = this.lightWallet().isAValidNetwork(this.props.match.params.network);

    if(!isAValidNetwork) {
      return <NetworkNotSupported />
    }

    const PublishPage = (props) => (
      <Publish
        {...props}
        lightWalletClient={this.lightWalletClient()} />
    )

    const BlogPage = (props) => (
      <Blog
        {...props}
        lightWalletClient={this.lightWalletClient()} />
    )

    const ContractSelectorPage = (props) => (
      <ContractSelector
        {...props}
        writerModeEnabled={this.state.writerModeEnabled}
        lightWalletClient={this.lightWalletClient()} />
    )

    return (
      <div>
        <Header
          network={this.network()}
          lightWallet={this.lightWallet()}
          handleWriterMode={this.handleWriterMode.bind(this)}
          writerModeEnabled={this.state.writerModeEnabled} />

        <Switch>
          <Route path="/:network/settings" exact component={Settings} />
          <Route path="/:network/transactions" exact component={Transactions} />
          <Route path="/:network/:address/publish" render={PublishPage} />
          <Route path="/:network/:address" render={BlogPage} />
          <Route path="/:network" render={ContractSelectorPage} />
        </Switch>
      </div>
    )
  }

  checkOftenTheWriterModeNetwork() {
    const fourTimesPerSecond = 250

    setInterval(this.checkIfWriterModeNetworkChanged, fourTimesPerSecond)
  }

  checkIfWriterModeNetworkChanged() {
    if(this.state.writerModeEnabled){
      this.lightWallet().networkId(this.lightWalletClient(), this.changeWriterNetwork);
    }
  }

  changeWriterNetwork(newNetworkId) {
    if(this.state.writerNetworkId != newNetworkId) {
      this.setState({ writerNetworkId: newNetworkId },
        this.redirectToCurrentNetwork);
    }
  }

  redirectToCurrentNetwork() {
    const network = this.network();
    const resource = this.props.match.params.resource

    if(resource) {
      return this.props.history.push(`/${network.reference}/${resource}`)
    }

    this.props.history.push(`/${network.reference}`)
  }


  handleWriterMode(event) {
    const activatedOrNot = event.target.checked

    this.setState({
      writerModeEnabled: activatedOrNot,
      writerNetwork: undefined
    })
  }

  network() {
    if(this.state.writerModeEnabled && this.state.writerNetworkId != undefined){
      return this.lightWallet().findNetworkByIdWithFallback(this.state.writerNetworkId);
    }

    return this.lightWallet().findNetworkByReference(this.props.match.params.network);
  }

  lightWalletClient() {
    if(this.state.writerModeEnabled){
      return this.lightWallet().publisherClient();
    }

    return this.lightWallet().client(this.props.match.params.network);
  }

  checkPendingTransactionsOften() {
    const transactionsHistory = new TransactionsHistory(this.props.match.params.network);

    setInterval(function(){
      transactionsHistory.checkPendingTransactions()
    }, 500);
  }
}

export default App;
