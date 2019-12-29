'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import './ItemCardBlock.css';

class ItemCardBlock extends React.Component {
  static propTypes = {
    isNewItem: PropTypes.bool.isRequired,
    isEditable: PropTypes.bool.isRequired,

    chosenItemData: PropTypes.shape({
      itemName: PropTypes.string.isRequired,
      itemNumber: PropTypes.number.isRequired,
      itemCategory: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imgUrl: PropTypes.string.isRequired,
      inStock: PropTypes.number.isRequired,
    }).isRequired, 

    cbCancelEditing: PropTypes.func.isRequired, 
    cbSaveEditing: PropTypes.func.isRequired, 
    cbIsInEditingProcess: PropTypes.func.isRequired, 
    existingGoods: PropTypes.array.isRequired
  }; 

  constructor (props) {
    super(props);
    //определим существующие категории для дальнейшей валидации
    let existingCategories = [];
    props.existingGoods.forEach(value => {
      if(existingCategories.indexOf(value.itemCategory) === -1)
      existingCategories.push(value.itemCategory);
    });
    //определим существующие артикулы продуктов для дальнейшей валидации
    let existingNumbers = [];
    props.existingGoods.forEach(value => {
      if(existingNumbers.indexOf(value.itemNumber) === -1)
      existingNumbers.push(value.itemNumber);
    });

    this.state = {
      cardName: (props.isNewItem ? 'Add new item' : (props.isEditable ? 'Edit existing item' : props.chosenItemData.itemName)),
      isValid: !props.isNewItem,      
      existingCategories: existingCategories, 
      existingNumbers: existingNumbers,

      itemName: props.chosenItemData.itemName,
      itemNameErr: false,     
      itemNumber: props.chosenItemData.itemNumber,
      itemNumberErr: false,  
      itemCategory: props.chosenItemData.itemCategory,
      itemCategoryErr: false,  
      price: props.chosenItemData.price,
      priceErr: false, 
      imgUrl: props.chosenItemData.imgUrl,
      imgUrlErr: false,  
      inStock: props.chosenItemData.inStock,
      inStockErr: false, 
    };
  };

  nameChanged = (EO) => {
    this.setState({itemName: EO.target.value}, this.validateData)   
  };
  numberChanged = (EO) => {
    this.setState({itemNumber: EO.target.value}, this.validateData)   
  };
  categoryChanged = (EO) => {
    this.setState({itemCategory: EO.target.value}, this.validateData)   
  };
  priceChanged = (EO) => {
    this.setState({price: EO.target.value}, this.validateData)   
  };
  instockChanged = (EO) => {
    this.setState({inStock: EO.target.value}, this.validateData)   
  };

  validateData = () => {    
    let itemNameErr = false; 
    let itemNumberErr = false;  
    let itemCategoryErr = false;  
    let priceErr = false;
    let imgUrlErr = false;
    let inStockErr = false;
    let isValid = true;
    
    if(this.state.itemName === '' || typeof(this.state.itemName) !== 'string' || this.state.itemName.length < 5) {
      itemNameErr = 'Please, fill this field - string, min length - 5 chars';
      isValid = false;
    };
    let itemNum = Number(this.state.itemNumber);
    if( this.state.cardName === 'Add new item' && (itemNum === 0 || this.state.itemNumber.length < 3 || this.state.existingNumbers.indexOf(itemNum) !== -1 || isNaN(itemNum)) ) {
      if(this.state.existingNumbers.indexOf(itemNum) !== -1) 
        itemNumberErr = 'This article already exists';
      else 
        itemNumberErr = 'Please, fill this field - number, min length - 3 chars';
      isValid = false;
    };
    if(this.state.itemCategory === '' || this.state.existingCategories.indexOf(this.state.itemCategory) === -1) {
      itemCategoryErr = `Please, fill this field - choose existing category: ${this.state.existingCategories.join(', ')}`;
      isValid = false;
    };
    if(this.state.price === 0 || this.state.price === '' || isNaN(Number(this.state.price)) || this.state.price.length > 4) {
      priceErr = 'Please, fill this field - number, max price - 9999';
      isValid = false;
    };
    if(this.state.inStock === '' || isNaN(Number(this.state.inStock)) || Number(this.state.inStock) > 2000) {
      inStockErr = 'Please, fill this field - number, max stock availiable - 2000';
      isValid = false;
    };

    this.setState({itemNameErr: itemNameErr, itemNumberErr: itemNumberErr, itemCategoryErr: itemCategoryErr, priceErr: priceErr, imgUrlErr: imgUrlErr, inStockErr: inStockErr, isValid: isValid}, this.props.cbIsInEditingProcess(true));
  };

