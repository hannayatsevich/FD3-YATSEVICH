let GoodsBlock = React.createClass({
  displayName: 'GoodsBlock',

  render: function() {
    let tableStructure = [];//записываются thead и tbody
    let tableHeadRow = [];//записываются ячейки thead
    let tableBodyRows = [];//записываются ряды tbody
    this.props.tablehead.forEach((value, index) => {
      let headCell = React.DOM.td({className: `TableData${index + 1}`}, value, );
      tableHeadRow.push(headCell);
    });
    tableStructure.push(
      React.DOM.thead({className: 'TableHead'},
        React.DOM.tr({}, tableHeadRow)
      )
    );
    this.props.goods.forEach(value => {
      let tableRow = React.DOM.tr({key: value.itemNumber, className: 'TableRow'},
        React.DOM.td({}, value.itemName),
        React.DOM.td({}, value.itemNumber),
        React.DOM.td({}, value.itemCategory),
        React.DOM.td({}, value.price),
        React.DOM.td({}, value.inStock),
        React.DOM.td({},
          React.DOM.img({className: 'ItemImg', src: value.imgUrl})
          ),        
      );
      tableBodyRows.push(tableRow);
    });
    tableStructure.push(
      React.DOM.tbody({className: 'TableBody'}, tableBodyRows)
    );

    return React.DOM.div(
      {className: 'IShop'},
      React.DOM.div({className: 'ShopName'}, this.props.shop),
      React.DOM.table({className: 'GoodsTable'}, tableStructure),
    )
  },

})