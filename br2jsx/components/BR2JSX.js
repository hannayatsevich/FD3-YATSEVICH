'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import './BR2JSX.css'

class BR2JSX extends React.Component {
  static propTyes = {
    text: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className = 'BR2JSX'>
        {
          this.props.text.split(/\<br ?\/?\>/).map( (value, index, array) => {
            if (index !== array.length - 1) 
              return (
                <React.Fragment key = {index}>
                  {value}
                  {<br/>}
                </React.Fragment>
              )
            else 
              return (
                <React.Fragment key = {index}>
                  {value}
                </React.Fragment>
              )              
            })
        }
      </div>
    )
  };
};


export default BR2JSX;