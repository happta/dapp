'use strict';

import 'styles/main.scss';
import 'styles/flystyles.min.css'

import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './components/AppRouter'

ReactDOM.render((<AppRouter />), document.getElementById('js-main'))
