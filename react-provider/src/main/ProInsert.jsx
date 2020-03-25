import React, { Component } from 'react';

class ProInsert extends Component {
    state = {
        message : ""
    }

    // 키보드에서 입력받은 문자열을 this.state.message에 저장하기
    // function() {} 함수가 아니라 () => {} 의 화살표 함수로 작성해야 작동한다
    // handleChange에서 this.state.message를 변경하면
    // 현재 컴포넌트 어디에 this.state.messag가 있건 상관없이 동시에 전부 변경된 값이 표시된다
    handleChange = (e) => {
        this.setState({
            message : e.target.value
        })
    }

    // Main -> Sub2 -> Insert로 전달된 changeMessage 메소드를 호출하여
    // 지금부터 내가 보내는 문자열을 전체 컴포넌트가 공유하는 message 변수에 적용하기
    messageSend = () => {
        this.props.changeMessage(this.state.message)
    }

    render() {
        const {message} = this.state

        const {props} = this

        return (
            <div>
               <h5>입력박스</h5>
               <label>문자열을 입력하세요</label><br/>

               {/*
               React에서 input box를 사용하려면
               1. 먼저 value에 포함시킬 state 변수를 선언하고
               2. value={this.state.변수명} 을 input에 넣고
               3. onChange 이벤트를 캡쳐하여 키보드에서 입력된 문자열을 this.state 변수에 this.setState()로 반영시킨다
               */}
               <input value={this.state.message} onChange={this.handleChange}/>
               <button onClick={this.messageSend}>전달</button>
               <p>{message}</p>
            </div>
        );
    }
}

export default ProInsert;