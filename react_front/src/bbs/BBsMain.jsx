import React, { Component } from 'react';
import BBsList from './BBsList'

// 서버와 통신할 때 사용할 여러 설정값 지정
// 데이터를 서버로부터 요청할 때 사용할 URL
const BBS_FETCH_URL = "http://localhost:8080/bbs/api/list"

// rcc : 클래스형 컴포넌트
class BBsMain extends Component {
    timer = ""

    /*
        bbsList 배열을 state로 선언
        state로 선언한 변수는 this.setState() 메소드를 사용해서 값을 update할 수 있다
        state 변수는 자식 component에 전달하여 rendering에 사용할 수 있다
    */
    state = {
        bbsList: [],
    }

    render() {
        const { bbsList } = this.state
        return (
            /*
            자식 컴포넌트에게 state 변수를 전달하려면
            변수명 = {this.state.변수명} 형식으로 보내고
            자식 컴포넌트에서는 {this.props.변수명} 형식으로 변수를 사용해야 한다

            이러한 복잡한 코드를 조금 더 줄이기 위해 변수명을 비구조화시켜 자식 컴포넌트로 전달할 수 있다
            비구조화 : const { 변수명 } = this.state 형식으로 변수명을 state에서 가져오기
            */
            //<BBsList bbsList={this.state.bbsList} />
            <div className="container">
                <BBsList bbsList={bbsList} />
            </div>
        )
    }

    // componentDidMount()에서 호출하는 method
    fetchBbsList = () => {
        fetch(BBS_FETCH_URL)
        .then((res) => {
            //console.log(res.json())
            return res.json()
        })
        .then((result) => {
            this.setState({
                bbsList : result,
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    // LifeCycle method에서 현재 화면의 DOM이 완성되기 직전 실행되는 method
    componentDidMount() {
        this.fetchBbsList();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUnmount() {

    }
}

export default BBsMain;

/*
    부모 컴포넌트와 자식 컴포넌트가 데이터를 주고받는 형식
    React에선 부모 -> 자식 일방통행 방식으로 데이터를 전달할 수 있다
    자식이 전달받은 변수는 모두 props가 된다

    ※ props 형태의 변수는 값을 변경할 수 없는 형태
    단순히 rendering 용도로만 사용할 수 있다

    변화가 있는 데이터를 자식이 rendering하기 위해서는 부모 컴포넌트에서 state 형식의 변수로 만들고
    state 데이터를 변경하면 그 데이터가 자식에게 전파되어 화면에 변화된 값을 rendering하여 보여준다
*/