import React, { Component } from 'react';
import Moment from "react-moment"

class BucketItemView extends Component {

    changeEdit = () => {
        this.props.handleEditing()
    }

    handleChangeFlag = () => {
        //this.props.changeFlag(this.props.bucketItem.b_id)
        const {changeFlag, bucketItem} = this.props
        changeFlag(bucketItem.b_id)
    }

    render() {
        const {bucketItem} = this.props

        return (
            <React.Fragment>
                <td onClick={this.handleChangeFlag}>{bucketItem.b_flag_text}</td>
                <td onClick={this.changeEdit}>{bucketItem.b_title}</td>
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
                    <input type="checkbox" value="{bucketItem.b_cancel}"/>
                </td>
            </React.Fragment>
        );
    }
}

export default BucketItemView;