import React, { Component } from 'react';
import MessageProvicer from "../provider/MessageProvider"
import ProSub1 from "./ProSub1"
import ProSub2 from "./ProSub2"

class ProMain extends Component {
    /*
        어플 목표
        message 변수를 ProMain에 연동된 모든 컴포넌트에 전파하고
        어디선가 한 번만 그 값을 변경하면
        모든 곳에서 같은 값이 보이도록 한다

        1. 공통으로 표시할 변수나 메소드가 있으면 가장 상위에 선언(Main) 후 하위 컴포넌트로 전달(Sub1, Sub2->Insert)
        2. 
    */

    state = {
        message : "나는 Main 컴포넌트 메세지",
        changeMessage : (text) => this.changeMessage(text)
    }

    // main에서 선언된 state message 변수를 변경하기 위한 메소드 선언
    changeMessage = (text) => {
        this.setState(
            {message : text}
        )
    }

    render() {
        return (
            <div>
                <h2>나는 Main 입니다</h2>
                <p>{this.state.message}</p>
                {/* ProMain에 선언된 state.message를 하위 컴포넌트에 전달하기 */}
                <MessageProvider.Provider value={this.state}>
                    <ProSub1 message={this.state.message}/>
                    <ProSub2 message={this.state.message} changeMessage={this.changeMessage}/>
                </MessageProvider.Provider>
            </div>
        );
    }
}

export default ProMain;