import React, { Component } from 'react';
import {database} from "../config/firebaseConfig"
import BBsItem from "./BBsItem"

class BBsList extends Component {
    state = {
        bbsList : []
    }

    // DB에서 읽어와서 List에 뿌려줄 LifeCycle 메소드
    componentDidMount() {
        database.ref("bbs").once("value").then((result) => {
            result.forEach((item) => {
                this.setState({ bbsList : this.state.bbsList.concat(item.val()) })
            })
        })
    }

    render() {
        const bbsMap = this.state.bbsList.map((bbsVO) => {
            return (
                <BBsItem bbsVO={bbsVO} key={bbsVO.seq}/>
            )
        })

        return (
            <React.Fragment>
                <table className="table table-all table-striped table-hover">
                    <thead>
                        <tr>
                            <th>작성일자</th>
                            <th>작성시각</th>
                            <th>작성자</th>
                            <th>제목</th>
                        </tr>
                    </thead>
                    <tbody>{bbsMap}</tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default BBsList;