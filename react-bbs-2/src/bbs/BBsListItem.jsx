import React, { Component } from 'react';

class BBsListItem extends Component {

    // 클래스의 필드변수를 선언하는 생성자 부분
    // 여기서 state로 설정한 변수는 이 클래스 내에서 자유롭게 호출하여 사용할 수 있다(읽기,쓰기)

    state = {
        isEditing : false,
        b_title : ""
    }

    inputClick = ev => {
        ev.stopPropagation()
    }

    toggleEdit = () => {
        // state 변수 읽기
        // 1. 클래스에서 바로 가져와서 사용하는 방법
        // alert(this.state.isEditing)

        // 2. state의 props에서 원하는 변수만 가져와서 사용하는 방법(여러번 사용할 경우 변수로 지정하는 방법)
        const {isEditing} = this.state
        // alert(isEditing)

        // setState( { } ) : 값 변경
        this.setState(
            { isEditing : !isEditing }
        )
    }

    editInput = (ev) => {
        this.setState(
            { ...this.state, b_title : ev.target.value}
        )
    }

    // rendering이 끝나고나서 호출되는 메서드
    // preProps, preState 여기에 포함된 값들이
    // rendering 이전의 값을 보유하고 있다
    componentDidUpdate(prevProps, prevState) {
        // const {bbs} = this.props
        
        if(!prevState.isEditing && this.state.isEditing) {
            // isEditing 값이 false -> true 전환될 때
            this.setState(
                {b_title : this.props.bbs.b_title}
            )
        }
    }

    updateHandle = () => {
        const {bbs, bbs_main_url} = this.props

        const data = {
            _id : bbs._id,
            b_title : this.state.b_title
        }

        fetch(bbs_main_url, {
            method : "put",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        })
    }

    deleteHandle = (ev) => {
        ev.stopPropagation()//상위로 이벤트 버블링(전파) 방지

        if(window.confirm("데이터를 삭제할까요?")) {

            const {bbs, bbs_main_url} = this.props
            fetch(bbs_main_url, {
                method : "delete",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({_id : bbs._id})
            })
        }

    }

    render() {
        const {bbs} = this.props;
        
        return (
            <tr data-id={bbs._id} onClick={this.toggleEdit}>
                <td>{bbs.b_date}</td>
                <td>{bbs.b_time}</td>
                <td>
                    {this.state.isEditing
                        ?
                        <div>
                            <input value={this.state.b_title} onChange={this.editInput} onClick={this.inputClick}/>
                            <button type="button" onClick={this.updateHandle}>완료</button>
                        </div>
                        :
                        <span>{bbs.b_title}</span>
                    }
                </td>
                <td><button type="button" onClick={this.deleteHandle}>삭제</button></td>
            </tr>
        );
    }
}

export default BBsListItem;