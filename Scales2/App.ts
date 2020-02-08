'use strict';

class Scales {
  productsOnScales:Array<IScalable> = [];//либо в конструкторе

  add(product:IScalable):void{
    this.productsOnScales.push(product);
  };
  getSumScale():number{
    let sumScale:number = 0;
    this.productsOnScales.forEach((product:IScalable) => {sumScale += product.getScale()})//так как стрелочная ф-я ничего не возвращает, а только делает расчет, для читабельности уместно поместить выражение в фигурные скобки
    return sumScale;
  };
  getNameList():Array<string>{
    return this.productsOnScales.map((product:IScalable) => product.getName())
  };
};

interface IScalable {
  getScale():number;
  getName():string;
};

class Apple implements IScalable {
  //weight:number;
  static numOfApples:number = 0;
  name:string;
  constructor(protected weight:number){
    //this.weight = weight;
    //Apple.numOfApples++;
    //this.name = 'Apple' + Apple.numOfApples;
    this.name = (Apple.numOfApples++, 'Apple' + Apple.numOfApples);
  };
  getScale():number{
    return this.weight;
  }
  getName():string{
    return this.name;
  }
};
class Tomato implements IScalable {
  static numOfTomatoes:number = 0;
  name:string;
  constructor(protected weight:number){
    this.name = (Tomato.numOfTomatoes++, 'Tomato' + Tomato.numOfTomatoes);
  };
  getScale():number{
    return this.weight;
  }
  getName():string{
    return this.name;
  }
};
class Blueberies implements IScalable {
  static numOfBlueberies:number = 0;
  name:string;
  constructor(protected weight:number){
    this.name = (Blueberies.numOfBlueberies++, 'Blueberies' + Blueberies.numOfBlueberies);
  };
  getScale():number{
    return this.weight;
  }
  getName():string{
    return this.name;
  }
};

let shopScales = new Scales();

let apple1 = new Apple (100);
let apple2 = new Apple (200);
let apple3 = new Apple (300);

let tomato1 = new Tomato(1000);
let tomato2 = new Tomato(500);
let tomato3 = new Tomato(300);

let blueberies1 = new Blueberies(200);

shopScales.add(apple1);
shopScales.add(apple2);
shopScales.add(apple3);
shopScales.add(tomato1);
shopScales.add(tomato2);
shopScales.add(tomato3);
shopScales.add(blueberies1);

console.log(shopScales.getNameList());
console.log(shopScales.getSumScale());