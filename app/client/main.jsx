'use strict';

import 'styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App/App';

import { BrowserRouter } from 'react-router-dom'

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('js-main'))
