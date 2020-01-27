/*const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });
import { shallow, render, mount } from 'enzyme';*/

import React from 'react';
import renderer from 'react-test-renderer';
import MobileCompany from '../components/MobileCompany';
import {getExistingClientsId, setFilterExt, saveClientExt, deleteEditClientExt} from '../components/MobileCompany';

test('проверка работы рендеринга MobileCompany', () => {
  let clientsBase = require('../clientsBase.json');
  //создание тестовой версии компонента
  const compMobileCompany = renderer.create(
    <MobileCompany clientsBase = {clientsBase}/>
  );
  //снэпшот1
  let compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompanyTree).toMatchSnapshot();
    
  //добавление нового клиента по кнопке
  const addNewClientBtn = compMobileCompany.root.find( el => el.type == 'input'&& el.props.value === 'Add Client');
  addNewClientBtn.props.onClick();
  //снэпшот2
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot(); 
  //отмена добавления нового клиента по кнопке
  const cancelNewClientBtn = compMobileCompany.root.find( el => el.type == 'input'&& el.props.value === 'Cancel');
  cancelNewClientBtn.props.onClick();
  //снэпшот3
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot(); 

  //редактироване 1го клиента по кнопке
  const editClientBtn = compMobileCompany.root.findAll( el => el.type == 'input'&& el.props.value === 'Edit');
  editClientBtn[0].props.onClick();
  //снэпшот4
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot(); 

  //отмена редактирования 1го клиента по кнопке
  const cancelEditingClientBtn = compMobileCompany.root.find( el => el.type == 'input'&& el.props.value === 'Cancel');
  cancelEditingClientBtn.props.onClick();
  //снэпшот5
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot(); 
  
  global.confirm = () => true;
  //spyOn(window, 'confirm').andReturn(true);
  //удаление 1го клиента по кнопке
  const deleteClientBtn = compMobileCompany.root.findAll( el => el.type == 'input'&& el.props.value === 'Delete');
  deleteClientBtn[0].props.onClick();
  //снэпшот6
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot();   
});


test('проверка работы getExistingClientsId', () => {
  let clientsArr = [
    {"id": 1, "provider": "MTS", "firstName": "Jane", "secondName": "Smith", "tarrifPlan": "optima","balance": 300},
    {"id": 2, "provider": "Velcom", "firstName": "Robert", "secondName": "Collins", "tarrifPlan": "standard","balance": 500},
    {"id": 3, "provider": "MTS", "firstName": "Thomas", "secondName": "Lee", "tarrifPlan": "maxi","balance": 1000},
    {"id": 4, "provider": "MTS", "firstName": "David", "secondName": "Parker", "tarrifPlan": "optima","balance": -200},
    {"id": 5, "provider": "Velcom", "firstName": "Olivia", "secondName": "Brown", "tarrifPlan": "standard","balance": -10},
    {"id": 6, "provider": "MTS", "firstName": "Mark", "secondName": "Green", "tarrifPlan": "optima","balance": 50},
    {"id": 7, "provider": "Velcom", "firstName": "Patricia", "secondName": "Adams", "tarrifPlan": "maxi","balance": 30}
  ];
  let clientsArr2 = [
    {"id": 5, "provider": "Velcom", "firstName": "Olivia", "secondName": "Brown", "tarrifPlan": "standard","balance": -10},
    {"id": 6, "provider": "MTS", "firstName": "Mark", "secondName": "Green", "tarrifPlan": "optima","balance": 50}
  ];
  let existingClientsId = {arr: [7,6,5,4,3,2,1], maxIdValue: 7};
  let existingClientsId2 = {arr: [6,5], maxIdValue: 6};
  expect(getExistingClientsId(clientsArr)).toEqual(existingClientsId);
  expect(getExistingClientsId(clientsArr2)).toEqual(existingClientsId2);
});

