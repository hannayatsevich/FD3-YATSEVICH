'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import MobileClient from './MobileClient';
import MobileClientCard from './MobileClientCard';
import './MobileCompany.css';
import {mobileEvents} from './events';

class MobileCompany extends React.PureComponent{
  static propTypes = {
    clientsBase: PropTypes.shape({
      header: PropTypes.arrayOf(PropTypes.string).isRequired,
      clients: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          provider: PropTypes.string.isRequired,
          firstName: PropTypes.string.isRequired,
          secondName: PropTypes.string.isRequired,
          tarrifPlan: PropTypes.string.isRequired,
          balance: PropTypes.number.isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    let headerForRender = [];
    props.clientsBase.header.forEach( (value, index) => {
      headerForRender.push(<td key = {index}>{value}</td>)
    });

    let defaultClientData = {...props.clientsBase.clients[0]};
    for (let key in defaultClientData) {
      if(typeof defaultClientData[key] === 'string')
        defaultClientData[key] = '';
      if(typeof defaultClientData[key] === 'number')
        defaultClientData[key] = 0;
    };

    this.state = {
      clientsForRender: props.clientsBase.clients,//массив всех существующих клиентов
      clientsForRenderFiltered: props.clientsBase.clients,//массив отфильтрованных клиентов
      headerForRender: headerForRender,//массив ячеек заголовка
      status: 'All Clients',//статус клиентов для фильтрации
      companyName: 'All Companies',//название провайдера для фильтрации
      isEditable: false,//выбран ли к-л клиент для редактирования
      isNewClient: false,//нажата ли кнопка для создания нового клиента
      defaultClientData: defaultClientData,//хэш с пустыми данными по умолчанию
      editableClientData: null,//хэш с данными выбранного клиента      
    };
  };

  //фильтрация провайдера
  setAllProviders = () => {
    let newClientsForRenderFiltered = setFilterExt('All Companies', this.state.companyName, this.state.status, this.state.status, this.state.clientsForRender, this.state.clientsForRenderFiltered);
    this.setState({clientsForRenderFiltered: newClientsForRenderFiltered, companyName: 'All Companies'});
  };
  setVelcom = () => {
    let newClientsForRenderFiltered = setFilterExt('Velcom', this.state.companyName, this.state.status, this.state.status, this.state.clientsForRender, this.state.clientsForRenderFiltered);
    this.setState({clientsForRenderFiltered: newClientsForRenderFiltered, companyName: 'Velcom'});
  };
  setMTS = () => {
    let newClientsForRenderFiltered = setFilterExt('MTS', this.state.companyName, this.state.status, this.state.status, this.state.clientsForRender, this.state.clientsForRenderFiltered);
    this.setState({clientsForRenderFiltered: newClientsForRenderFiltered, companyName: 'MTS'});
  };
  //фильтрация статуса
  setAllClients = () => {
    let newClientsForRenderFiltered = setFilterExt(this.state.companyName, this.state.companyName,'All Clients', this.state.status, this.state.clientsForRender, this.state.clientsForRenderFiltered);
    this.setState({clientsForRenderFiltered: newClientsForRenderFiltered, status: 'All Clients'});
  };
  setActive = () => {
    let newClientsForRenderFiltered = setFilterExt(this.state.companyName, this.state.companyName, 'Active', this.state.status, this.state.clientsForRender, this.state.clientsForRenderFiltered);
    this.setState({clientsForRenderFiltered: newClientsForRenderFiltered, status: 'Active'});
  };
  setBlocked = () => {
    let newClientsForRenderFiltered = setFilterExt(this.state.companyName, this.state.companyName, 'Blocked', this.state.status, this.state.clientsForRender, this.state.clientsForRenderFiltered);
    this.setState({clientsForRenderFiltered: newClientsForRenderFiltered, status: 'Blocked'});
  };
  //обработчики событий
  componentDidMount = () => {
    mobileEvents.addListener('EDeleteClient', this.deleteClient);
    mobileEvents.addListener('EEditClient', this.editClient);
    mobileEvents.addListener('ESaveClient', this.saveClient);
    mobileEvents.addListener('ECloseCard', this.closeCard);
  };
  componentWillUnmount = () => {
    mobileEvents.removeListener('EDeleteClient', this.deleteClient);
    mobileEvents.removeListener('EEditClient', this.editClient);
    mobileEvents.removeListener('ESaveClient', this.saveClient);
    mobileEvents.removeListener('ECloseCard', this.closeCard);
  };
  deleteClient = clientId => {
    let newClientsForRender = deleteEditClientExt(clientId, this.state.clientsForRender, 'Delete');
    let newClientsForRenderFiltered = setFilterExt(this.state.companyName, this.state.companyName, this.state.status, this.state.status, newClientsForRender, this.state.clientsForRenderFiltered, true);
    this.setState({clientsForRender: newClientsForRender, clientsForRenderFiltered: newClientsForRenderFiltered});
  };
  editClient = clientId => {
    let editableClientData = deleteEditClientExt(clientId, this.state.clientsForRender, 'Edit');
    this.setState({isEditable: true, isNewClient: false, editableClientData: editableClientData});
  };
  saveClient = clientDetails => {
    let newClients = saveClientExt(clientDetails, this.state.clientsForRender, this.state.clientsForRenderFiltered, this.state.companyName, this.state.status);
    this.setState({clientsForRender: newClients.clientsForRender, clientsForRenderFiltered: newClients.clientsForRenderFiltered});    
  };
  closeCard = () => {
    this.setState({isEditable: false, isNewClient: false, editableClientData: null});
  };
  addNewClient = () => {
    let defaultClientData = {...this.state.defaultClientData};
    this.setState({isNewClient: true, isEditable: false, defaultClientData: defaultClientData, editableClientData: null});
  };

  render() {
    //console.log('MobileCompany render');

    let rowsForRender = this.state.clientsForRenderFiltered.map( clientDetails => <MobileClient 
      key = {clientDetails.id} 
      clientDetails = {clientDetails}
    />
    );    

    return (
      <div className = 'MobileCompany'>
        <input type = 'button' value = 'All Companies' onClick = {this.setAllProviders}/>
        <input type = 'button' value = 'Velcom' onClick = {this.setVelcom}/>
        <input type = 'button' value = 'MTS' onClick = {this.setMTS}/>
        <hr/>
        <input type = 'button' value = 'All Clients' onClick = {this.setAllClients}/>
        <input type = 'button' value = 'Active' onClick = {this.setActive}/>
        <input type = 'button' value = 'Blocked' onClick = {this.setBlocked}/>
        <hr/>
        <table className = 'Table'>
          <thead className = 'TableHead'>
            <tr>
              {this.state.headerForRender}
            </tr>
          </thead>
          <tbody className = 'TableBody'>
            {rowsForRender}
          </tbody>
        </table>
        <input type = 'button' value = 'Add Client' onClick = {this.addNewClient}/>
        {
          (this.state.isEditable || this.state.isNewClient)&&
          <MobileClientCard
          isEditable = {this.state.isEditable}
          isNewClient = {this.state.isNewClient}
          clientDetails = {this.state.editableClientData || this.state.defaultClientData}
          />
        }
      </div>
    )
  };
};

function getExistingClientsId (arrOfClients) {
  let arrOfClientsId = arrOfClients.map( value => value.id);
  let maxIdValue = arrOfClientsId.sort((a, b) => b - a)[0];
  return {arr: arrOfClientsId, maxIdValue: maxIdValue};//хэш, ключ arr - массив существующих id, ключ maxIdValue - максимальное значение id (для заведения нового клиента)
};

//формирование отфильтрованного массива
function setFilterExt (newCompanyName, stateCompanyName, newStatus, stateStatus, clientsArray, stateClientsFilteredArray, otherChanges = false) {
  if( (newCompanyName !== stateCompanyName) || (newStatus !== stateStatus) ||  otherChanges === true) {
    let newClientsForRenderFiltered = [...clientsArray];
    if(newCompanyName !== 'All Companies') 
      newClientsForRenderFiltered = newClientsForRenderFiltered.filter( value => {
        return value.provider == newCompanyName;
      });
    if(newStatus !== 'All Clients') 
      newClientsForRenderFiltered = newClientsForRenderFiltered.filter( value => {
        return (value.balance <= 0 && newStatus === 'Blocked') || (value.balance > 0 && newStatus === 'Active');
      });
    return newClientsForRenderFiltered;
  } 
  else 
    return stateClientsFilteredArray;   
};

function saveClientExt(clientDetails, stateClientsForRender, stateClientsFilteredArray, stateCompanyName, stateStatus){
  let existingClientsId = getExistingClientsId(stateClientsForRender);
  if(existingClientsId.arr.indexOf(clientDetails.id) !== -1) {
    let editableClientPosition = stateClientsForRender.findIndex( value => value.id === clientDetails.id);
    let newClientsForRender = [...stateClientsForRender];
    newClientsForRender[editableClientPosition] = clientDetails;
    let newClientsForRenderFiltered = setFilterExt(stateCompanyName, stateCompanyName, stateStatus, stateStatus, newClientsForRender, stateClientsFilteredArray, true);
    return {clientsForRender: newClientsForRender, clientsForRenderFiltered: newClientsForRenderFiltered};
  }
  else {      
    clientDetails.id = existingClientsId.maxIdValue + 1;
    let newClientsForRender = [...stateClientsForRender, clientDetails];
    let newClientsForRenderFiltered = setFilterExt(stateCompanyName, stateCompanyName, stateStatus, stateStatus, newClientsForRender, stateClientsFilteredArray, true);
    return {clientsForRender: newClientsForRender, clientsForRenderFiltered: newClientsForRenderFiltered};
  }
};

function deleteEditClientExt (clientId, stateClientsForRender, mode) {
  if(mode === 'Delete') {
    let newClientsForRender = stateClientsForRender.filter( value => value.id !== clientId);
    return newClientsForRender;    
  };
  if(mode === 'Edit') {
    let editableClientData = stateClientsForRender.filter( value => value.id === clientId);
    return editableClientData[0];
  };
};

export default MobileCompany;

export {getExistingClientsId, setFilterExt, saveClientExt, deleteEditClientExt};