import React, { Component } from 'react';
import BucketContext from "../provider/BucketProvider"

class BucketInsert extends Component {
    // input box를 사용하는 컴포넌트에서 사용자가 입력한 문자열을 임시로 담고 있을 변수 선언
    state = {
        bucket_title : ""
    }

    // static contextType : 상위 컴포넌트에서 전달된 Context.Provider를 사용하는 변수 선언
    // 안에 있는 state 변수와 handler method 등을 사용할 수 있다
    static contextType = BucketContext

    // 현재 컴포넌트에 선언된 state.bucket_title 변수에 사용자의 입력 문자열을 담는 역할을 수행
    // 여기에 문자열을 담아도 다른 컴포넌트에 문자열이 전파되지는 않는다
    handleChange = (e) => {
        // bucket_title : e.target.value => bucket_title에 e.target.value 집어넣기
        // [e.target.getAttribute("data-name")]으로 input box에 data-name 속성으로 지정된 값을 가져와서 변수명 지정
        // 현재 컴포넌트에 input box가 여러개 있을 때 한 개의 onChange 이벤트 핸들러만 사용하여 공통으로 사용하고 싶을 때 사용하는 방법
        this.setState({
            [e.target.getAttribute("data-name")] : e.target.value
        })
    }


    // input box에서 문자열 입력 후 submit 시
    // BucketMain에서 전달받은 이벤트 핸들러에게 this.state.bucket_title 값을 전달하여
    // 전체 컴포넌트가 접근 가능한 Main의 배열에 추가하기
    handleKeyPress = (e) => {
        const {bucket_add} = this.context
        const {bucket_title} = this.state
        if(e.key === "Enter") {
            if(bucket_title == "") {
                alert("버킷리스트를 입력하세요")
                return false
            }

            // bucket_add(this.state.bucket_title) // 정형적
            bucket_add(bucket_title) // 비정형적, 비구조적 : 분해 후 독립변수로 사용
            this.setState({
                bucket_title : ""
            })
        }
    
    }

    // React에서 input box 처리 방법
    // 1. 컴포넌트 자체에 input의 value로 지정할 state 변수 선언
    // 2. value 속성에 state 변수 지정(input box는 readonly 상태로 변한다)
    // 3. 사용자의 입력을 받아서 state 변수에 저장할 수 있도록 onChange 이벤트 핸들러 만들기
    render() {

        return (
            <section className="w3-container-fluid">
                <div className="w3-form-control w3-margin">
                    <input className="w3-input w3-border w3-round"
                            name="b_title"
                            data-name="bucket_title"
                            value={this.state.bucket_title}
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress}
                            placeholder= "버킷 리스트에 추가할 내용을 입력하세요"/>
                </div>
            </section>
        );
    }
}

export default BucketInsert;