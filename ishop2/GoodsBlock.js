'use strict'

let GoodsBlock = React.createClass({
  displayName: 'GoodsBlock',

  propTypes:{
    shop: React.PropTypes.string.isRequired,
    goods: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        itemName: React.PropTypes.string.isRequired,
        itemNumber: React.PropTypes.number.isRequired,
        itemCategory: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        imgUrl: React.PropTypes.string.isRequired,
        inStock: React.PropTypes.number.isRequired,
      }),
    ).isRequired,
    tablehead: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  },

  getInitialState: function() {
    return {
      goodsForRender: this.props.goods,
      chosenItem: null,
    }
  },

  deleteItem: function(iNumber) {
    let newGoodsForRender = this.state.goodsForRender.filter(value => {return value.itemNumber !== iNumber});
    this.setState({goodsForRender: newGoodsForRender});
  },

  chooseItem: function (iNumber) {
    if (iNumber !== this.state.chosenItem)
      this.setState({chosenItem: iNumber});
    else this.setState({chosenItem: null});
  },

  render: function() {
    let tableStructure = [];//записываются thead и tbody
    let tableHeadRow = this.props.tablehead.map((value, index) => {//записываются ячейки thead
      return React.DOM.td({key: value, className: `TableData${index + 1}`}, value);
    });
    tableStructure.push(
      React.DOM.thead({key: 'thead', className: 'TableHead'},
        React.DOM.tr(null, tableHeadRow)
      )
    );
    let tableBodyRows = this.state.goodsForRender.map(value => {//записываются строки tbody
      return React.createElement(ItemBlock, 
        {key: value.itemNumber,
        itemName: value.itemName,
        itemNumber: value.itemNumber,
        itemCategory: value.itemCategory,
        price: value.price,
        imgUrl: value.imgUrl,
        inStock: value.inStock,
        cbDeleteItem: this.deleteItem,
        cbChooseItem: this.chooseItem,
        highlightedItem: this.state.chosenItem,
        }
      )
    });
    tableStructure.push(
      React.DOM.tbody({key: 'tbody', className: 'TableBody'}, tableBodyRows)
    );

    return React.DOM.div({className: 'IShop'},
      React.DOM.div({className: 'ShopName'}, this.props.shop),
      React.DOM.table({className: 'GoodsTable'}, tableStructure),
    )
  },
})