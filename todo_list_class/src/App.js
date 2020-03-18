import React, { Component } from "react";

// 임의로 작성된 컴포넌트 파일(*.jsx, *.js)을 사용하기 위해
// 먼저 import를 수행한다
import TodoMain from "./Main/TodoMain";
// 현재 폴더 아래의 Main폴더 안에 들어있는 TodoMain.jsx 파일(같은 파일명이 없다면 확장자 생략 가능)을 TodoMain이라는 이름으로 사용하기
// 이렇게 선언하면 render() 함수 내에서 일반 tag와 같은 방식으로 사용할 수 있다

/*
  클래스 type 컴포넌트
  class 키워드로 시작되고
  반드시 Component를 extends(상속)하여 준비
*/
class App extends Component {
  id = 5;
  state = {
    input: "",
    todoList: [
      { id: 0, text: "오늘 할일", checked: false },
      { id: 1, text: "공모전 서류제출", checked: true },
      { id: 2, text: "리액트 폼 작성", checked: false },
      { id: 3, text: "스프링 시큐리티", checked: true },
      { id: 4, text: "네이버 RestTemplate", checked: false }
    ]
  };

  /*
  1. TodoForm input box는 value={input}과 같은 형태가 되고
  {input}은 props 상태로 컴포넌트에 전달되어 readOnly가 된다
  2. 따라서 input box에 onChange 이벤트를 설정하여 키보드에서 입력된 글자를 {input}에 강제로 붙여줘야 한다

  e.target.value : 키보드 입력을 캡춰하는 키보드 이벤트 메시지
  */
  handleChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  // Enter 키를 눌렀을 때 자동으로 추가되도록
  handleKeyPress = e => {
    if (e.key == "Enter") {
      this.handleCreate();
    }
  };

  handleCreate = () => {
    const { input, todoList } = this.state;

    this.setState({
      input: "",
      // 기존 객체(JSON) 배열에 새로운 객체(JSON)를 추가하는 함수
      todoList: todoList.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    });
  };

  handleToggle = id => {
    // 1. this.state에 있는 todoList를 prop으로 만들기
    const { todoList } = this.state;

    // 2. id 매개변수에 담겨있는 값이 객체 배열의 몇번째 인덱스인지 찾고 index 변수에 담아두기
    const index = todoList.findIndex(todo => todo.id === id);

    // 3. todoList에서 인덱스에 해당하는 요소 추출
    const selectTodo = todoList[index];

    // this.setState({
    //   checked: !selectTodo.checked
    // });

    // 4. 기존의 todoList를 tempTodoList에 복사해두기
    const tempTodoList = [...todoList];

    // 5. 기존의 checked 값이 true->false, false->true 반전
    tempTodoList[index] = { ...selectTodo, checked: !selectTodo.checked };
    // 여기까지 1개 아이템의 checked 값을 변경시키는 코드

    // 여기서부터 render()를 호출해서 화면에 반영
    this.setState({
      todoList: tempTodoList
    });
  };

  handleDelete = id => {
    const { todoList } = this.state;
    this.setState({
      todoList: todoList.filter(todo => todo.id !== id)
    });
  };

  // render() 함수 :
  // react lifeCycle 중에 작동되는 method
  // 최초에 어플이 실행되면 한 번 작동되고
  // 데이터나 화면 디자인이 변경되면 호출되는 method
  render() {
    // 자식 컴포넌트에 데이터를 전달하기 위해서 state로 선언된 데이터들을 props로 변환하기
    const { input, todoList } = this.state;
    // 현재 클래스에서 만든 method를 통째로 자식 component에 전달하기 위해 props로 생성 : { 존재하는 변수명, 함수명 등 }
    const {
      handleCreate,
      handleChange,
      handleKeyPress,
      handleToggle,
      handleDelete
    } = this;

    return (
      <div>
        <TodoMain
          input={input}
          todoList={todoList}
          onCreate={handleCreate}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>
    );
  }
}

export default App;
