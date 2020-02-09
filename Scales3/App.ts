'use strict';

class Product {
  private static numOfProducts:number = 0;
  constructor(private weight:number, private name?:string) {
    if(!name) {
      //this.name = (Product.numOfProducts++, 'Product' + Product.numOfProducts);
      this.name = 'Product' + (++Product.numOfProducts);
    };    
  };
  getScale():number{
    return this.weight;
  };
  getName():string{
    return this.name;
  };
};

interface IStorageEngine {
  addItem(item:Product):number;//добавить элемент
  getItem(index:number):Product;//получить элемент
  getCount():number;//получить количество элементов
};

class Scales<StorageEngine extends IStorageEngine> {
  constructor(private products:StorageEngine){
  };
  getSumScale():number{
    let sumScale:number = 0;
    let elements:number = this.products.getCount();
    for (let i:number = 0; i < elements; i++) {
      sumScale += this.products.getItem(i).getScale();
    };
    return sumScale;
  };
  getNameList():Array<string>{
    let productNamesArr:Array<string> = [];
    let elements:number = this.products.getCount();
    for (let i:number = 0; i < elements; i++) {
      productNamesArr.push(this.products.getItem(i).getName());
    };
    return productNamesArr;
  };
};

class ScalesStorageEngineArray implements IStorageEngine{
  private products:Array<Product> = [];
  addItem(item:Product):number {
    let index:number = this.products.length;
    this.products.push(item);
    return index;
  };
  getItem(index:number):Product {
    return this.products[index];
  };
  getCount():number {
    return this.products.length;
  };
};

class ScalesStorageEngineLocalStorage implements IStorageEngine {
  constructor(private storageName:string) {
    let arrToSave:string = JSON.stringify([]);
    window.localStorage.setItem(storageName, arrToSave);
  };
  addItem(item:Product):number {
    let storageCheck:string = window.localStorage.getItem(this.storageName);
    if(storageCheck) {
      try {
        let products = JSON.parse(storageCheck);//Array<any>/any
        if(Array.isArray(products)) {
          let productsOfProduct:Array<Product> = [];
          for (let i:number = 0; i < products.length; i++) {
            productsOfProduct.push(new Product(products[i].weight, products[i].name));
          };
          let index:number = productsOfProduct.length;
          productsOfProduct.push(item);
          window.localStorage.setItem(this.storageName, JSON.stringify(productsOfProduct));
          return index;
        }
        else
          throw `В localStorage под именем ${this.storageName} хранится не массив`;        
      }
      catch (error) {
        console.log(`Произошла ошибка, Name: ${error.name}, Message: ${error.message}`);
      };
    };
  };
  getItem(index:number):Product {
    let storageCheck:string = window.localStorage.getItem(this.storageName);
    if(storageCheck) {
      try {
        let products = JSON.parse(storageCheck);
        if(Array.isArray(products)) {
          let productsOfProduct:Array<Product> = [];
          for (let i:number = 0; i < products.length; i++) {
            productsOfProduct.push(new Product(products[i].weight, products[i].name));
          };
          return productsOfProduct[index];
        }
        else
          throw `В localStorage под именем ${this.storageName} хранится не массив`; 
      }
      catch (error) {
        console.log(`Произошла ошибка, Name: ${error.name}, Message: ${error.message}`);
      };
    };    
  };
  getCount():number {
    let storageCheck = window.localStorage.getItem(this.storageName);
    if(storageCheck) {
      try {
        let products = JSON.parse(storageCheck);
        if(Array.isArray(products)) {
          let productsOfProduct:Array<Product> = [];
          for (let i:number = 0; i < products.length; i++) {
            productsOfProduct.push(new Product(products[i].weight, products[i].name));
          };
          return productsOfProduct.length;
        }
        else
          throw `В localStorage под именем ${this.storageName} хранится не массив`;
      }
      catch (error) {
        console.log(`Произошла ошибка, Name: ${error.name}, Message: ${error.message}`);
      };
    };    
  };
};

let product1 = new Product (100);
let product2 = new Product (200);
let product3 = new Product (300);
let product4 = new Product(1000);

let newStorageEngineArray = new ScalesStorageEngineArray();

let product1Index:number = newStorageEngineArray.addItem(product1);
let product2Index:number = newStorageEngineArray.addItem(product2);
let product3Index:number = newStorageEngineArray.addItem(product3);
let product4Index:number = newStorageEngineArray.addItem(product4);

let scalesArr = new Scales<ScalesStorageEngineArray>(newStorageEngineArray);

console.log(scalesArr.getNameList());
console.log(scalesArr.getSumScale());

let product5 = new Product(500);
let product6 = new Product(300);
let product7 = new Product(200);
let product8 = new Product(1000);

let newStorageEngineLocalStorage = new ScalesStorageEngineLocalStorage('Products 5-8');

let product5Index:number = newStorageEngineLocalStorage.addItem(product5);
let product6Index:number = newStorageEngineLocalStorage.addItem(product6);
let product7Index:number = newStorageEngineLocalStorage.addItem(product7);
let product8Index:number = newStorageEngineLocalStorage.addItem(product8);

let scalesLocStorage = new Scales<ScalesStorageEngineLocalStorage>(newStorageEngineLocalStorage);

console.log(scalesLocStorage.getNameList());
console.log(scalesLocStorage.getSumScale());