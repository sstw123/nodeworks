import React, { Component } from 'react';
import Moment from "react-moment"
import BucketContext from "../provider/BucketProvider"

class BucketItemEdit extends Component {

    static contextType = BucketContext
    
    state = {
        bucket_title : ""
    }

    /*
        view 모드에서 edit 모드로 변경될 때
        input box에 view 모드에서 보았던 문자열(title)을 state 변수에 담아주는 부분
        props로 전달받은 b_title을 state.bucket_title에 주입하려면
        LifeCycle method에서 componentDidUpdate를 이용한다
    */
    componentDidMount(preProps, preState) {
        const {bucketItem} = this.props
        this.setState({
            bucket_title : bucketItem.b_title
        })
    }

    handleChange = (e) => {
        this.setState({bucket_title : e.target.value})
    }

    onKeyPress = (e) => {
        if(e.key === "Enter") {
            //alert(this.state.bucket_title)
            // 현재 리스트의 id 값과 새로 입력한 버킷 문자열을 Main으로 전송하여 update 수행
            this.context.bucket_update(this.props.bucketItem.b_id, this.state.bucket_title)
            
            this.props.handleEditing()
        }
    }

    noClick = (e) => {
        e.stopPropagation()
    }

    render() {
        const {bucketItem} = this.props
        const inputStyle = {
            width: "100%"
        }

        return (
            <React.Fragment>
                <td>{bucketItem.b_flag_text}</td>
                <td>
                    <input
                        style={inputStyle}
                        onClick={this.noClick}
                        onChange={this.handleChange}
                        onKeyPress={this.onKeyPress}
                        value={this.state.bucket_title}
                    />
                </td>
                <td>
                    <Moment format="YYYY-MM-DD">
                        {bucketItem.b_start_date}
                    </Moment>
                </td>
                <td>
                    {bucketItem.b_end_date !== "" ? 
                    <Moment format="YYYY-MM-DD">
                        {bucketItem.b_end_date}
                    </Moment>
                    :
                    "◎"}
                </td>
                <td>
                    <input type="checkbox" checked={bucketItem.b_cancel}/>
                </td>
            </React.Fragment>
        );
    }
}

export default BucketItemEdit;