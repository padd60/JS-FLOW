function a() {
  console.log(this);
}
a();

function b() {
  function c() {
    console.log(this);
  }
  c();
}
b();

var d = {
  e: function () {
    function f() {
      console.log(this);
    }
    f();
  },
};
d.e();

var a = {
  b: function () {
    console.log(this);
  },
};
a.b();

var a = {
  b: {
    c: function () {
      console.log(this);
    },
  },
};
a.b.c();

var a = 10;
var obj = {
  a: 20,
  b: function () {
    console.log(this.a);

    function c() {
      console.log(this.a);
    }
    c();
  },
};
obj.b();

var a = 10;
var obj = {
  a: 20,
  b: function () {
    var self = this;
    console.log(this.a);

    function c() {
      console.log(self.a);
    }
    c();
  },
};
obj.b();

var callback = function () {
  console.dir(this);
};

var obj = {
  a: 1,
  b: function (cb) {
    cb();
  },
};
obj.b(callback);

var callback = function () {
  console.dir(this);
};

var obj = {
  a: 1,
  b: function (cb) {
    cb.call(this);
  },
};
obj.b(callback);

var callback = function () {
  console.dir(this);
};
var obj = {
  a: 1,
};

setTimeout(callback.bind(obj), 100);

function Person(n, a) {
  this.name = n;
  this.age = a;
}
var human = new Person("사람임", 27);
console.log(human);
