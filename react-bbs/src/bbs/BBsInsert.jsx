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

    bbsAxiosSubmit = () => {
        const {bbs_insert_url} = this.props
        axios.post(bbs_insert_url, {b_title : this.state.b_title})
        .then(result => console.log(result))
        .catch(error => console.log(error))

        return false
    }

    bbsInsertSubmit = () => {
        const {bbs_insert_url} = this.props
        let data = new FormData()
        data.append("b_title", this.state.b_title)
        
        for (var key of data.keys()) {
            console.log(key);
        }
        
        for (var value of data.values()) {
            console.log(value);
        }
        fetch(bbs_insert_url, {method : "POST", body : data})
        .then(result => console.log(result))
        .catch(error => console.log(error))

        return false
    }

    render() {
        return (
            <form className="w3-container w3-row-padding" onSubmit={this.bbsInsertSubmit}>
                <div className="w3-col s9 w3-padding">
                    <input className="w3-input w3-border" onChange={this.handleChange} value={this.state.b_title}/>
                </div>
                <div className="w3-col s3 w3-padding">
                    <button className="w3-button w3-blue">저장</button>
                </div>
            </form>
        );
    }
}

export default BBsInsert;