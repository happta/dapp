'use strict';

import 'styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App/App';

import { BrowserRouter } from 'react-router-dom'

import ipfs from 'ipfs-js'

const ipfsURL = { host: 'ipfs', port: '5001', protocol: 'http' };

ipfs.setProvider(ipfsURL);

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('js-main'))
