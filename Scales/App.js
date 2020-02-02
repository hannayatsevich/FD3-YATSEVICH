'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Scales = /** @class */ (function () {
    function Scales() {
        this.productsOnScales = [];
    }
    Scales.prototype.add = function (product) {
        this.productsOnScales.push(product);
    };
    ;
    Scales.prototype.getSumScale = function () {
        var sumScale = 0;
        /*for(let i:number = 0; i < this.productsOnScales.length; i++){
          sumScale += this.productsOnScales[i].getScale();
        };*/
        this.productsOnScales.forEach(function (product) { return sumScale += product.getScale(); });
        return sumScale;
    };
    ;
    Scales.prototype.getNameList = function () {
        /*let nameList:Array<string> = [];
        for(let i:number = 0; i < this.productsOnScales.length; i++){
          nameList.push(this.productsOnScales[i].getName());
        };
        return nameList;*/
        return this.productsOnScales.map(function (product) { return product.getName(); });
    };
    ;
    return Scales;
}());
;
var Product = /** @class */ (function () {
    function Product(name, weight) {
        this.weight = weight;
        this.name = name;
    }
    ;
    Product.prototype.getScale = function () {
        return this.weight;
    };
    Product.prototype.getName = function () {
        return this.name;
    };
    Product.numOfProducts = 0; //кол-во созданных продуктов
    return Product;
}());
;
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple(name, weight) {
        var _this = _super.call(this, name, weight) || this;
        Product.numOfProducts += 1;
        return _this;
    }
    ;
    return Apple;
}(Product));
;
var Tomato = /** @class */ (function (_super) {
    __extends(Tomato, _super);
    function Tomato(name, weight) {
        var _this = _super.call(this, name, weight) || this;
        Product.numOfProducts += 1;
        return _this;
    }
    ;
    return Tomato;
}(Product));
;
var Blueberies = /** @class */ (function (_super) {
    __extends(Blueberies, _super);
    function Blueberies(name, weight) {
        var _this = _super.call(this, name, weight) || this;
        Product.numOfProducts += 1;
        return _this;
    }
    ;
    return Blueberies;
}(Product));
;
var shopScales = new Scales();
var appleGreen = new Apple('Apple Green', 100);
var appleRed = new Apple('Apple Red', 200);
var appleYellow = new Apple('Apple Yellow', 300);
var tomatoRed = new Tomato('Tomato Red', 1000);
var tomatoGreen = new Tomato('Tomato Green', 500);
var tomatoBlack = new Tomato('Tomato Black', 300);
var blueberies = new Blueberies('Blueberies', 200);
shopScales.add(appleGreen);
shopScales.add(appleRed);
shopScales.add(appleYellow);
shopScales.add(tomatoRed);
shopScales.add(tomatoGreen);
shopScales.add(tomatoBlack);
shopScales.add(blueberies);
console.log(shopScales.getNameList());
console.log(shopScales.getSumScale());
console.log("Number of products created: " + Product.numOfProducts);
//# sourceMappingURL=App.js.map