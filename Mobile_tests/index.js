'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import MobileCompany from './components/MobileCompany';

let clientsBase = require('./clientsBase.json');

ReactDOM.render(
  <MobileCompany clientsBase = {clientsBase}/>,
  document.getElementById('container')
);