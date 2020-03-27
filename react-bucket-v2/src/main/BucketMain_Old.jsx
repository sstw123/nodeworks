import React, { Component } from 'react';
import BucketInsert from "./BucketInsert"
import BucketList from "./BucketList"

class BucketMain extends Component {
    id = 0;
    state = {
        bucketList : [
            {
                b_id : 0,
                b_flag : 0,
                b_flag_text: "중요하지 않음",
                b_title : "리액트 정복",
                b_start_date : "2020-03-20",
                b_end_date : "",
                b_check : false,
                b_cancle : false
            }
        ]
    }

    // 현재 컴포넌트가 모두 연결되고 화면에 나타난 직후 : rendering 바로 직전
    componentDidMount() {
        // JS에서 접근 가능한 localStorage의 bucketList(키)를 가져온다
        const strBucketList = localStorage.bucketList
        // 만약 localStorage.bucketList가 존재한다면
        if(strBucketList) {
            const jsonBucketList = JSON.parse(strBucketList)
            this.setState({
                bucketList : jsonBucketList
                // 현재 state의 bucketList에 JSON형으로 변환하여 저장
            })
            // id를 state의 bucketList 길이와 같이 만들어서 저장
            this.id = jsonBucketList.length
        }
    }

    // 화면에 rendering이 끝나고 데이터가 변경되어 다시 렌더링 되려고 할 때
    componentDidUpdate(preProps, preState) {
        // JSON.stringify() : JSON 객체를 문자열로 변경
        // 데이터가 변경되어 컴포넌트가 렌더링되는 순간 이전의 state와 현재 state 값 비교
        const preString = JSON.stringify(preState.bucketList)
        const thisString = JSON.stringify(this.state.bucketList)

        // 이전의 state.bucketList와 현재의 state.bucketList가 다르면(componentDidUpdate에서 비교 가능)
        // localStorage의 bucketList라는 키에 JSON.stringify(this.state.bucketList) 값 저장
        if(preString !== thisString) {
            localStorage.bucketList = thisString
        }
    }

    changeFlag = (id) => {
        const arr_flag_text = ["Normal","High","Very High","Important"]
        this.setState({
            bucketList : 
                this.state.bucketList.map(
                    (bucket) => {
                        if(bucket.b_id === id) {
                            let flag = ++bucket.b_flag % 4
                            let flagText = arr_flag_text[flag]

                            return {...bucket, b_flag : flag, b_flag_text : flagText}
                        } else {
                            return bucket;
                        }
                    }
                )
        })
    }

    // 전체 컴포넌트에서 접근 가능한 Main 컴포넌트의 state.bucketList에 저장하는 메소드 선언

    // React의 선언적 철학1
    // 기존의 객체(배열)은 원본을 손상시키지 말 것 => 아래와 같은 기능을 구현하지 말 것
    // -------------------
    // 객체 배열에서 새로운 항목 추가 : push()
    // 객체 배열에서 항목 제거 : remove()
    // 객체 배열의 요소 중의 항목 변경 : 객체[0] = 새로운 값
    // -------------------
    // 따라서 새로운 객체를 만들고
    // 추가 : 기존 객체 + 추가된 항목을 생성하여 새로운 객체에 복사
    // 변경 : 기존 객체의 변경 내용만 변경하여 새로운 객체에 복사
    bucket_add = (b_title) => {
        const {bucketList} = this.state
        const date = new Date()

        // 2020-03-26 형식의 날짜 문자열 생성
        //const b_start_date = date.format("yyyy-MM-dd")
        console.log(date.toString())
        
        // b_id 값은 버켓 리스트의 PK 값을 갖는 칼럼이다
        // state에 지정된 id 값을 1 증가시켜 생성하고
        // 리스트의 b_id 칼럼에 값을 저장
        const bucket = {
            b_id : ++this.id,
            b_flag: 0,
            b_flag_text : "※",
            b_start_date : date.toString(),
            b_title : b_title,
            b_end_date : "",
            b_check : false,
            b_cancle : false
        }
        this.setState({
            // id가 ++this.id
            // 나머지 요소가 bucket에서 정의한 형태의 객체(vo)를 생성한다
            // 원본의 bucketLIst에 추가하여 새로운 bucketList에 저장하기
            bucketList : bucketList.concat({
                ...bucket
            })
        })
    }

    bucket_update = (id, b_title) => {
        const {bucketList} = this.state
        // bucketList를 map으로 반복 실행하면서 각 요소의 id값과 매개변수로 받은 id 값이 일치하면
        // b_title만 새로운 값으로 변경하여 리턴하고 그 값을 bucketList에 저장
        this.setState({
            bucketList : bucketList.map(
                (bucket) => 
                    bucket.b_id === id ? {...bucket, b_title : b_title} : bucket
            )
        })
         
    }

    // React lifeCycle 메소드
    // 만약 현재 Main 컴포넌트에 많은 state 변수들이 있을 때
    // 한 개라도 state 변수가 변동되면 rendering이 발생할텐데
    // 그러지 말고 state 변수 중에서 bucketList만 감시하다가
    // bucketList가 변경되었을 때만 화면 rendering하기
    shouldComponentUpdate(nextProps, nextState) {
        //return nextState.bucketList !== this.state.bucketList
        return true
    }

    render() {
        return (
            <div>
                <BucketInsert bucket_add={this.bucket_add} />
                <BucketList bucket_update={this.bucket_update} bucketList={this.state.bucketList} changeFlag={this.changeFlag} />
            </div>
        );
    }
}

export default BucketMain;