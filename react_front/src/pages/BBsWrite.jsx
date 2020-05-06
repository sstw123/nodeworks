import React, { Component } from 'react';
import axios from "axios"

const BBS_INSERT_URL = "http://localhost:8080/bbs/api/insert"

class BBsWrite extends Component {
    state = {
        bbsDate : "",
        bbsWriter : "",
        bbsTitle : "",
        bbsContent : ""
    }

    /*
        react에서는 데이터를 외부에서 불러오거나 했을 때 자동으로 해당 input 박스에 값이 세팅되도록
        input 박스에 state 변수를 value 값으로 세팅하면 키보드로 문자열을 입력했을 때 문자열이 입력되지 않는다
        따라서 각각의 입력박스에 onChange 이벤트를 설정해서 키보드로 입력한 문자열을 state 변수에 세팅해주는 절차가 필요하다

        문제는 input box가 1,2개 정도이면 각각의 input box에 event 핸들러를 부착하여 작동시키면 되는데 input box가 많아지면 관리가 힘들고
        input box의 추가나 변경이 발생하면 유지보수가 매우 어려워진다
        그래서 여러개의 input box가 있을 경우는 1개의 event 핸들러를 작성하고 공통으로 활용하는 방법이 주로 사용된다

        ※
        javascript의 ES7 이상에서 [변수명]이라는 특별한 문법이 있다
        1. arr = [1,2,3,4,5]
        2. [a1, a2, a3] = arr
        위와 같은 코드를 작성하면 "a1, a2, a3이 가지고 있는 값"에 arr의 0번부터 2번까지 값이 차례대로 들어가게 된다

        예를 들어
        1. let a1 = "대한"
        2. let a2 = "민국"
        3. [a1, a2] = arr이라고 하면
        대한 = 1
        민국 = 2
        같은 코드가 만들어진다

        즉, [e.target.name] : e.target.value 이런 코드는
        1. e.target.name의 값인 bbsDate, bbsWriter, bbsTitle로 치환되어
        2. state의 해당 변수에 e.target.value의 값이 들어가게 되고 state가 바뀌어 input의 value값도 변경된다
    */
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    bbsInsert = () => {
        let formData = new FormData()
        formData.append("bbsDate", this.state.bbsDate)
        formData.append("bbsAuth", this.state.bbsWriter)
        formData.append("bbsTitle", this.state.bbsTitle)
        formData.append("bbsText", this.state.bbsContent)

        // axios는 ajax처럼 serialize()로 보내면 데이터가 가지 않는다
        axios.post(BBS_INSERT_URL, formData)
        .then(result => console.log(result))
        .catch(error => console.log(error))        
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label>작성일자</label>
                    <input className="form-control" name="bbsDate" onChange={this.handleChange} value={this.state.bbsDate}/>
                </div>
                <div className="form-group">
                    <label>작성자</label>
                    <input className="form-control" name="bbsWriter" onChange={this.handleChange} value={this.state.bbsWriter}/>
                </div>
                <div className="form-group">
                    <label>제목</label>
                    <input className="form-control" name="bbsTitle" onChange={this.handleChange} value={this.state.bbsTitle}/>
                </div>
                <div className="form-group">
                    <textarea className="form-control" rows="5" name="bbsContent" onChange={this.handleChange} value={this.state.bbsContent}/>
                </div>
                <div className="text-right">
                    <button type="button" className="btn btn-primary" onClick={this.bbsInsert}>작성</button>
                </div>
            </form>
        );
    }
}

export default BBsWrite;