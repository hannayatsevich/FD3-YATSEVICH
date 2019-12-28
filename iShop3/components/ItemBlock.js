'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import './ItemBlock.css';

class ItemBlock extends React.Component {
  static propTypes = {
    itemName: PropTypes.string.isRequired,
    itemCategory: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imgUrl: PropTypes.string.isRequired,
    inStock: PropTypes.number.isRequired,

    cbDeleteItem: PropTypes.func.isRequired,
    cbChooseItem: PropTypes.func.isRequired,
    chosenItem: PropTypes.number,

    isNewItem: PropTypes.bool.isRequired,
    isEditable: PropTypes.bool.isRequired,
    isChanged: PropTypes.bool.isRequired,
  };
  
  itemForDelete = (EO) => {
    EO.stopPropagation();
    let deleteAnswer = confirm(`Do you want to delete article ${this.props.itemNumber} ${this.props.itemName}?`);
    if (deleteAnswer)
      this.props.cbDeleteItem(this.props.itemNumber);
  };

  itemForEdit = (EO) => {
    EO.stopPropagation();
    if(!this.props.isChanged)
      this.props.cbChooseItem(this.props.itemNumber, true);
  };

  chooseItem = () => {
    if(this.props.isNewItem)
      this.props.cbChooseItem(null);
    else if(!this.props.isChanged)
      this.props.cbChooseItem(this.props.itemNumber);
  };

  render () {  
    return (
      <tr className = {(this.props.highlightedItem !== this.props.itemNumber) ? 'ItemBlock' : 'ItemBlockSelected'} onClick = {this.chooseItem}>
        <td>{this.props.itemName}</td>
        <td>{this.props.itemNumber}</td>
        <td>{this.props.itemCategory}</td>
        <td>{this.props.price}</td>
        <td>{this.props.inStock}</td>
        <td>
          <img className = 'ItemImg' src = {this.props.imgUrl}/>
        </td>
        <td className = 'DeleteBtn'>
           <input type = 'button' value = 'Edit' onClick = {this.itemForEdit} disabled = {this.props.isNewItem}/>
           <input type = 'button' value = 'Delete' onClick = {this.itemForDelete} disabled = {this.props.isEditable || this.props.isNewItem}/>
        </td>
      </tr>
    )    
  };
};

export default ItemBlock;