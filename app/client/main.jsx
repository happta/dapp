'use strict';

import 'styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App/App';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Redirect from="/" exact to="/mainnet" />
      <Route path="/:network" component={App} />
    </Switch>
  </BrowserRouter>
), document.getElementById('js-main'))
