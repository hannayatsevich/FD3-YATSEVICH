let shopName = 'White Moon';
let tableHeadNames = ['Name', 'Article', 'Category', 'Price', 'In stock', 'Image'];
let shopGoods = [
  {itemName: 'Tea set', itemNumber: 100, itemCategory: 'Morning drink', price: '150', imgUrl: 'img/Teaset.jpg', inStock: 50},
  {itemName: 'Coffee set', itemNumber: 101, itemCategory: 'Morning drink', price: '150', imgUrl: 'img/Coffeeset.jpg', inStock: 50},
  {itemName: 'Cezve', itemNumber: 102, itemCategory: 'Morning drink', price: '300', imgUrl: 'img/Cezve.jpg', inStock: 30},
  {itemName: 'Teapot', itemNumber: 103, itemCategory: 'Morning drink', price: '300', imgUrl: 'img/Teapot.jpg', inStock: 20},
  {itemName: 'Kettle', itemNumber: 104, itemCategory: 'Morning drink', price: '500', imgUrl: 'img/Kettle.jpg', inStock: 10},
  {itemName: 'Creamer', itemNumber: 105, itemCategory: 'Morning drink', price: '30', imgUrl: 'img/Creamer.jpg', inStock: 20},
  {itemName: 'Sugar bowl', itemNumber: 106, itemCategory: 'Morning drink', price: '50', imgUrl: 'img/Sugarbowl.jpg', inStock: 20},
  {itemName: 'Soup bowl', itemNumber: 200, itemCategory: 'Lunchtime', price: '250', imgUrl: 'img/Soupbowl.jpg', inStock: 50},
  {itemName: 'Salad bowl', itemNumber: 201, itemCategory: 'Lunchtime', price: '150', imgUrl: 'img/Saladbowl.jpg', inStock: 30},
  {itemName: 'Dinner plate', itemNumber: 202, itemCategory: 'Lunchtime', price: '200', imgUrl: 'img/Dinnerplate.jpg', inStock: 100},
 
];

ReactDOM.render(
  React.createElement(GoodsBlock, {shop: shopName, goods: shopGoods, tablehead: tableHeadNames}),
  document.getElementById('iShopContainer')
);