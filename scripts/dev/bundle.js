var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/type.d.ts
var Shape = class {
};

// src/creational/factory-pattern.ts
var Rectangle = class {
  draw() {
    console.log("Rectangle draw");
  }
};
var Square = class {
  draw() {
    console.log("Square draw");
  }
};
function shapeFactory(type) {
  if (type === "rectangle") {
    return new Rectangle();
  } else if (type === "square") {
    return new Square();
  }
  return new Shape();
}
shapeFactory("rectangle").draw();
shapeFactory("square").draw();

// src/creational/abstract-factory-pattern.ts
var Red = class {
  fill() {
    console.log("Red fill");
  }
};
var Green = class {
  fill() {
    console.log("Green fill");
  }
};
function colorFactory(type) {
  if (type === "red") {
    return new Red();
  } else if (type === "green") {
    return new Green();
  }
  throw new Error("Invalid color type: " + type);
}
function getFactory(type) {
  if (type === "shape") {
    return shapeFactory;
  } else if (type === "color") {
    return colorFactory;
  } else {
    throw new Error("Invalid type: " + type);
  }
}
getFactory("shape")("rectangle").draw();
getFactory("color")("red").fill();

// src/creational/singleton-patten.ts
var SingleObject = class {
  static getInstance() {
    return new SingleObject();
  }
  constructor() {
    if (SingleObject.instance) {
      return SingleObject.instance;
    }
    SingleObject.instance = this;
  }
};
console.log("Singleton Pattern");
console.log(new SingleObject() === new SingleObject());
console.log(new SingleObject() === SingleObject.getInstance());
var _SingleObject2 = class {
  static getInstance() {
    return __async(this, null, function* () {
      console.log(_SingleObject2.instance, _SingleObject2.isCreateing);
      if (!_SingleObject2.instance) {
        return new Promise((resolve) => {
          if (!_SingleObject2.isCreateing) {
            _SingleObject2.isCreateing = true;
            new _SingleObject2((instance) => {
              _SingleObject2.instance = instance;
              _SingleObject2.isCreateing = false;
              _SingleObject2.listeners.forEach((fn) => fn(instance));
              resolve(instance);
            });
          } else {
            console.warn("SingleObject2 asynchronously created");
            _SingleObject2.listeners.push(resolve);
          }
        });
      }
      return _SingleObject2.instance;
    });
  }
  constructor(onCreated) {
    setTimeout(() => {
      this.propA = "a";
      onCreated(this);
    }, 100);
  }
};
var SingleObject2 = _SingleObject2;
SingleObject2.isCreateing = false;
SingleObject2.listeners = [];
(() => __async(void 0, null, function* () {
  console.log();
  let prevValue;
  const handler = (o) => {
    if (!prevValue) {
      prevValue = o;
    } else {
      console.log("SingleObject2 then equal: ", prevValue === o);
    }
  };
  console.log(SingleObject2.getInstance().then(handler));
  console.log(SingleObject2.getInstance().then(handler));
  console.log("SingleObject2 await equal: ", (yield SingleObject2.getInstance()) === (yield SingleObject2.getInstance()));
}))();
var _SingleObject3 = class {
  static getInstance() {
    return _SingleObject3.instance;
  }
  constructor() {
    return _SingleObject3.getInstance();
  }
};
var SingleObject3 = _SingleObject3;
SingleObject3.instance = new _SingleObject3();
console.log();
console.log("Singleton Pattern3");
console.log(new SingleObject3() === new SingleObject3());
console.log(new SingleObject3() === SingleObject3.getInstance());
//# sourceMappingURL=bundle.js.map
