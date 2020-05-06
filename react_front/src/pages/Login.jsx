import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div>
                <input placeholder="ID" />
                <input placeholder="비밀번호" />
            </div>
        );
    }
}

export default Login;