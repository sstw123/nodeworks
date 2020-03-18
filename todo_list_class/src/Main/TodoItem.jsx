import React, { Component } from "react";
import "./TodoItem.css";

class TodoItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.checked !== nextProps.checked;
    //return true;
  }

  render() {
    const { id, text, checked, onToggle, onDelete } = this.props;

    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
        <div className={`todo-text${checked ? " checked" : ""}`}>{text}</div>
        {checked && <div className="check-mark">&#10003;</div>}
        <div
          className="delete-item"
          onClick={e => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          &times;
        </div>
      </div>
    );
  }
}

export default TodoItem;
