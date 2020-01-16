'use strict';

import React from 'react';

class Fragment extends React.Component {
  render() {
    return <p>{this.props.children}</p>
  };
};

export default Fragment;