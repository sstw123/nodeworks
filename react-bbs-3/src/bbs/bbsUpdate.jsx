import React, { Component } from 'react';
import axios from "axios"

class bbsUpdate extends Component {
    state = {
        bbsDate : "",
        bbsAuth : "",
        bbsTitle : "",
        bbsText : "",
    }

    bbsUpdateFetch = () => {
        // 3항 연산자에서 더 발전된 짧은 조건문
        // 1. <조건문 = 조건문이 참일 때 실행될 코드> || <조건문이 거짓일 때 실행될 코드>
        // 2. <조건문 = 조건문이 거짓일 때 실행될 코드> && <조건문이 참일 때 실행될 코드>
        // 조건문 거짓에는 null, NaN, 0, 빈 문자열("", '', ``), undefined가 들어갈 수 있다. 그 외에는 전부 참으로 간주한다.
        const bbs_id = this.props.match.params.bbs_id || 0
        console.log(bbs_id)
        if(bbs_id == 0) return

        fetch("http://localhost:8080/bbs/api/detail?bbs_id=" + bbs_id)
        .then( (res) => {
            return res.json()
        })
        .then( (result) => {
            this.setState({
                bbsDate : result.bbsDate,
                bbsAuth : result.bbsAuth,
                bbsTitle : result.bbsTitle,
                bbsText : result.bbsText,
            })
        })
    }

    bbsUpdate = () => {
        let formData = new FormData()
        formData.append("id", this.props.match.params.bbs_id)
        formData.append("bbsDate", this.state.bbsDate)
        formData.append("bbsAuth", this.state.bbsAuth)
        formData.append("bbsTitle", this.state.bbsTitle)
        formData.append("bbsText", this.state.bbsText)

        axios.post("http://localhost:8080/bbs/api/save", formData)
        .then( (res) => {
            console.log(res)
            this.props.history.push("/bbs/detail/" + this.props.match.params.bbs_id)
        })
        .catch( (error) => {
            console.log(error)
        })
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        const {bbsDate, bbsAuth, bbsTitle, bbsText} = this.state
        return(
            <div>
                <div>
                    <label>작성일자</label>
                    <input className="form-control" name="bbsDate" type="date" placeholder="날짜" value={bbsDate} onChange={this.handleOnChange}/>
                </div>
                <div>
                    <label>작성자</label>
                    <input className="form-control" name="bbsAuth" placeholder="작성자" value={bbsAuth} onChange={this.handleOnChange}/>
                </div>
                <div>
                    <label>제목</label>
                    <input className="form-control" name="bbsTitle" placeholder="제목" value={bbsTitle} onChange={this.handleOnChange}/>
                </div>
                <div>
                    <label>내용</label>
                    <input className="form-control" name="bbsText" placeholder="내용" value={bbsText} onChange={this.handleOnChange}/>
                </div>
                <div className="button-group text-right">
                    <button type="button" className="btn btn-primary" onClick={this.bbsUpdate}>저장</button>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.bbsUpdateFetch()
    }
}

export default bbsUpdate;