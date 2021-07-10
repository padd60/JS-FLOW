var cb = function () {
  console.log("1초마다 실행됩니다.");
};

setInterval(cb, 1000);

//  제어권을 setInterval에게 넘겨줌

var arr = [1, 2, 3, 4, 5];
var entries = [];
arr.forEach(
  function (v, i) {
    entries.push([i, v, this[i]]);
  },
  [10, 20, 30, 40, 50]
);
console.log(entries);

// forEach는 function 내부에 순서대로 value와 index값을 가지며
// forEach(callback[, thisArg])와 같이 뒤에 this가 생략되어 있어
// 위와 같이 this에 배열을 추가하여 사용할 수 있다.

document.body.innerHTML = '<div id="a">abc</div>';
function cbFunc(x) {
  console.log(this, x);
}

document.getElementById("a").addEventListener("click", cbFunc);

// target.addEventListener(type, callback, options);
// MDN에 정의된 위 내용과 같이 첫번째 인자는 무조건 이벤트가 온다.

/* 콜백함수
다른 함수(A)의 인자로 콜백함수(B)를 전달하면,
A가 B의 제어권을 갖게 된다.
(특별한 요청이 없는 한 A에 미리 정해놓은 방식에 따라 B를 호출한다.)

> 미리 정해놓은 방식이란,
어떤 시점에 콜백을 호출할지,
인자에는 어떤 값들을 지정할지,
this에 무엇을 바인딩할지 등이다.

*/

// > 주의!
// 콜백은 '함수'다.

var arr = [1, 2, 3, 4, 5];
var obj = {
  vals: [1, 2, 3],
  logvalues: function (v, i) {
    if (this.vals) {
      console.log(this.vals, v, i);
    } else {
      console.log(this, v, i);
    }
  },
};
obj.logvalues(1, 2);
// [1, 2, 3] 1 2
arr.forEach(obj.logvalues);
// 함수로서 넘겨버리기 떄문에 obj가 아니라 전역객체인 window를 참조하게 된다.
arr.forEach(obj.logvalues.bind(obj));
arr.forEach(obj.logvalues, obj);
// 위처럼 bind로 this를 지정해주거나
// forEach에서 생략된 thisArg를 지정해주면
// [1, 2, 3] 1 0
// [1, 2, 3] 2 1
// [1, 2, 3] 3 2
// [1, 2, 3] 4 3
// [1, 2, 3] 5 4
// 위처럼 출력되게 된다.