test('проверка работы setFilterExt', () => {
  let clientsArr = [
    {"id": 1, "provider": "MTS", "firstName": "Jane", "secondName": "Smith", "tarrifPlan": "optima","balance": 300},
    {"id": 2, "provider": "Velcom", "firstName": "Robert", "secondName": "Collins", "tarrifPlan": "standard","balance": 500},
    {"id": 3, "provider": "MTS", "firstName": "Thomas", "secondName": "Lee", "tarrifPlan": "maxi","balance": 1000},
    {"id": 4, "provider": "MTS", "firstName": "David", "secondName": "Parker", "tarrifPlan": "optima","balance": -200},
    {"id": 5, "provider": "Velcom", "firstName": "Olivia", "secondName": "Brown", "tarrifPlan": "standard","balance": -10},
    {"id": 6, "provider": "MTS", "firstName": "Mark", "secondName": "Green", "tarrifPlan": "optima","balance": 50},
    {"id": 7, "provider": "Velcom", "firstName": "Patricia", "secondName": "Adams", "tarrifPlan": "maxi","balance": 30}
  ];
  
  let filteredMTSActive = [
    {"id": 1, "provider": "MTS", "firstName": "Jane", "secondName": "Smith", "tarrifPlan": "optima","balance": 300},
    {"id": 3, "provider": "MTS", "firstName": "Thomas", "secondName": "Lee", "tarrifPlan": "maxi","balance": 1000},
    {"id": 6, "provider": "MTS", "firstName": "Mark", "secondName": "Green", "tarrifPlan": "optima","balance": 50},
  ];
  let filteredVelcomBlocked = [
    {"id": 5, "provider": "Velcom", "firstName": "Olivia", "secondName": "Brown", "tarrifPlan": "standard","balance": -10},
  ];;
  let filteredAllCompAllClients = [
    {"id": 1, "provider": "MTS", "firstName": "Jane", "secondName": "Smith", "tarrifPlan": "optima","balance": 300},
    {"id": 2, "provider": "Velcom", "firstName": "Robert", "secondName": "Collins", "tarrifPlan": "standard","balance": 500},
    {"id": 3, "provider": "MTS", "firstName": "Thomas", "secondName": "Lee", "tarrifPlan": "maxi","balance": 1000},
    {"id": 4, "provider": "MTS", "firstName": "David", "secondName": "Parker", "tarrifPlan": "optima","balance": -200},
    {"id": 5, "provider": "Velcom", "firstName": "Olivia", "secondName": "Brown", "tarrifPlan": "standard","balance": -10},
    {"id": 6, "provider": "MTS", "firstName": "Mark", "secondName": "Green", "tarrifPlan": "optima","balance": 50},
    {"id": 7, "provider": "Velcom", "firstName": "Patricia", "secondName": "Adams", "tarrifPlan": "maxi","balance": 30}
  ];
  let filteredAllCompActive = [
    {"id": 1, "provider": "MTS", "firstName": "Jane", "secondName": "Smith", "tarrifPlan": "optima","balance": 300},
    {"id": 2, "provider": "Velcom", "firstName": "Robert", "secondName": "Collins", "tarrifPlan": "standard","balance": 500},
    {"id": 3, "provider": "MTS", "firstName": "Thomas", "secondName": "Lee", "tarrifPlan": "maxi","balance": 1000},
    {"id": 6, "provider": "MTS", "firstName": "Mark", "secondName": "Green", "tarrifPlan": "optima","balance": 50},
    {"id": 7, "provider": "Velcom", "firstName": "Patricia", "secondName": "Adams", "tarrifPlan": "maxi","balance": 30}
  ];
  expect(setFilterExt('MTS', 'All Companies', 'Active', 'All Clients', clientsArr, clientsArr, false)).toEqual(filteredMTSActive);
  expect(setFilterExt('Velcom', 'All Companies', 'Blocked', 'All Clients', clientsArr, clientsArr, false)).toEqual(filteredVelcomBlocked);
  expect(setFilterExt('All Companies', 'All Companies', 'All Clients', 'All Clients', clientsArr, clientsArr, true)).toEqual(filteredAllCompAllClients);
  expect(setFilterExt('All Companies', 'MTS', 'Active', 'Blocked', clientsArr, clientsArr, false)).toEqual(filteredAllCompActive);
});

