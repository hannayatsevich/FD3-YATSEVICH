'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import './RainbowFrame.css'

class RainbowFrame extends React.Component {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string)
  };
   
  render() {
    return (
      <div className = 'RainbowFrame'>
        {
          this.props.colors.reduce( function (accumulator, value){
            return(
              <div style = {{border: 'solid 7px', borderColor: value, padding: '5px' }}>
                {accumulator}
              </div>
            )
          }, <p>{this.props.children}</p>)
        }
      </div>
    )
  };
};

export default RainbowFrame;