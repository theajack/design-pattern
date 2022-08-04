/*
 * @Author: tackchen
 * @Date: 2022-08-03 22:07:51
 * @Description: 工厂模式
 *
工厂模式（Factory Pattern）是 Java 中最常用的设计模式之一。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。
在工厂模式中，我们在创建对象时不会对客户端暴露创建逻辑，并且是通过使用一个共同的接口来指向新创建的对象。
 */
import {Shape, IShape} from '../type.d';

export class Rectangle implements IShape {
  draw () {
    console.log('Rectangle draw');
  }
}

export class Square implements IShape {
  draw () {
    console.log('Square draw');
  }
}

export function shapeFactory (type: 'rectangle' | 'square'): IShape {
  if (type === 'rectangle') {
    return new Rectangle();
  } else if (type === 'square') {
    return new Square();
  }
  return new Shape();
}

shapeFactory('rectangle').draw();
shapeFactory('square').draw();