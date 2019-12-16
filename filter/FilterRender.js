'use strict'

let itemNames = [
  {itemName: 'Tea set', itemNumber: 100},
  {itemName: 'Coffee set', itemNumber: 101},
  {itemName: 'Cezve', itemNumber: 102},
  {itemName: 'Teapot', itemNumber: 103},
  {itemName: 'Kettle', itemNumber: 104},
  {itemName: 'Creamer', itemNumber: 105},
  {itemName: 'Sugar bowl', itemNumber: 106},
  {itemName: 'Soup bowl', itemNumber: 200},
  {itemName: 'Salad bowl', itemNumber: 201},
  {itemName: 'Dinner plate', itemNumber: 202}, 
];
ReactDOM.render(
  React.createElement(FilterBlock, {itemNamesForFilter: itemNames, initCheckboxState: true, initFilterState: 'se'}),
  document.getElementById('filtercontainer')
);