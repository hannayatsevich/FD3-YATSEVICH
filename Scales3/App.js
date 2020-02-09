'use strict';
var Product = /** @class */ (function () {
    function Product(weight, name) {
        this.weight = weight;
        this.name = name;
        if (!name) {
            //this.name = (Product.numOfProducts++, 'Product' + Product.numOfProducts);
            this.name = 'Product' + (++Product.numOfProducts);
        }
        ;
    }
    ;
    Product.prototype.getScale = function () {
        return this.weight;
    };
    ;
    Product.prototype.getName = function () {
        return this.name;
    };
    ;
    Product.numOfProducts = 0;
    return Product;
}());
;
;
var Scales = /** @class */ (function () {
    function Scales(products) {
        this.products = products;
    }
    ;
    Scales.prototype.getSumScale = function () {
        var sumScale = 0;
        var elements = this.products.getCount();
        for (var i = 0; i < elements; i++) {
            sumScale += this.products.getItem(i).getScale();
        }
        ;
        return sumScale;
    };
    ;
    Scales.prototype.getNameList = function () {
        var productNamesArr = [];
        var elements = this.products.getCount();
        for (var i = 0; i < elements; i++) {
            productNamesArr.push(this.products.getItem(i).getName());
        }
        ;
        return productNamesArr;
    };
    ;
    return Scales;
}());
;
var ScalesStorageEngineArray = /** @class */ (function () {
    function ScalesStorageEngineArray() {
        this.products = [];
    }
    ScalesStorageEngineArray.prototype.addItem = function (item) {
        var index = this.products.length;
        this.products.push(item);
        return index;
    };
    ;
    ScalesStorageEngineArray.prototype.getItem = function (index) {
        return this.products[index];
    };
    ;
    ScalesStorageEngineArray.prototype.getCount = function () {
        return this.products.length;
    };
    ;
    return ScalesStorageEngineArray;
}());
;
var ScalesStorageEngineLocalStorage = /** @class */ (function () {
    function ScalesStorageEngineLocalStorage(storageName) {
        this.storageName = storageName;
        var arrToSave = JSON.stringify([]);
        window.localStorage.setItem(storageName, arrToSave);
    }
    ;
    ScalesStorageEngineLocalStorage.prototype.addItem = function (item) {
        var storageCheck = window.localStorage.getItem(this.storageName);
        if (storageCheck) {
            try {
                var products = JSON.parse(storageCheck); //Array<any>/any
                if (Array.isArray(products)) {
                    var index = products.length;
                    products.push(item);
                    window.localStorage.setItem(this.storageName, JSON.stringify(products));
                    return index;
                }
                else
                    throw "\u0412 localStorage \u043F\u043E\u0434 \u0438\u043C\u0435\u043D\u0435\u043C " + this.storageName + " \u0445\u0440\u0430\u043D\u0438\u0442\u0441\u044F \u043D\u0435 \u043C\u0430\u0441\u0441\u0438\u0432";
            }
            catch (error) {
                console.log("\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430, Name: " + error.name + ", Message: " + error.message);
            }
            ;
        }
        ;
    };
    ;
    ScalesStorageEngineLocalStorage.prototype.getItem = function (index) {
        var storageCheck = window.localStorage.getItem(this.storageName);
        if (storageCheck) {
            try {
                var products = JSON.parse(storageCheck);
                if (Array.isArray(products)) {
                    return new Product(products[index].weight, products[index].name);
                }
                else
                    throw "\u0412 localStorage \u043F\u043E\u0434 \u0438\u043C\u0435\u043D\u0435\u043C " + this.storageName + " \u0445\u0440\u0430\u043D\u0438\u0442\u0441\u044F \u043D\u0435 \u043C\u0430\u0441\u0441\u0438\u0432";
            }
            catch (error) {
                console.log("\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430, Name: " + error.name + ", Message: " + error.message);
            }
            ;
        }
        ;
    };
    ;
    ScalesStorageEngineLocalStorage.prototype.getCount = function () {
        var storageCheck = window.localStorage.getItem(this.storageName);
        if (storageCheck) {
            try {
                var products = JSON.parse(storageCheck);
                if (Array.isArray(products)) {
                    return products.length;
                }
                else
                    throw "\u0412 localStorage \u043F\u043E\u0434 \u0438\u043C\u0435\u043D\u0435\u043C " + this.storageName + " \u0445\u0440\u0430\u043D\u0438\u0442\u0441\u044F \u043D\u0435 \u043C\u0430\u0441\u0441\u0438\u0432";
            }
            catch (error) {
                console.log("\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430, Name: " + error.name + ", Message: " + error.message);
            }
            ;
        }
        ;
    };
    ;
    return ScalesStorageEngineLocalStorage;
}());
;
var product1 = new Product(100);
var product2 = new Product(200);
var product3 = new Product(300);
var product4 = new Product(1000);
var newStorageEngineArray = new ScalesStorageEngineArray();
var product1Index = newStorageEngineArray.addItem(product1);
var product2Index = newStorageEngineArray.addItem(product2);
var product3Index = newStorageEngineArray.addItem(product3);
var product4Index = newStorageEngineArray.addItem(product4);
var scalesArr = new Scales(newStorageEngineArray);
console.log(scalesArr.getNameList());
console.log(scalesArr.getSumScale());
var product5 = new Product(500);
var product6 = new Product(300);
var product7 = new Product(200);
var product8 = new Product(1000);
var newStorageEngineLocalStorage = new ScalesStorageEngineLocalStorage('Products 5-8');
var product5Index = newStorageEngineLocalStorage.addItem(product5);
var product6Index = newStorageEngineLocalStorage.addItem(product6);
var product7Index = newStorageEngineLocalStorage.addItem(product7);
var product8Index = newStorageEngineLocalStorage.addItem(product8);
var scalesLocStorage = new Scales(newStorageEngineLocalStorage);
console.log(scalesLocStorage.getNameList());
console.log(scalesLocStorage.getSumScale());
//# sourceMappingURL=App.js.map