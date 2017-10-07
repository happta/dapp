import React, { Component } from 'react';
import BrowserRouter from 'react-router-dom'
import ContractSelector from '../ContractSelector/ContractSelector'
import Blog from '../Blog/Blog'
import NetworkBadge from './NetworkBadge'

import { Switch, Route } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NetworkBadge />
        <Switch>
          <Route path="/" exact={true} component={ContractSelector} />
          <Route path="/:address" component={Blog} />
        </Switch>
      </div>
    )
  }
}

export default App;
