/*const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });
import { shallow, render, mount } from 'enzyme';*/

import React from 'react';
import renderer from 'react-test-renderer';
import MobileCompany from '../components/MobileCompany';



let clientsBase = require('../clientsBase.json');

test('проверка работы рендеринга MobileCompany', () => {
  //создание тестовой версии компонента
  const compMobileCompany = renderer.create(
    <MobileCompany clientsBase = {clientsBase}/>
  );
  /*const compMobileCompany = mount(
    <MobileCompany clientsBase = {clientsBase}/>
  );*/

  //снэпшот1
  let compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompanyTree).toMatchSnapshot();
  //фильтрация Active по кнопке
  const filterActiveBtn = compMobileCompany.root.find( el => el.type == 'input'&& el.props.value === 'Active');
  filterActiveBtn.props.onClick();
  //снэпшот2
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot(); 
  //фильтрация Blocked по кнопке
  const filterBlockedBtn = compMobileCompany.root.find( el => el.type == 'input'&& el.props.value === 'Blocked');
  filterBlockedBtn.props.onClick();
  //снэпшот3
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot();
  //фильтрация All Clients по кнопке
  const filterAllClBtn = compMobileCompany.root.find( el => el.type == 'input'&& el.props.value === 'All Clients');
  filterAllClBtn.props.onClick();
  //снэпшот4
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot();
  //фильтрация MTS по кнопке
  const filterMTSBtn = compMobileCompany.root.find( el => el.type == 'input'&& el.props.value === 'MTS');
  filterMTSBtn.props.onClick();
  //снэпшот5
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot(); 
  //фильтрация Velcom по кнопке
  const filterVelcomBtn = compMobileCompany.root.find( el => el.type == 'input'&& el.props.value === 'Velcom');
  filterVelcomBtn.props.onClick();
  //снэпшот6
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot(); 
  //фильтрация All Companies по кнопке
  const filterAllCompBtn = compMobileCompany.root.find( el => el.type == 'input'&& el.props.value === 'All Companies');
  filterAllCompBtn.props.onClick();
  //снэпшот7
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot(); 
  
  //добавление нового клиента по кнопке
  const addNewClientBtn = compMobileCompany.root.find( el => el.type == 'input'&& el.props.value === 'Add Client');
  addNewClientBtn.props.onClick();
  //снэпшот8
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot(); 
  //отмена добавления нового клиента по кнопке
  const cancelNewClientBtn = compMobileCompany.root.find( el => el.type == 'input'&& el.props.value === 'Cancel');
  cancelNewClientBtn.props.onClick();
  //снэпшот9
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot(); 

  /*addNewClientBtn.props.onClick();
  //снэпшот10
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot(); 
  //сохранение добавления нового клиента по кнопке
  const saveNewClientBtn = compMobileCompany.root.find( el => el.type == 'input'&& el.props.value === 'Save');
  saveNewClientBtn.props.onClick();
  //снэпшот11
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot(); */

  //редактироване 1го клиента по кнопке
  const editClientBtn = compMobileCompany.root.findAll( el => el.type == 'input'&& el.props.value === 'Edit');
  editClientBtn[0].props.onClick();
  //снэпшот10
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot(); 
  //отмена редактирования 1го клиента по кнопке
  const cancelEditingClientBtn = compMobileCompany.root.find( el => el.type == 'input'&& el.props.value === 'Cancel');
  cancelEditingClientBtn.props.onClick();
  //снэпшот11
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot(); 

  /*editClientBtn[0].props.onClick();
  //сохранение редактирования 1го клиента по кнопке
  const saveEditingClientBtn = compMobileCompany.root.find( el => el.type == 'input'&& el.props.value === 'Save');
  saveEditingClientBtn.props.onClick();
  //снэпшот12
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot(); */


  //удаление 1го клиента по кнопке
  const deleteClientBtn = compMobileCompany.root.findAll( el => el.type == 'input'&& el.props.value === 'Delete');
  deleteClientBtn[0].props.onClick();
  //снэпшот12
  compMobileCompanyTree = compMobileCompany.toJSON();
  expect(compMobileCompany).toMatchSnapshot(); 

  //expect(compMobileCompany).toMatchSnapshot();
  //const addNewClientBtn = compMobileCompany.find('#addcl'); 
  //const addNewClientBtn = compMobileCompany.find('input[id="addcl"]');
  //addNewClientBtn.simulate('click');
  //expect(compMobileCompany).toMatchSnapshot();
  //compMobileCompanyTree.props.addNewClient(); 
  
});