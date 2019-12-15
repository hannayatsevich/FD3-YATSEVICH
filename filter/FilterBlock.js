'use strict'

let FilterBlock = React.createClass({
  displayName: 'FilterBlock',

  propTypes: {
    itemNamesForFilter: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        itemName: React.PropTypes.string,
        itemNumber: React.PropTypes.number,
      })
    ).isRequired,//массив строк для фильтрации
    initCheckboxState: React.PropTypes.bool,//начальное состояние чекбокса
  },

  getInitialState: function() {
    return {
      itemNamesForFilterArr: this.props.itemNamesForFilter,//текущий массив строк
      itemNamesForFilterArrSorted: null,//отсортированный по алфавиту текущий массив строк
      checkboxState: this.props.initCheckboxState || false,//состояние чекбокса, если не передано, то false
      textEntered: '',//текст в текстовом поле
    }
  },

  setSortedArr: function(arr) {
    let sortedArr = JSON.parse(JSON.stringify(arr)).sort(this.sortItemsNames);
    this.setState( {itemNamesForFilterArrSorted: sortedArr});
  },

  sortItemsNames: function(a, b) {
    if(a.itemName < b.itemName) return -1;
    if(a.itemName > b.itemName) return 1;
    return 0;
  },

  changeCheckboxState: function() {
    this.setState( (curState, props) => ({checkboxState: !(curState.checkboxState)}));    
  },

  textInputChanged: function(EO) {
    let arrFiltered = this.props.itemNamesForFilter.filter(
      value => {
        return value.itemName.toLowerCase().indexOf(EO.target.value) !== -1;
      }
    );
    this.setState( {itemNamesForFilterArr: arrFiltered, textEntered: EO.target.value});
    this.setSortedArr(arrFiltered);
  },

  clearChexboxAndTextInput: function() {
    this.setState( {itemNamesForFilterArr: this.props.itemNamesForFilter, checkboxState: this.props.initCheckboxState || false, textEntered: ''});
  },

  componentWillMount: function() {
    if (!this.state.itemNamesForFilterArrSorted) {
      this.setSortedArr(this.state.itemNamesForFilterArr);
    };
  },

  render: function() {
    let renderArray = this.state.checkboxState ? this.state.itemNamesForFilterArrSorted : this.state.itemNamesForFilterArr;

    let optionsArray = renderArray.map(
      value => {
        return React.DOM.option({key: value.itemNumber}, value.itemName)
      }
    );

    return React.DOM.div({className: 'FilterBlock'},
      React.DOM.div({className: 'SearchBlock'}, 
        React.DOM.input({type: 'checkbox', checked: this.state.checkboxState, onChange: this.changeCheckboxState}),
        React.DOM.input({type: 'text', value: this.state.textEntered, onChange: this.textInputChanged}),
        React.DOM.input({type: 'button', value: 'clear', onClick: this.clearChexboxAndTextInput}),
      ),
      React.DOM.select({className: 'SelectBlock', multiple: true}, optionsArray),      
    )
  },

})