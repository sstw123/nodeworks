import React, { Component } from "react";
import TodoItem from "./TodoItem";

/*
    LifeCycle method
    code snippet이 생성하는 method는 16.3이전에 주로 사용하던 method이고
    16.3 이후에는 일부 메소드가 변경되거나 소멸된다
    소멸되는 method : 성능상의 이슈를 발생시킬 수 있는 소지가 있어 소멸하거나 다른 method로 대체(변경)하기로 결정되었다

    처음 컴포넌트를 생성하고 start 했을 때

    1. constructor()
    2. componentWillMount()
    3. render()
    4. componentDidMount()
    
    순서로 실행된다
*/

class TodoList extends Component {
  constructor(props) {
    super(props);
  }
  /*
    화면에 리스트를 표시하기 위한 todoList 배열이 변경되었는지 판단해서
    render() 함수를 호출할지 안할지 알려주는 method

    비교연산자 == : 다른 데이터타입이면 형변환하여 비교. ex) 1 == "1" -> true (숫자형과 문자열형)
    비교연산자 === : 다른 데이터타입이면 형변환하지 않고 비교. ex) 1 === "1" -> false (숫자형과 문자열형)
  */
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todoList !== nextProps.todoList;
    //return true;
  }

  render() {
    // 부모 컴포넌트에서 현재 컴포넌트로 전달받은 데이터 가져오기
    const { todoList, onToggle, onDelete } = this.props;
    const todoMaps = todoList.map(({ id, text, checked }) => (
      <TodoItem
        id={id}
        text={text}
        checked={checked}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    ));

    return <div>{todoMaps}</div>;
  }

  // React v17 이후에서는 사용 불가
  // static getDerivedStateFromProps() 로 변경
  // componentWillMount() {}
  // React v17 이후에서는 사용 불가
  // componentDidMount() {}
  // React v17 이후에서는 사용 불가
  // componentWillReceiveProps(nextProps) {}

  // React v17 이후에서는 사용 불가
  // getSnapshotBeforeUpdate()로 변경
  // componentWillUpdate(nextProps, nextState) {}
  // React v17 이후에서는 사용 불가
  // componentDidUpdate(prevProps, prevState) {}

  // componentWillUnmount() {}
}

export default TodoList;
