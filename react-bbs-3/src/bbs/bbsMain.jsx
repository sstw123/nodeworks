import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BBsList from './bbsList'

const BBS_FETCH_URL = "http://localhost:8080/bbs/api/list"

class bbsMain extends Component {
    state = {
        bbsList: []
    }

    fetchBbsList = () => {
        fetch(BBS_FETCH_URL)
        .then( (res) => {
            return res.json();//responce의 json 추출하기
        }) // 성공 시
        .then( (result) => {
            this.setState({
                bbsList : result
            })
        }) // return 된 res.json() 값 = result
        .catch((error) => {
            console.log(error)
        }) // 실패 시
    }

    render() {
        // state 변수 값 비구조화하기 (값 가져오기)
        const { bbsList } = this.state
        return (
            <div className="text-center">
                <BBsList bbsList={bbsList}/>
            </div>
        );
    }

    componentDidMount() {
        this.fetchBbsList()
    }

    // LifeCycle method를 통해 어떤 일을 실행하려고 할 때 return true 해주기
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUnmount() {

    }
    
}

bbsMain.propTypes = {

};

export default bbsMain;