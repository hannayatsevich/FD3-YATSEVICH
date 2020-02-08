'use strict';
var Scales = /** @class */ (function () {
    function Scales() {
        this.productsOnScales = []; //либо в конструкторе
    }
    Scales.prototype.add = function (product) {
        this.productsOnScales.push(product);
    };
    ;
    Scales.prototype.getSumScale = function () {
        var sumScale = 0;
        this.productsOnScales.forEach(function (product) { sumScale += product.getScale(); }); //так как стрелочная ф-я ничего не возвращает, а только делает расчет, для читабельности уместно поместить выражение в фигурные скобки
        return sumScale;
    };
    ;
    Scales.prototype.getNameList = function () {
        return this.productsOnScales.map(function (product) { return product.getName(); });
    };
    ;
    return Scales;
}());
;
;
var Apple = /** @class */ (function () {
    function Apple(weight) {
        this.weight = weight;
        //this.weight = weight;
        //Apple.numOfApples++;
        //this.name = 'Apple' + Apple.numOfApples;
        this.name = (Apple.numOfApples++, 'Apple' + Apple.numOfApples);
    }
    ;
    Apple.prototype.getScale = function () {
        return this.weight;
    };
    Apple.prototype.getName = function () {
        return this.name;
    };
    //weight:number;
    Apple.numOfApples = 0;
    return Apple;
}());
;
var Tomato = /** @class */ (function () {
    function Tomato(weight) {
        this.weight = weight;
        this.name = (Tomato.numOfTomatoes++, 'Tomato' + Tomato.numOfTomatoes);
    }
    ;
    Tomato.prototype.getScale = function () {
        return this.weight;
    };
    Tomato.prototype.getName = function () {
        return this.name;
    };
    Tomato.numOfTomatoes = 0;
    return Tomato;
}());
;
var Blueberies = /** @class */ (function () {
    function Blueberies(weight) {
        this.weight = weight;
        this.name = (Blueberies.numOfBlueberies++, 'Blueberies' + Blueberies.numOfBlueberies);
    }
    ;
    Blueberies.prototype.getScale = function () {
        return this.weight;
    };
    Blueberies.prototype.getName = function () {
        return this.name;
    };
    Blueberies.numOfBlueberies = 0;
    return Blueberies;
}());
;
var shopScales = new Scales();
var apple1 = new Apple(100);
var apple2 = new Apple(200);
var apple3 = new Apple(300);
var tomato1 = new Tomato(1000);
var tomato2 = new Tomato(500);
var tomato3 = new Tomato(300);
var blueberies1 = new Blueberies(200);
shopScales.add(apple1);
shopScales.add(apple2);
shopScales.add(apple3);
shopScales.add(tomato1);
shopScales.add(tomato2);
shopScales.add(tomato3);
shopScales.add(blueberies1);
console.log(shopScales.getNameList());
console.log(shopScales.getSumScale());
//# sourceMappingURL=App.js.map