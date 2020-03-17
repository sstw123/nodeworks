import React, { Component } from "react";
import RCC_SUB from "./RCC_SUB";
import "./RCC.css";

/*
- ES6의 class 문법으로 component 생성하기 : rcc 입력 후 컨트롤+스페이스
- 보통 jsx(js) 확장자로 저장
- 가급적 파일의 첫글자, 클래스의 첫글자는 대문자로
- 파일 이름과 클래스 이름 일치시켜주기
- 모든 따옴표는 큰따옴표로 통일
- 문장 끝 세미콜론 필수
- 클래스는 1개의 파일에 1개만 작성할 수 있다
*/
class RCC extends Component {
  render() {
    return (
      <div>
        <div className="myDiv">1번째 RCC 컴포넌트</div>
        <RCC_SUB name="아무이름" />
      </div>
    );
  }
}

// 이 컴포넌트를 외부에서 사용할 수 있도록 선언
// export default는 한 파일에 한 개만 있을 수 있다
export default RCC;
