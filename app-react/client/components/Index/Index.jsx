import React, { Component } from 'react';
import BrowserRouter from 'react-router-dom'
import ContractSelector from '../ContractSelector/ContractSelector'
import Blog from '../Blog/Blog'

import { Switch, Route } from 'react-router-dom'

class IndexComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact={true} component={ContractSelector} />
        <Route path="/:address" component={Blog} />
      </Switch>
    )
  }
}

export default IndexComponent;
