import React, { Component } from 'react';
import BBsItem from './bbsItem'

class bbsList extends Component {
    render() {
        const {bbsList} = this.props

        const bbsMap = bbsList.map( (item) => {
            return <BBsItem key={item.id} bbsVO={item}/>
        })

        return (
            <table className="table table-all text-center">
                <tr>
                    <th>날짜</th>
                    <th>작성자</th>
                    <th>제목</th>
                </tr>
                {bbsMap}
            </table>
        );
    }
}

export default bbsList;