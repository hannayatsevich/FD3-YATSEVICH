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
    initFilterState: React.PropTypes.string,//начальное состояние фильтра
  },

  getInitialState: function() {
    return {
      checkboxState: this.props.initCheckboxState || false,//состояние чекбокса, если не передано, то false
      filterState: this.props.initFilterState ||'',//текст в текстовом поле, если не передан, то ''
      itemNamesFilteredSortedArr: [],//текущий отфильтрованный и отсортированный массив
    }
  },

  getItemNamesFilteredSortedArr: function(isSorted, filterText) {
    let arrFilteredSorted = this.props.itemNamesForFilter;
    if (filterText)
      arrFilteredSorted = arrFilteredSorted.filter(value => {
          return value.itemName.toLowerCase().indexOf(filterText) !== -1;
        }
      );
    if (isSorted)
      arrFilteredSorted = JSON.parse(JSON.stringify(arrFilteredSorted)).sort(this.sortItemsNames);
    //this.setState( {itemNamesFilteredSortedArr: arrFilteredSorted});
    this.setState( {checkboxState: isSorted, filterState: filterText, itemNamesFilteredSortedArr: arrFilteredSorted});
  },

  sortItemsNames: function(a, b) {
    if(a.itemName < b.itemName) return -1;
    if(a.itemName > b.itemName) return 1;
    return 0;
  },

  changeCheckboxState: function(EO) {
    //this.setState({checkboxState: EO.target.checked}, this.getItemNamesFilteredSortedArr(this.state.checkboxState, this.state.filterState));
    this.getItemNamesFilteredSortedArr(EO.target.checked, this.state.filterState);
  },

  textInputChanged: function(EO) {
    //this.setState( {filterState: EO.target.value}, this.getItemNamesFilteredSortedArr(this.state.checkboxState, this.state.filterState));
    this.getItemNamesFilteredSortedArr(this.state.checkboxState, EO.target.value.toString())
  },

  clearChexboxAndTextInput: function() {
    //this.setState( {checkboxState: false, filterState: ''}, this.getItemNamesFilteredSortedArr(this.state.checkboxState, this.state.filterState));
    this.getItemNamesFilteredSortedArr(false, '')
  },

  componentDidMount: function() {
    this.getItemNamesFilteredSortedArr(this.state.checkboxState, this.state.filterState);
  },

  render: function() {
    let optionsArray = this.state.itemNamesFilteredSortedArr.map(value => {
        return React.DOM.option({key: value.itemNumber}, value.itemName)
      }
    );

    return React.DOM.div({className: 'FilterBlock'},
      React.DOM.div({className: 'SearchBlock'}, 
        React.DOM.input({type: 'checkbox', checked: this.state.checkboxState, onChange: this.changeCheckboxState}),
        React.DOM.input({type: 'text', value: this.state.filterState, onChange: this.textInputChanged}),
        React.DOM.input({type: 'button', value: 'clear', onClick: this.clearChexboxAndTextInput}),
      ),
      React.DOM.select({className: 'SelectBlock', multiple: true}, optionsArray),      
    )
  },

})