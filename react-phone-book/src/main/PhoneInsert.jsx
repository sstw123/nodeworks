import React, { Component } from 'react';

class PhoneInsert extends Component {

    state = {
        name : "",
        phone : ""
    }

    /*
        React에서 input box는 HTML에서와 달리 value를 지정하면 입력값이 바뀌지 않는다
        때문에 input box의 onChange 이벤트를 선언하여 입력된 문자열을
        현재 클래스에 선언된 state 변수에 담는 코딩이 필요하다
    */

    handleChange= (e) => {
        //const {name} = this.state
        this.setState(
            {[e.target.name] : e.target.value}
        )
    }

    handleClick = () => {
        const {my_value_change} = this.props
        my_value_change(this.state.name)
    }

    // my_value_change = () => {
    //     let {my_value} = this.props
    //     this.setState({my_value : "대한민국"})
    // }

    render() {
        const {my_value} = this.props

        return (
            <form>
                <input name="name" value={this.state.name} onChange={this.handleChange} placeholder="이름"/>
                <input name="phone" value={this.state.phone} onChange={this.handleChange} placeholder="전화번호"/>
                <button type="button" onClick={this.handleClick}>저장</button>
                <p>insert의 my_value : {my_value}</p>
                <p>insert state의 my_value : {this.state.name}</p>
            </form>
        );
    }
}

export default PhoneInsert;