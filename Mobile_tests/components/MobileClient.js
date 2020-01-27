'use stict';

import React from 'react';
import PropTypes from 'prop-types';
import './MobileClient.css';
import { mobileEvents } from './events';

class MobileClient extends React.PureComponent {
  static propTypes = {
    clientDetails: PropTypes.shape({
      id: PropTypes.number.isRequired,
      provider: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      secondName: PropTypes.string.isRequired,
      tarrifPlan: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    })    
  };
  constructor(props) {
    super(props);
    this.state = {
      clientDetails: props.clientDetails,
    };
  };

  deleteClient = () => {
    let deleteAnswer = true;
    console.log('inside function');
    if(typeof window !== 'undefined') {
      console.log('inside typeof window !== "undefined"');
      deleteAnswer = confirm(`Do you want to delete ${this.state.clientDetails.firstName} ${this.state.clientDetails.secondName} data?`);
    };
    if(deleteAnswer) {
      console.log('inside deleteAnswer true/false');
      mobileEvents.emit('EDeleteClient', this.state.clientDetails.id);
    };    
  };
  editClient = () => {
    mobileEvents.emit('EEditClient', this.state.clientDetails.id);
  };

  componentWillReceiveProps = (newProps) => {
    this.setState({clientDetails: newProps.clientDetails});
  };

  render() {
    //console.log(`MobileClient ${this.state.clientDetails.id} render`);
    return(
    <tr className = 'MobileClient'>
      <td>{this.state.clientDetails.provider}</td>
      <td>{this.state.clientDetails.firstName}</td>
      <td>{this.state.clientDetails.secondName}</td>
      <td>{this.state.clientDetails.tarrifPlan}</td>
      <td>{this.state.clientDetails.balance}</td>
      <td className = {this.state.clientDetails.balance <= 0 ? 'BlockedRed' : 'ActiveGreen'}>
        {this.state.clientDetails.balance <= 0 ? 'blocked' : 'active'}
      </td>
      <td><input type = 'button' value = 'Edit' onClick = {this.editClient}/></td>
      <td><input type = 'button' value = 'Delete' onClick = {this.deleteClient}/></td>
    </tr>
    );
  };
};

export default MobileClient;