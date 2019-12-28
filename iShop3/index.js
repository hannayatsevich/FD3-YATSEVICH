'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import GoodsBlock from './components/GoodsBlock';

let shopName = 'White Moon';
let tableHeadNames = ['Name', 'Article', 'Category', 'Price', 'In stock', 'Image', 'Control'];
import shopGoods from './shopGoods.json';

ReactDOM.render(
  <GoodsBlock 
    shop = {shopName}
    goods = {shopGoods}
    tablehead = {tableHeadNames}
  />,
  document.getElementById('iShopContainer')
);