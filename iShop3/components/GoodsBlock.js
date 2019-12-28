'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import './GoodsBlock.css';
import ItemBlock from './ItemBlock';
import ItemCardBlock from './ItemCardBlock';

class GoodsBlock extends React.Component {
  static propTypes = {
    shop: PropTypes.string.isRequired,
    goods: PropTypes.arrayOf(
      PropTypes.shape({
        itemName: PropTypes.string.isRequired,
        itemNumber: PropTypes.number.isRequired,
        itemCategory: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        imgUrl: PropTypes.string.isRequired,
        inStock: PropTypes.number.isRequired,
      }),
    ).isRequired,
    tablehead: PropTypes.arrayOf(PropTypes.string).isRequired,
  };  

  constructor (props) {
    super(props);
    this.state = {
      goodsForRender: props.goods,
      chosenItem: null,
      defChosenItemData: {"itemName": "", "itemNumber": 0, "itemCategory": "", "price": 0, "imgUrl": "img/Question.jpg", "inStock": 0},
      chosenItemData: {},
      isNewItem: false,
      isEditable: false,
      isValid: false,
      isChanged: false,
    };
  };
  
  deleteItem = (iNumber) => {
    let newGoodsForRender = this.state.goodsForRender.filter(value => {return value.itemNumber !== iNumber});
    this.setState({goodsForRender: newGoodsForRender, chosenItem: null, chosenItemData: null});
  }; 
  
  chooseItem = (iNumber, editable = false) => {
    if (iNumber !== this.state.chosenItem || editable) {
      let saveChosenItem = this.state.goodsForRender.filter(v => {
        return v.itemNumber === iNumber;
      });
      this.setState({chosenItem: iNumber, chosenItemData: saveChosenItem[0], isEditable: editable});
    }      
    else this.setState({chosenItem: null, chosenItemData: {}, isEditable: editable});
  };

  isInEditingProcess = (flag) => {
    this.setState({isChanged: flag});
  };

  createNewItem = () => {
    this.setState( (currentState) => ({isNewItem: true, chosenItemData: currentState.defChosenItemData, chosenItem: null}));
  };

  cancelEditing = () =>{
    this.setState({isEditable: false, isNewItem: false, isChanged: false});
  };

  saveEditing = (mode, savedItem) => {
    //при нажатии кнопки сохранить в режиме создания нового/редактирования существующего товара 
    //сохранение происходит в зависимости от режима карточки
    if(mode === 'Add new item') {
      let newGoodsForRender = this.state.goodsForRender;
      newGoodsForRender.push(savedItem);
      this.setState({goodsForRender: newGoodsForRender, isNewItem: false, isChanged: false});
    }
    else {
      let newGoodsForRender = this.state.goodsForRender.map( value => {
        if(value.itemNumber !== savedItem.itemNumber)
          return value;
        else
          return savedItem;      
      });
      this.setState({goodsForRender: newGoodsForRender, isEditable: false, isChanged: false});
    };
  };

  render() {
    let tableStructure = [];/*записываются thead и tbody*/  
    let tableHeadRow = this.props.tablehead.map((value, index) => {/*записываются ячейки thead*/
      return (<td key = {value} className = {`TableData ${index + 1}`}>{value}</td>);
    });
    tableStructure.push(
      <thead key = 'thead' className ='TableHead'>
        <tr>{tableHeadRow}</tr>
      </thead>
    );
    let tableBodyRows = this.state.goodsForRender.map(value => /*записываются строки tbody*/
      <ItemBlock
        key = {value.itemNumber}
        itemName = {value.itemName}
        itemNumber = {value.itemNumber}
        itemCategory = {value.itemCategory}
        price = {value.price}
        imgUrl = {value.imgUrl}
        inStock = {value.inStock}
        cbDeleteItem = {this.deleteItem}
        cbEditItem = {this.editItem}
        cbChooseItem = {this.chooseItem}
        highlightedItem = {this.state.chosenItem}
        isNewItem = {this.state.isNewItem}
        isEditable = {this.state.isEditable}
        isChanged = {this.state.isChanged}
      />
    );
    tableStructure.push(
      <tbody key = 'tbody' className = 'TableBody'>{tableBodyRows}</tbody> 
    );
    return (      
      <div className = 'IShop'>
        <div className = 'ShopName'> {this.props.shop}</div>
        <table className = {(this.state.chosenItem || this.state.isNewItem || this.state.isEditable) ? 'GoodsTableEditMode':'GoodsTable'}>{tableStructure}</table>
        {
          (this.state.chosenItem || this.state.isNewItem || this.state.isEditable)&&
            <ItemCardBlock 
              isNewItem = {this.state.isNewItem}
              isEditable = {this.state.isEditable}
              chosenItemData = {this.state.chosenItemData}/*либо данные выделенного/редактируемого товара, либо хэш с пустыми значениями для нового товара*/
              cbChosenItemDataChanged = {this.chosenItemDataChanged}
              cbCancelEditing = {this.cancelEditing}
              cbSaveEditing = {this.saveEditing} 
              cbIsInEditingProcess = {this.isInEditingProcess}
              existingGoods = {this.state.goodsForRender}               
            />
        }
        <input type = 'button' value = 'New Item' onClick = {this.createNewItem} disabled = {this.state.isNewItem || this.state.isEditable}/>
      </div>
    );
  };
};

export default GoodsBlock;