import React from "react";

/*
함수형 컴포넌트
2014 이후 버전에서 도입되었고,
React 16.x 이후에서 도입된 문법 Hooks라는 개념 탄생
장점 : 부모로부터 변수를 전달받을 때 함수의 매개변수처럼 받을 수 있다

함수에서 this 키워드
일반함수에서는 this 키워드가 함수 자체를 표현하는 객체
화살표함수에서는 this 키워드가 scope 문제가 있다

부모로부터 변수를 전달받을 때 개별적으로 변수를 받을 수 있고
class에서 props에 담겨서 받는 것과 같은 원리로 받을 수 있도록 되었다
*/
const PlusMain_01 = props => {
  return (
    <div>
      <h1>카운트</h1>
      <h3>{props.name}</h3>
      <button>Plus</button>
      <button>Minus</button>
    </div>
  );
};

export default PlusMain_01;
