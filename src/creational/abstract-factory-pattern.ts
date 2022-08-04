
/*
 * @Author: tackchen
 * @Date: 2022-08-03 22:17:35
 * @Description: Coding something
 *
 * 抽象工厂模式（Abstract Factory Pattern）是围绕一个超级工厂创建其他工厂。该超级工厂又称为其他工厂的工厂。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。
在抽象工厂模式中，接口是负责创建一个相关对象的工厂，不需要显式指定它们的类。每个生成的工厂都能按照工厂模式提供对象。
 */

import {IColor, IShape} from '../type.d';
import {shapeFactory} from './factory-pattern';

export class Circle implements IShape {
  public draw () {
    console.log('Circle draw');
  }
}

export class Red implements IColor {
  fill () {
    console.log('Red fill');
  }
}

export class Green implements IColor {
  fill () {
    console.log('Green fill');
  }
}

function colorFactory (type: 'red' | 'green') {
  if (type === 'red') {
    return new Red();
  } else if (type === 'green') {
    return new Green();
  }
  throw new Error('Invalid color type: ' + type);
}


function getFactory(type: 'shape'): (type: 'rectangle' | 'square')=>IShape;
function getFactory(type: 'color'): (type: 'red' | 'green')=>IColor;
function getFactory (type: 'shape' | 'color') {
  if (type === 'shape') {
    return shapeFactory;
  } else if (type === 'color') {
    return colorFactory;
  } else {
    throw new Error('Invalid type: ' + type);
  }
}

getFactory('shape')('rectangle').draw();

getFactory('color')('red').fill();