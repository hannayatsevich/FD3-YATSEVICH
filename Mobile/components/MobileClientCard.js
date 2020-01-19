'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import './MobileClientCard.css';
import {mobileEvents} from './events';

class MobileClientCard extends React.PureComponent {
  static propTypes = {
    isEditable: PropTypes.bool.isRequired,
    isNewClient: PropTypes.bool.isRequired,
    clientDetails: PropTypes.shape({
      id: PropTypes.number.isRequired,
      provider: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      secondName: PropTypes.string.isRequired,
      tarrifPlan: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isEditable: props.isEditable,
      isNewClient: props.isNewClient,
      clientDetails: props.clientDetails,
    };
  };

  newProviderRef = null;
  newFirstNameRef = null;
  newSecondNameRef = null;
  newTarrifPlanRef = null;
  newBalanceRef = null;

  setNewProviderRef = (ref) => {
    this.newProviderRef = ref;
  };
  setFirstNameRef = (ref) => {
    this.newFirstNameRef = ref;
  };
  setSecondNameRef = (ref) => {
    this.newSecondNameRef = ref;
  };
  setTarrifPlanRef = (ref) => {
    this.newTarrifPlanRef = ref;
  };
  setBalanceRef = (ref) => {
    this.newBalanceRef = ref;
  };

  saveChanges = () => {
    let newClientDetails = {...this.state.clientDetails, provider: this.newProviderRef.value, firstName: this.newFirstNameRef.value, secondName: this.newSecondNameRef.value, tarrifPlan: this.newTarrifPlanRef.value, balance: parseInt(this.newBalanceRef.value)};
    mobileEvents.emit('ESaveClient', newClientDetails);
    mobileEvents.emit('ECloseCard');
    /*this.setState({clientDetails: newClientDetails}, () => {
      mobileEvents.emit('ESaveClient', this.state.clientDetails);
      mobileEvents.emit('ECloseCard');
    });*/
  };
  cancelChanges = () => {    
    mobileEvents.emit('ECloseCard');
  };
  
  componentWillReceiveProps = (newProps) => {
    this.setState({isEditable: newProps.isEditable, isNewClient: newProps.isNewClient, clientDetails: newProps.clientDetails});
    this.newProviderRef.value = newProps.clientDetails.provider;
    this.newFirstNameRef.value = newProps.clientDetails.firstName;
    this.newSecondNameRef.value = newProps.clientDetails.secondName;
    this.newTarrifPlanRef.value = newProps.clientDetails.tarrifPlan;
    this.newBalanceRef.value = newProps.clientDetails.balance;
  };

  render() {
    console.log('MobileClientCard render');

    return (
      <div className = 'MobileClientCard'>
        <p>{this.state.isEditable ? 'Edit Client' : 'Add new Client'}</p>
        <p><label>Provider: 
          <input type = 'text' defaultValue = {this.state.clientDetails.provider} ref = {this.setNewProviderRef}/>
        </label></p>
        <p><label>First Name: 
          <input type = 'text' defaultValue = {this.state.clientDetails.firstName} ref = {this.setFirstNameRef}/>
        </label></p>
        <p><label>Second Name: 
          <input type = 'text' defaultValue = {this.state.clientDetails.secondName} ref = {this.setSecondNameRef}/>
        </label></p>
        <p><label>Tarrif Plan: 
          <input type = 'text' defaultValue = {this.state.clientDetails.tarrifPlan} ref = {this.setTarrifPlanRef}/>
        </label></p>
        <p><label>Balance: 
          <input type = 'text' defaultValue = {this.state.clientDetails.balance} ref = {this.setBalanceRef}/>
        </label></p>
        <p>
          <input type = 'button' value = 'Save' onClick = {this.saveChanges}/>
          <input type = 'button' value = 'Cancel' onClick = {this.cancelChanges}/>
        </p>
      </div>
    );
  };
};

export default MobileClientCard;