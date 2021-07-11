// 클로저란..?
// A: 실행콘텍스트, B: 함수 서로 콤비가 되어 무언가 한다.
// 콘텍스트 A에서 선언한 변수를 내부함수 B에서 접근할 경우에만
// 발생하는 특수한 현상
// (B의 outerEnvironmentReference는
//  A의 environmentRecord를 참조)

var outer = function () {
  var a = 1;
  var inner = function () {
    console.log(++a);
  };
  inner();
};
outer();

// 실행결과
// 2

var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner;
};
var outer2 = outer();
console.log(outer2());
console.log(outer2());

// 실행결과
// 2
// 3

/* 정리하면
콘텍스트 A에서 선언한 
변수 a를 참조하는 
내부함수 B를 
A의 외부로 전달할 경우, 
A가 종료된 이후에도 
a가 사라지지 않는 현상
*/

// 결국 지역변수가 함수 종료 후에도
// 사라지지 않게 만들 수 있다!

function a() {
  var localA = 1;
  var localB = 2;
  var localC = 3;
  return {
    get a() {
      return localA;
    },
    set a(v) {
      localA = v;
    },
    get b() {
      return localB + localC;
    },
    set b(v) {
      throw Error("read only");
    },
  };
}
var obj = a();

console.log(obj);
// a: 10
// b: 5
console.log(obj.b);
// 5
console.log(obj.a);
// 1
obj.a = 10;
console.log(obj.a);
// 10
obj.b = 10;
// Uncaught Error: read only
