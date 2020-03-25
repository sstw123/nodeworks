import React, { Component } from 'react';

class ProSub1 extends Component {

    // componentWillMount() {}
    // componentDidMount() {}
    // componentWillReceiveProps(nextProps) {}
    // shouldComponentUpdate(nextProps, nextState) {}
    // componentWillUpdate(nextProps, nextState) {}
    // componentDidUpdate(prevProps, prevState) {}
    // componentWillUnmount() {}

    render() {

        const {message} = this.props
        // 수신된 변수를 this.props.message라고 쓰면 너무 길기 때문에
        // 받은 변수를 분해하여 비구조화 실시

        return (
            <div>
                <h3>나는 Sub1 입니다</h3>
                <p>Sub1 : {this.props.message}</p>
                <p>Sub1 : {message}</p>
            </div>
        );
    }
}

export default ProSub1;