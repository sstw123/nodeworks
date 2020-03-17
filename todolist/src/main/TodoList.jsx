import React from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  // 임시 데이터 생성
  // todoItems 임시데이터를 가지고 TodoItem 리스트를 생성하는 코드
  const todoItems = [
    { text: "오늘할일", checked: false },
    { text: "오늘약속", checked: true },
    { text: "과제", checked: false },
    { text: "숙제", checked: true },
    { text: "Home work", checked: false }
  ];
  const todoList = todoItems.map(item => <TodoItem item={item} />);
  /*
  [Javascript의 map 함수] : forEach
  예제)
  items.map(function(item) {
    <p>{item}</p>
  })

  const todoList = todoItems.map(item => <TodoItem text={item} />);
  items를 순서대로 분해하여 TodoItem의 text 변수로 넘겨준 값들을 todoList에 담기
  */
  return <div>{todoList}</div>;
};

export default TodoList;
