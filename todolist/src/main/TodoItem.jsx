import React from "react";
import "./TodoItem.css";

/*
1. <div className = {`todo-text ${checked && "checked"}`} >

2. ${checked && "checked"}
- checked가 true이면 && 뒤의 "checked" 넣기
- 이 연산식을 사용하려면 1번처럼 전체를 {` `}로 묶어주어야 한다
*/
const TodoItem = ({ item }) => {
  return (
    <div className="todo-item">
      <div className={`todo-text ${item.checked && "checked"}`}>
        <div>{item.text}</div>
      </div>
      {item.checked && <div className="check-mark">&#10003;</div>}
      <div className="delete-item">&times;</div>
    </div>
  );
};

export default TodoItem;
