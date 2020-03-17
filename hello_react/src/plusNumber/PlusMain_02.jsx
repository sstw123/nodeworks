import React, { Component } from "react";

class PlusMain_02 extends Component {
  /*
    props : 부모로부터 받은 변수를 자식이 변경할 수 없다
    state : 부모로부터 받은 변수를 자식이 변경하여 사용할 수 있다
    state 내부변수 : 클래스의 필드 변수 number를 선언하고 0으로 초기화
  */
  state = {
    number: 0
  };

  // 두개의 버튼 클릭 이벤트 핸들러
  // state에 선언 된 변수값을 변경시키고 싶을때
  // this.setState() 메소드 내부에서 변경하는 코드를 작성하면 된다
  // plus 버튼이 클릭되면
  // 원래 number가 가지고 있는 값(this.state.number)에 1을 더해서 number에 저장

  /*
  plus = () => {
    this.setState({
      number: this.state.number + 1
    });
  };
  */

  /*
    js 구조 분해 할당, 비구조화 할당
    배열이나 객체의 속성을 unpack하여 값을 개별 변수에 담아 사용할 수 있도록 하는 JS 새로운 문법(ES6,7)
  */
  plus = () => {
    this.setState(({ number }) => ({ number: number + 1 }));
  };

  /*
  minus = () => {
    this.setState({
      number: this.state.number - 1
    });
  };
  */

  minus = () => {
    this.setState(state => ({ number: state.number - 1 }));
  };

  render() {
    return (
      <div>
        <h1>카운트 : {this.state.number} </h1>
        <button onClick={this.plus}>Plus</button>
        <button onClick={this.minus}>Minus</button>
      </div>
    );
  }
}

export default PlusMain_02;
