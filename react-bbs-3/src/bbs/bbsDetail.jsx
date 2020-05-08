import React, { Component } from 'react';
import axios from "axios"

class bbsDetail extends Component {

    state = {
        bbsDate : "",
        bbsTitle : "",
        bbsAuth : "",
        bbsText : ""
    }

    state = {
        bbsVO : {}
    }
    // 서버에게 bbs id값을 전달하고 정보 가져오기
    bbsDetailFetch = () => {
        const bbs_id = this.props.match.params.bbs_id || 0
        if(bbs_id == 0) return

        fetch("http://localhost:8080/bbs/api/detail?bbs_id=" + bbs_id)
        .then( (res) => {
            return res.json()
        })
        .then( (result) => {
            this.setState({
                bbsDate : result.bbsDate,
                bbsTitle : result.bbsTitle,
                bbsAuth : result.bbsAuth,
                bbsText : result.bbsText,

                bbsVO : result
            })
        })
    }

    handleDelete = () => {
        if(window.confirm("정말로 삭제하시겠습니까?")) {
            axios.post("http://localhost:8080/bbs/api/delete?bbs_id=" + this.props.match.params.bbs_id)
            .then( (res) => {
                this.props.history.push("/")
            })
            .catch( (error) => {
                console.log(error)
            })
        }
    }

    render() {
        const bbs_id = this.props.match.params.bbs_id
        const {bbsVO} = this.state
        return (
            <div>
                <table className="table table-bordered text-center mt-5">
                    <tbody>
                        <tr>
                            <th>글번호</th><td>{bbs_id}</td>
                        </tr>
                        <tr>
                            <th>날짜</th><td>{bbsVO.bbsDate}</td>
                        </tr>
                        <tr>
                            <th>제목</th><td>{bbsVO.bbsTitle}</td>
                        </tr>
                        <tr>
                            <th>작성자</th><td>{bbsVO.bbsAuth}</td>
                        </tr>
                        <tr>
                            <th>내용</th><td>{bbsVO.bbsText}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn-box text-right mt-5">
                    <button className="btn btn-success mr-3" onClick={ (e) => this.props.history.push("/") }>목록</button>
                    <button className="btn btn-primary mr-3" onClick={ (e) => this.props.history.push("/bbs/update/" + bbs_id) }>수정</button>
                    <button className="btn btn-danger" onClick={this.handleDelete}>삭제</button>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.bbsDetailFetch()
    }
}

export default bbsDetail;