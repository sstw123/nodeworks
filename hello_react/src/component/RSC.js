import React from "react";
import RSC_SUB from "./RSC_SUB";

/*
함수형 컴포넌트 설정 : rsc
const RSC = function() {}
함수형 컴포넌트는 2014 버전부터 사용 가능

App.js > (RCC.jsx), (RSC.js > RSC_SUB.jsx)

RCS_SUB 컴포넌트의 name 변수에 값을 담기
<Component 변수명="값">
*/
const RSC = () => {
  return (
    <div>
      <div>나는 두번째 함수형 컴포넌트</div>
      <RSC_SUB name="아무이름" />
    </div>
  );
};

export default RSC;
