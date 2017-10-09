import React, { Component } from 'react';
import BrowserRouter from 'react-router-dom'
import ContractSelector from '../ContractSelector/ContractSelector'
import Blog from '../Blog/Blog'
import NetworkBadge from './NetworkBadge'
import Settings from '../Settings/Settings'

import { Switch, Route, Link } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NetworkBadge />
        <Link to="/settings" id="goToSettings">Settings</Link>

        <Switch>
          <Route path="/" exact={true} component={ContractSelector} />
          <Route path="/settings" exact={true} component={Settings} />
          <Route path="/:address" component={Blog} />
        </Switch>
      </div>
    )
  }
}

export default App;
