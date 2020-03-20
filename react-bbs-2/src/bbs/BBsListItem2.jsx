import React, { Component } from 'react';

class BBsListItem extends Component {
    trClick = () => {
        alert("trClick")
    }

    render() {
        const {bbs} = this.props;
        return (
            <tr data-id={bbs._id}>
                <td>{bbs.b_date}</td>
                <td>{bbs.b_time}</td>
                <td>{bbs.b_title}</td>
                <td>
                    <button onClick={this.trClick}>view</button>
                </td>
            </tr>
        );
    }
}

export default BBsListItem;