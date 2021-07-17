function Person(name, age) {
  this._name = name;
  this._age = age;
}
Person.getInformations = function (instance) {
  return {
    name: instance._name,
    age: instance._age,
  };
};
Person.prototype.getName = function () {
  return this._name;
};
Person.prototype.getAge = function () {
  return this._age;
};

var human = new Person("사람", 27);

console.log(human.getName());
// 사람
console.log(human.getAge());
// 27

console.log(human.getInformations(human));
// 타입에러 발생

console.log(Person.getInformations(human));
// {name: "사람", age: 27}

//--------------------------------------------

// class 상속

function Person(name, age) {
  this.name = name || "이름없음";
  this.age = age || "나이모름";
}
Person.prototype.getName = function () {
  return this.name;
};
Person.prototype.getAge = function () {
  return this.age;
};

function Employee(name, age, position) {
  this.name = name || "이름없음";
  this.age = age || "나이모름";
  this.position = position || "직책모름";
}

Employee.prototype = new Person();
Employee.prototype.constructor = Employee;
Employee.prototype.getPosition = function () {
  return this.position;
};

var human = new Employee("사람", 27, "CEO");
console.dir(human);
/*
Employee
age: 27
name: "사람"
position: "CEO"
__proto__: Person
age: "나이모름"
constructor: ƒ Employee(name, age, position)
getPosition: ƒ ()
name: "이름없음"
__proto__: Object
*/

console.log(human);
// Employee {name: "사람", age: 27, position: "CEO"}

// 브릿지 함수 이용해 중복 프로퍼티 제외하고 상속받기

function Person(name, age) {
  this.name = name || "이름없음";
  this.age = age || "나이모름";
}
Person.prototype.getName = function () {
  return this.name;
};
Person.prototype.getAge = function () {
  return this.age;
};

function Employee(name, age, position) {
  this.name = name || "이름없음";
  this.age = age || "나이모름";
  this.position = position || "직책모름";
}

function Bridge() {}
Bridge.prototype = Person.prototype;
Employee.prototype = new Bridge();
Employee.prototype.constructor = Employee;

Employee.prototype.getPosition = function () {
  return this.position;
};

var human = new Employee("사람", 27, "CEO");
console.dir(human);
/* Employee
age: 27
name: "사람"
position: "CEO"
__proto__: Person
constructor: ƒ Employee(name, age, position)
getPosition: ƒ ()
__proto__: Object
*/

// 위 브릿지 과정을 함수화시켜 적용시킬 수 있음

function Person(name, age) {
  this.name = name || "이름없음";
  this.age = age || "나이모름";
}
Person.prototype.getName = function () {
  return this.name;
};
Person.prototype.getAge = function () {
  return this.age;
};

function Employee(name, age, position) {
  this.name = name || "이름없음";
  this.age = age || "나이모름";
  this.position = position || "직책모름";
}

var extendClass = (function () {
  function Bridge() {}
  return function (Parent, Child) {
    Bridge.prototype = Parent.prototype;
    Child.prototype = new Bridge();
    Child.prototype.constructor = Child;
  };
})();

extendClass(Person, Employee);
Employee.prototype.getPosition = function () {
  return this.position;
};

var human = new Employee("사람", 27, "CEO");
console.dir(human);
/*
Employee
age: 27
name: "사람"
position: "CEO"
__proto__: Person
constructor: ƒ Employee(name, age, position)
getPosition: ƒ ()
__proto__: Object
*/

// ES6에서는 클래스 선언에 위같은 노력이 필요없음
// class 선언 후 extends로 불러오면 끝남
