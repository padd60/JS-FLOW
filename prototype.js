function Person(n, a) {
  this.name = n;
  this.age = a;
}

var man = new Person("상남자", 27);
var woman = new Person("연예인", 25);

man.setOlder = function () {
  this.age += 1;
};

man.getAge = function () {
  return this.age;
};

woman.setOlder = function () {
  this.age += 1;
};

woman.getAge = function () {
  return this.age;
};

//-------------------------------------------

function Person(n, a) {
  this.name = n;
  this.age = a;
}

Person.prototype.setOlder = function () {
  this.age += 1;
};

Person.prototype.getAge = function () {
  return this.age;
};

var man = new Person("상남자", 27);
var woman = new Person("연예인", 25);

Person.prototype.age = 100;

man.__proto__.setOlder();
man.__proto__.getAge();
// 101

man.setOlder();
man.getAge();
// 28

//------------------------------------------

// prototype은 객체이다.
// array.prototype에 원하는 method가 없으면
// array 자체가 Object에서 new로 생성된 객체이므로
// Object로 올라가 Object.prototype에서 method를 반환한다.
// 위를 prototypechaining이라고 한다.

// Object를 method로 사용하려고 하면 오류발생
// 중간단계가 없어 prototypechaning이 없음
// 따라서 함수를 지정해서 사용해야함.

var arr = [1, 2, 3];

console.log(arr.toString());
// 1,2,3

var arr = [1, 2, 3];

arr.toString = function () {
  return this.join("_");
};

console.log(arr.toString());
// 1_2_3

console.log(arr.__proto__.toString.call(arr));
// 1,2,3

console.log(arr.__proto__.__proto__.toString());
// [object Array]

var arr = [1, 2, 3];

Array.prototype.toString = function () {
  return "[" + this.join(", ") + "]";
};

console.log(arr.toString());
// [1, 2, 3]

console.log(arr.__proto__.toString.call(arr));
// [1, 2, 3]

console.log(arr.__proto__.__proto__.toString());
// [object Array]
