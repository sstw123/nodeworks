import React, { Component } from 'react';
import axios from "axios"

class bbsWrite extends Component {
    state = {
        bbsDate : "",
        bbsAuth : "",
        bbsTitle : "",
        bbsText : ""
    }
    // axios를 사용하여 서버로 데이터 전송
    // Router로 감싸진 상태의 컴포넌트들은 props로 match, location, history 와 같은 객체를 상위 Router로 전달받는다
    // match, location은 보통 query 문자열을 통하여 변수 값을 전달받을 때 사용하고
    // history는 안에 있는 push() 메소드를 사용하여 어떤 일을 수행한 후 원하는 path로 점프하는 코드를 수행할 수 있다(redirect 처럼)
    bbsInsert = () => {
        let formData = new FormData()
        formData.append("bbsDate", this.state.bbsDate)
        formData.append("bbsAuth", this.state.bbsAuth)
        formData.append("bbsTitle", this.state.bbsTitle)
        formData.append("bbsText", this.state.bbsText)

        // this.props 안에 들어있는 history 밑의 push()를 이용하면 redirect처럼 사용할 수 있다
        axios.post("http://localhost:8080/bbs/api/save", formData)
        .then((result) => { this.props.history.push("/") } )
        .catch((error) => console.log(error))
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        const {bbsDate, bbsAuth, bbsTitle, bbsText} = this.state;
        return (
            <div>
                <div className="form-group">
                    <label>작성일자</label>
                    <input type="date" className="form-control" placeholder="날짜 입력" name="bbsDate" onChange={this.handleOnChange} value={bbsDate}/>
                </div>

                <div className="form-group">
                    <label>작성자</label>
                    <input className="form-control" placeholder="작성자" name="bbsAuth" onChange={this.handleOnChange} value={bbsAuth}/>
                </div>

                <div className="form-group">
                    <label>제목</label>
                    <input className="form-control" placeholder="제목" name="bbsTitle" onChange={this.handleOnChange} value={bbsTitle}/>
                </div>

                <div className="form-group">
                    <label>내용</label>
                    <textarea rows="5" className="form-control" name="bbsText" onChange={this.handleOnChange} value={bbsText}/>
                </div>

                <div className="button-group text-right">
                    <button type="button" className="btn btn-primary" onClick={this.bbsInsert}>저장</button>
                </div>
            </div>
        );
    }
};

export default bbsWrite;