test('проверка работы saveClientExt', () => {
  let clientsArr = [
    {"id": 1, "provider": "MTS", "firstName": "Jane", "secondName": "Smith", "tarrifPlan": "optima","balance": 300},
    {"id": 2, "provider": "Velcom", "firstName": "Robert", "secondName": "Collins", "tarrifPlan": "standard","balance": 500},
    {"id": 3, "provider": "MTS", "firstName": "Thomas", "secondName": "Lee", "tarrifPlan": "maxi","balance": 1000}
  ];
  
  let clientDetails1 =  {"id": 1, "provider": "MTS2", "firstName": "Jane", "secondName": "Smith", "tarrifPlan": "optima","balance": 300};
  let newClientsArr1 = {
    clientsForRender:[
      {"id": 1, "provider": "MTS2", "firstName": "Jane", "secondName": "Smith", "tarrifPlan": "optima","balance": 300},
      {"id": 2, "provider": "Velcom", "firstName": "Robert", "secondName": "Collins", "tarrifPlan": "standard","balance": 500},
      {"id": 3, "provider": "MTS", "firstName": "Thomas", "secondName": "Lee", "tarrifPlan": "maxi","balance": 1000}
    ],
    clientsForRenderFiltered:[
      {"id": 1, "provider": "MTS2", "firstName": "Jane", "secondName": "Smith", "tarrifPlan": "optima","balance": 300},
      {"id": 2, "provider": "Velcom", "firstName": "Robert", "secondName": "Collins", "tarrifPlan": "standard","balance": 500},
      {"id": 3, "provider": "MTS", "firstName": "Thomas", "secondName": "Lee", "tarrifPlan": "maxi","balance": 1000}
    ],
  };
  let clientDetails2 =  {"id": '', "provider": '', "firstName": "Jane", "secondName": "Smith", "tarrifPlan": "optima","balance": 300};
  let newClientsArr2 = {
    clientsForRender:[
      {"id": 1, "provider": "MTS", "firstName": "Jane", "secondName": "Smith", "tarrifPlan": "optima","balance": 300},
      {"id": 2, "provider": "Velcom", "firstName": "Robert", "secondName": "Collins", "tarrifPlan": "standard","balance": 500},
      {"id": 3, "provider": "MTS", "firstName": "Thomas", "secondName": "Lee", "tarrifPlan": "maxi","balance": 1000},
      {"id": 4, "provider": '', "firstName": "Jane", "secondName": "Smith", "tarrifPlan": "optima","balance": 300}
    ],
    clientsForRenderFiltered:[
      {"id": 1, "provider": "MTS", "firstName": "Jane", "secondName": "Smith", "tarrifPlan": "optima","balance": 300},
      {"id": 2, "provider": "Velcom", "firstName": "Robert", "secondName": "Collins", "tarrifPlan": "standard","balance": 500},
      {"id": 3, "provider": "MTS", "firstName": "Thomas", "secondName": "Lee", "tarrifPlan": "maxi","balance": 1000},
      {"id": 4, "provider": '', "firstName": "Jane", "secondName": "Smith", "tarrifPlan": "optima","balance": 300}
    ]
  };
  expect(saveClientExt(clientDetails1, clientsArr, clientsArr, 'All Companies', 'All Clients')).toEqual(newClientsArr1);
  expect(saveClientExt(clientDetails2, clientsArr, clientsArr, 'All Companies', 'All Clients')).toEqual(newClientsArr2);
});

test('проверка работы deleteEditClientExt', () => {
  let clientsArr = [
    {"id": 1, "provider": "MTS", "firstName": "Jane", "secondName": "Smith", "tarrifPlan": "optima","balance": 300},
    {"id": 2, "provider": "Velcom", "firstName": "Robert", "secondName": "Collins", "tarrifPlan": "standard","balance": 500},
    {"id": 3, "provider": "MTS", "firstName": "Thomas", "secondName": "Lee", "tarrifPlan": "maxi","balance": 1000}
  ];
  let clientsArrWODeletedClient = [
    {"id": 2, "provider": "Velcom", "firstName": "Robert", "secondName": "Collins", "tarrifPlan": "standard","balance": 500},
    {"id": 3, "provider": "MTS", "firstName": "Thomas", "secondName": "Lee", "tarrifPlan": "maxi","balance": 1000}
  ];
  let editableClient = {"id": 3, "provider": "MTS", "firstName": "Thomas", "secondName": "Lee", "tarrifPlan": "maxi","balance": 1000};
    
  expect(deleteEditClientExt (1, clientsArr, 'Delete')).toEqual(clientsArrWODeletedClient);
  expect(deleteEditClientExt (3, clientsArr, 'Edit')).toEqual(editableClient);
});