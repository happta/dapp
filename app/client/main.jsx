'use strict';

import 'styles/main.scss';
import 'styles/zoom.css';
import 'styles/materialdesignicons.css';

import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './components/AppRouter'

ReactDOM.render((<AppRouter />), document.getElementById('js-main'))
