'use strict';

class Scales {
  productsOnScales:Array<Product> = [];

  add(product:Product):void{
    this.productsOnScales.push(product);
  };
  getSumScale():number{
    let sumScale:number = 0;
    /*for(let i:number = 0; i < this.productsOnScales.length; i++){
      sumScale += this.productsOnScales[i].getScale();
    };*/
    this.productsOnScales.forEach((product:Product) => sumScale += product.getScale())
    return sumScale;
  };
  getNameList():Array<string>{
    /*let nameList:Array<string> = [];
    for(let i:number = 0; i < this.productsOnScales.length; i++){
      nameList.push(this.productsOnScales[i].getName());
    };
    return nameList;*/
    return this.productsOnScales.map((product:Product) => product.getName())
  };
};

class Product {
  weight:number;
  name:string;
  static numOfProducts:number = 0;//кол-во созданных продуктов
  constructor(name:string, weight:number){
    this.weight = weight;
    this.name = name;
  };
  getScale():number{
    return this.weight;
  }
  getName():string{
    return this.name;
  }
};

class Apple extends Product {
  constructor(name:string, weight:number){
    super(name, weight);
    Product.numOfProducts +=1;
  };
};
class Tomato extends Product {
  constructor(name:string, weight:number){
    super(name, weight);
    Product.numOfProducts +=1;
  };
};
class Blueberies extends Product {
  constructor(name:string, weight:number){
    super(name, weight);
    Product.numOfProducts +=1;
  };
};

let shopScales = new Scales();

let appleGreen = new Apple ('Apple Green', 100);
let appleRed = new Apple ('Apple Red', 200);
let appleYellow = new Apple ('Apple Yellow', 300);

let tomatoRed = new Tomato('Tomato Red', 1000);
let tomatoGreen = new Tomato('Tomato Green', 500);
let tomatoBlack = new Tomato('Tomato Black', 300);

let blueberies = new Blueberies('Blueberies', 200);

shopScales.add(appleGreen);
shopScales.add(appleRed);
shopScales.add(appleYellow);
shopScales.add(tomatoRed);
shopScales.add(tomatoGreen);
shopScales.add(tomatoBlack);
shopScales.add(blueberies);

console.log(shopScales.getNameList());
console.log(shopScales.getSumScale());
console.log(`Number of products created: ${Product.numOfProducts}`);