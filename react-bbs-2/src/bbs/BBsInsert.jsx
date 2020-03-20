import React, { Component } from 'react';
import axios from "axios"

class BBsInsert extends Component {

    state = {
        b_title: ""
    }

    // ajax를 이용해서 서버에 데이터 보내기
    handleChange = (e) => {
        this.setState({
            ...this.state, b_title : e.target.value
        })
    }

    bbsAxiosSubmit = (ev) => {
        ev.preventDefault()
        
        const {bbs_insert_url} = this.props
        axios.post(bbs_insert_url, {b_title : this.state.b_title})
        .then(result => console.log(result))
        .catch(error => console.log(error))
    }

    bbsInsertSubmit = (ev) => {
        // 기본적으로 수행되는 이벤트를 하지 말라는 의미
        // form에는 submit 방지 효과, a에선 링크 방지 효과 등이 있다
        ev.preventDefault()

        const {bbs_insert_url} = this.props
        // let data = new FormData()
        // data.append("b_title", this.state.b_title)
        
        // for (var key of data.keys()) {
        //     console.log(key);
        // }
        
        // for (var value of data.values()) {
        //     console.log(value);
        // }

        fetch(bbs_insert_url, {
            method : "POST",
            headers : {
                Accept: "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                b_title : this.state.b_title
            })
            // JSON.stringify() : JSON.parse와 반대되는 개념
            // json 객체를 serialize 된 문자열로 변환시켜준다
            // JSON.parse() : json 형식의 문자열을 json 객체로 변환시켜준다
        })
        .then(result => console.log(result))
        .catch(error => console.log(error))

        // 표준 js에서는 return false를 마지막에 써주면 submit 방지 가능
        // react에서는 return false가 의미없다
        // 따라서 react에서는 이벤트가 시작되는 부분에 이벤트 버블링 방지 코드를 넣어주어야 한다
        return false
    }

    render() {
        return (
            <form className="w3-container w3-row-padding" >
                <div className="w3-col s9 w3-padding">
                    <input className="w3-input w3-border" onChange={this.handleChange} value={this.state.b_title}/>
                </div>
                <div className="w3-col s3 w3-padding">
                    <button className="w3-button w3-blue" onClick={this.bbsInsertSubmit}>저장</button>
                </div>
            </form>
        );
    }
}

export default BBsInsert;