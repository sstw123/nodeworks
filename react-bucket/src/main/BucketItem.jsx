import React, { Component } from 'react';
import BucketItemView from "./BucketItemView"
import BucketItemEdit from "./BucketItemEdit"

class BucketItem extends Component {

    state = {
        isEditing : false
    }
    
    handleEditing = () => {
        this.setState( {isEditing : !this.state.isEditing} )
    }
    
    render() {
        const {bucketItem} = this.props

        return (
            <tr>
                {this.state.isEditing ?
                <BucketItemEdit bucketItem={bucketItem} bucket_update={this.props.bucket_update} handleEditing={this.handleEditing} /> :
                <BucketItemView bucketItem={bucketItem} changeFlag={this.props.changeFlag} handleEditing={this.handleEditing} /> }
            </tr>
        );
    }
}

export default BucketItem;