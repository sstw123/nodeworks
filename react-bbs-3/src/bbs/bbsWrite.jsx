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
    bbsInsert = () => {
        let formData = new FormData()
        formData.append("bbsDate", this.state.bbsDate)
        formData.append("bbsAuth", this.state.bbsAuth)
        formData.append("bbsTitle", this.state.bbsTitle)
        formData.append("bbsText", this.state.bbsText)

        axios.post("http://localhost:8080/bbs/api/insert", formData)
        .then((result) => console.log(result))
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