  cancelEditing = (EO) => {
    this.props.cbCancelEditing();
    this.setState({itemNameErr: false, itemNumberErr: false, itemCategoryErr: false, priceErr: false, imgUrlErr: false, inStockErr: false});
  };

  saveEditing = () => {
    let filledItemData = {
      itemName: this.state.itemName,
      itemNumber: Number(this.state.itemNumber),
      itemCategory: this.state.itemCategory,
      price: Number(this.state.price),
      imgUrl: this.state.imgUrl,
      inStock: Number(this.state.inStock),
    }
    this.props.cbSaveEditing(this.state.cardName, filledItemData);
  };

  componentDidUpdate(oldProps, oldState) {
    if(oldProps.chosenItemData.itemNumber !== this.props.chosenItemData.itemNumber || (oldProps.chosenItemData.itemNumber === this.props.chosenItemData.itemNumber && oldProps.isEditable !== this.props.isEditable)) {
      let existingCategories = [];
      this.props.existingGoods.forEach(value => {
        if(existingCategories.indexOf(value.itemCategory) === -1)
        existingCategories.push(value.itemCategory);
      });
      
      let existingNumbers = [];
      this.props.existingGoods.forEach(value => {
        if(existingNumbers.indexOf(value.itemNumber) === -1)
        existingNumbers.push(value.itemNumber);
      });

      this.setState({
        cardName: (this.props.isNewItem ? 'Add new item' : (this.props.isEditable ? 'Edit existing item' : this.props.chosenItemData.itemName)),
        isValid: !this.props.isNewItem,      
        existingCategories: existingCategories, 
        existingNumbers: existingNumbers,

        itemName: this.props.chosenItemData.itemName,   
        itemNumber: this.props.chosenItemData.itemNumber,
        itemCategory: this.props.chosenItemData.itemCategory,
        price: this.props.chosenItemData.price,
        imgUrl: this.props.chosenItemData.imgUrl,
        inStock: this.props.chosenItemData.inStock,
      });
    }
  };
  

  render () {
    if(this.state.itemName === this.state.cardName) {
      return(
        <div className = 'ItemCardBlock'>
          <h3>{this.state.itemName}</h3>
          <p>{`Article: ${this.state.itemNumber}`}</p>
          <p>{`Category: ${this.state.itemCategory}`}</p>
          <p>{`Price: ${this.state.price}`}</p>
          <p>{`In stock: ${this.state.inStock}`}</p>
          <p>{`imgUrl:`}</p> 
          <img src = {this.state.imgUrl}/>       
        </div>
      )
    }
    else {
      return(
        <div className = 'ItemCardBlock'>
          <h3>{this.state.cardName}</h3>
          {
            this.state.cardName === 'Add new item' 
            ?<p><label>Article: 
              <input type = 'text' name = 'Article' value = {this.state.itemNumber || ''} onChange = {this.numberChanged}/>
              </label>
              {
                this.state.itemNumberErr&&
                <span>{this.state.itemNumberErr}</span>
              }
          </p>
            :
            <p>{`Article: ${this.state.itemNumber}`}</p>
          }
          <p><label>Name: 
            <input type = 'text' name = 'Name' value = {this.state.itemName || ''} onChange = {this.nameChanged}/>
            </label>
            {
              this.state.itemNameErr&&
              <span>{this.state.itemNameErr}</span>
            }
          </p>
          <p><label>Category: 
            <input type = 'text' name = 'Category' value = {this.state.itemCategory || ''} onChange = {this.categoryChanged}/>
            </label>
            {
              this.state.itemCategoryErr&&
              <span>{this.state.itemCategoryErr}</span>
            }
          </p>
          <p><label>Price: 
            <input type = 'text' name = 'Price' value = {this.state.price || ''} onChange = {this.priceChanged}/>
            </label>
            {
              this.state.priceErr&&
              <span>{this.state.priceErr}</span>
            }
          </p>
          <p><label>In stock: 
            <input type = 'text' name = 'In stock' value = {this.state.inStock || ''} onChange = {this.instockChanged}/>
            </label>
            {
              this.state.inStockErr&&
              <span>{this.state.inStockErr}</span>
            }
          </p>
          <input type = 'button' value = {this.state.cardName === 'Add new item' ? 'Add' : 'Save'} onClick = {this.saveEditing} disabled = {!this.state.isValid}/>  
          <input type = 'button' value = 'Cancel' onClick = {this.cancelEditing}/>  
        </div>
      )
    };   
  };
};

export default ItemCardBlock;