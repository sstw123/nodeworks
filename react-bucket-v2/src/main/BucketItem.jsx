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
        const item_cancel = {
            backgroundColor: "#ccc",
            color: "gray"
        }

        return (
            <tr style={bucketItem.b_cancel ? item_cancel : {}} onClick={this.handleEditing}>
                {this.state.isEditing ?
                <BucketItemEdit bucketItem={bucketItem} handleEditing={this.handleEditing} /> :
                <BucketItemView bucketItem={bucketItem} handleEditing={this.handleEditing} /> }
            </tr>
        );
    }
}

export default BucketItem;