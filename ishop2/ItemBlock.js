'use strict'

let ItemBlock = React.createClass({
  displayName: 'ItemBlock',

  propTypes:{
    itemName: React.PropTypes.string.isRequired,
    itemNumber: React.PropTypes.number.isRequired,
    itemCategory: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
    imgUrl: React.PropTypes.string.isRequired,
    inStock: React.PropTypes.number.isRequired,
    cbDeleteItem: React.PropTypes.func.isRequired,
    cbChooseItem:React.PropTypes.func.isRequired,
    chosenItem: React.PropTypes.number,
  },

  itemForDelete: function(EO) {
    EO.stopPropagation();
    let deleteAnswer = confirm(`Do you want to delete article ${this.props.itemNumber} ${this.props.itemName}?`);
    if (deleteAnswer)
      this.props.cbDeleteItem(this.props.itemNumber);
  },

  chooseItem: function(EO) {
    this.props.cbChooseItem(this.props.itemNumber);
  },

  render: function() {  
    return React.DOM.tr({className: (this.props.highlightedItem !== this.props.itemNumber) ? 'ItemBlock' : 'ItemBlockSelected', onClick: this.chooseItem},
      React.DOM.td(null, this.props.itemName),//col 1
      React.DOM.td(null, this.props.itemNumber),//col 2
      React.DOM.td(null, this.props.itemCategory),//col 3
      React.DOM.td(null, this.props.price),//col 4
      React.DOM.td(null, this.props.inStock),//col 5
      React.DOM.td(null,//col 6
        React.DOM.img({className: 'ItemImg', src: this.props.imgUrl})
      ),
      React.DOM.td({className: 'DeleteBtn'}, //col 7
        React.DOM.input({type: 'button', value: 'Delete', onClick: this.itemForDelete})
      ),
    );    
  },
})