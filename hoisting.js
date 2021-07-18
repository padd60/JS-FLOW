console.log(a());
console.log(b());
console.log(c());

function a() {
  return "a";
}
var b = function bb() {
  return "bb";
};
var c = function () {
  return "c";
};

// 위 코드가 호이스팅되어 실행되면

function a() {
  return "a";
}
var b;
var c;
console.log(a());
console.log(b());
console.log(c());

b = function bb() {
  return "bb";
};
c = function () {
  return "c";
};
