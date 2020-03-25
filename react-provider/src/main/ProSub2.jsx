import React, { Component } from 'react';
import ProInsert from './ProInsert';
import MPro from "../provider/MessageProvider"

class ProSub2 extends Component {
    static contextType = MPro
    render() {
        // const {message, changeMessage} = this.props
        const { message } = this.context

        return (
            <div>
                <h1>나는 Sub2 입니다</h1>
                <p>Sub 2 : {message}</p>
                <p>'{message}'를 ProInsert에게 전달합니다</p>
                <ProInsert />
            </div>
        );
    }
}

export default ProSub2;