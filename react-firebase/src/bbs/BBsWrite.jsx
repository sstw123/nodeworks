import React, { Component } from 'react';
import {database} from "../config/firebaseConfig"
import moment from "moment"
import "moment-timezone"

class BBsWrite extends Component {
    state = {
        seq: "",
        b_write : "",
        b_title : "",
        b_text : ""
    }

    bbsInsert = () => {
        let newKey = this.state.seq
        
        if (!newKey) {
            newKey = database.ref().child("bbs").push().key
        }

        let bbsData = {
            seq : newKey,
            b_date : moment().tz("Asia/Seoul").format("YYYY-MM-DD"),
            b_time : moment().tz("Asia/Seoul").format("HH:mm:ss"),
            b_title : this.state.b_title,
            b_writer : this.state.b_write,
            b_text : this.state.b_text
        }

        database.ref("bbs/" + newKey).set(bbsData)
        .then(() => {
            // 데이터 저장이 완료되면 처음 화면으로 점프하기
            // react-router로 감싸진 경우 this.props.history 객체를 통해 원한는 path로 redirect할수 있다.
            this.props.history.push("/");
          });
    }

    bbsUpdate = () => {
        console.log("update");
    }

    inputOnChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    componentDidMount() {
        this.bbsItemFetch()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    bbsItemFetch = () => {
    // 만약 ...bbsid 값이 undefined이면 0을 id에 저장하고
    // 그렇지 않으면 그 문자열을 id에 저장하라
    const seq = this.props.match.params.seq;
    if (!seq) return;
    database
        .ref("bbs/" + seq)
        .once("value")
        .then((result) => {
            console.log(result);
            let bbsVO = result.val();
            this.setState({
                seq: bbsVO.seq,
                b_title: bbsVO.b_title,
                b_write: bbsVO.b_write,
                b_text: bbsVO.b_text,
            })
        })
    }

    render() {
        return (
            <div className="container p-5">
                <div className="form-group">
                    <input class="form-control" name="b_write" value={this.state.b_write} placeholder="작성자" onChange={this.inputOnChange}/>
                </div>
                <div className="form-group">
                    <input class="form-control" name="b_title" value={this.state.b_title} placeholder="제목" onChange={this.inputOnChange}/>
                </div>
                <div className="form-group">
                    <input class="form-control" name="b_text" value={this.state.b_text} placeholder="내용" onChange={this.inputOnChange}/>
                </div>
                <div className="button-group text-right">
                    <button className="btn btn-primary" type="button" onClick={this.bbsInsert}>저장</button>
                </div>
            </div>
        );
    }
}

export default BBsWrite;