import React, { Component } from 'react';
import Moment from "react-moment"
import BucketProvier from "../provider/BucketProvider"

class BucketItemView extends Component {

    static contextType = BucketProvier

    changeEdit = (e) => {
        e.stopPropagation()
        const {bucketItem} = this.props

        if(bucketItem.b_cancel) {
            alert("취소된 버킷은 수정할 수 없습니다")
            return false
        }

        if(bucketItem.b_end_date !== "") {
            alert("완료된 버킷은 수정할 수 없습니다")
            return false
        } else {
            this.props.handleEditing()
        }
        
    }

    handleChangeFlag = (e) => {
        e.stopPropagation()
        // bucketItem : 바로 위 컴포넌트에서 전달받은 변수(this.props)
        // changeFlag() : Main에서 provider로 전달받은 변수(this.context)
        this.context.changeFlag(this.props.bucketItem.b_id)
    }

    onComplete = (e) => {
        e.stopPropagation()
        const {b_id, b_end_date, b_cancel} = this.props.bucketItem

        if(b_cancel) {
            alert("취소된 버킷은 완료할 수 없습니다")
            return false
        }

        if(b_end_date == "") {
            if(!window.confirm("꿈을 이루었습니까?")) {
                return false
            }
        } else {
            if(!window.confirm("버킷리스트를 다시 시작할까요?")) {
                return false
            }
        }

        this.context.bucket_complete(b_id, b_end_date)
    }

    toggleCancel = (e) => {
        e.stopPropagation()
        if(this.props.bucketItem.b_end_date !== "") {
            alert("완료된 버킷은 취소할 수 없습니다")
            return false
        }
        
        this.context.toggleCancel(this.props.bucketItem.b_id)
    }


    noChangeEdit = (e) => {
        e.stopPropagation()
    }

    render() {
        const {bucketItem} = this.props
        const td_style = {
            cursor: "pointer",
        }
        const td_through = {
            cursor: "pointer",
            textDecorationLine : "line-through",
            textDecorationStyle : "double",//solid, wavy, double, dotted, dashed 등등 border와 같은 옵션
            textDecorationColor: "red",
            fontStyle: "italic"
        }

        return (
            <React.Fragment>
                <td onClick={this.handleChangeFlag} style={td_style}>{bucketItem.b_flag_text}</td>
                <td onClick={this.changeEdit} style={bucketItem.b_end_date === "" ? td_style : td_through}>{bucketItem.b_title}</td>
                <td onClick={this.noChangeEdit}>
                    <Moment format="YYYY-MM-DD">
                        {bucketItem.b_start_date}
                    </Moment>
                </td>
                <td onClick={this.onComplete} style={td_style}>
                    {bucketItem.b_end_date !== "" ? 
                    <Moment format="YYYY-MM-DD">
                        {bucketItem.b_end_date}
                    </Moment>
                    :
                    "◎"}
                </td>
                <td onClick={this.noChangeEdit}>
                    <input onClick={this.toggleCancel} type="checkbox" checked={bucketItem.b_cancel}/>
                </td>
            </React.Fragment>
        );
    }
}

export default BucketItemView;