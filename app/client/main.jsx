'use strict';

import 'styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Index from 'components/Index/Index';

import { BrowserRouter } from 'react-router-dom'

ReactDOM.render((
  <BrowserRouter>
    <Index />
  </BrowserRouter>
), document.getElementById('js-main'))
