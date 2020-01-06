'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import RainbowFrame from './components/RainbowFrame';

let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
let innerMessage = 'Hello!';

ReactDOM.render(
  <RainbowFrame colors = {colors}>
    {innerMessage}
  </RainbowFrame>,
  document.getElementById('container')
);