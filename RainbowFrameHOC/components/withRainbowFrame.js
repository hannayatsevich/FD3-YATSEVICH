'use strict';
import React from 'react';
import './RainbowFrame.css';

function withRainbowFrame (colors) {
  return function (InnerComponent) {
    return props => {
      let code = <InnerComponent {...props}/>;
      colors.forEach( (value, index) => {
        code = <div className = {index === colors.length - 1 ? 'RainbowFrame' : null} style = {{border: 'solid 7px', borderColor: value, padding: '5px' }}>
                {code}
              </div>
      });
      return code;
    };
  };
};

export {withRainbowFrame};