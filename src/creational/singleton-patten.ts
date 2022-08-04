/*
 * @Author: tackchen
 * @Date: 2022-08-03 22:38:21
 * @Description: Coding something
单例模式（Singleton Pattern）是 Java 中最简单的设计模式之一。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。

这种模式涉及到一个单一的类，该类负责创建自己的对象，同时确保只有单个对象被创建。这个类提供了一种访问其唯一的对象的方式，可以直接访问，不需要实例化该类的对象。
 */

// 1. 懒汉式 不支持多线程

export class SingleObject {
  private static instance: SingleObject;
  static getInstance (): SingleObject {
    return new SingleObject();
  }
  constructor () {
    if (SingleObject.instance) {
      return SingleObject.instance;
    }
    SingleObject.instance = this;
  }
}

console.log('Singleton Pattern');
console.log(new SingleObject() === new SingleObject());
console.log(new SingleObject() === SingleObject.getInstance());

// 2. 懒汉式 线程安全
// 虽然js没有多线程 这里使用异步模拟

export class SingleObject2 {
  private static isCreateing = false;
  private static listeners: Function[] = [];
  private static instance: SingleObject2;
  propA: string;
  static async getInstance (): Promise<SingleObject2> {
    console.log(SingleObject2.instance, SingleObject2.isCreateing);
    if (!SingleObject2.instance) {
      return new Promise(resolve => {
        if (!SingleObject2.isCreateing) {
          SingleObject2.isCreateing = true;
          new SingleObject2((instance: SingleObject2) => {
            SingleObject2.instance = instance;
            SingleObject2.isCreateing = false;
            SingleObject2.listeners.forEach(fn => fn(instance));
            resolve(instance);
          });
        } else {
          console.warn('SingleObject2 asynchronously created');
          SingleObject2.listeners.push(resolve);
        }
      });
    }
    return SingleObject2.instance;
  }
  private constructor (onCreated: Function) {
    // do something asynchronously
    setTimeout(() => { // 模拟异步任务
      this.propA = 'a';
      onCreated(this);
    }, 100);
  }
}

(async () => {
  console.log();
  let prevValue: SingleObject2;
  const handler = (o: SingleObject2) => {
    if (!prevValue) {
      prevValue = o;
    } else {
      console.log('SingleObject2 then equal: ', prevValue === o);
    }
  };
  console.log(SingleObject2.getInstance().then(handler));
  console.log(SingleObject2.getInstance().then(handler));
  console.log('SingleObject2 await equal: ', await SingleObject2.getInstance() === await SingleObject2.getInstance());
})();

// 3. 饿汉式 容易产生垃圾对象

export class SingleObject3 {
  private static instance: SingleObject3 = new SingleObject3();
  static getInstance (): SingleObject3 {
    return SingleObject3.instance;
  }
  constructor () {
    return SingleObject3.getInstance();
  }
}

console.log();
console.log('Singleton Pattern3');
console.log(new SingleObject3() === new SingleObject3());
console.log(new SingleObject3() === SingleObject3.getInstance());