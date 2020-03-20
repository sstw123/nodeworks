import React from 'react';
import BBsListItem from "./BBsListItem"

/*
    bbsList를 props 매개변수로 받아서
    <li>BBS1</li>
    <li>BBS2</li>
    <li>BBS3</li>
    <li>BBS4</li>
    <li>BBS5</li>
*/

// 1. { } 로 묶은 여러줄 코드 + return문
// const BBsList = ( {bbsList} ) => {
//     const bbsMap = bbsList.map( bbs => <li key={bbs._id}>{bbs.b_title}</li> )
//     // return bbsMap
//     return <div>{bbsMap}</div>
// }

// 2. { }로 묶은 코드 + return문
// const BBsList = ( {bbsList} ) => {
//     return bbsList.map( bbs => <li key={bbs._id}>{bbs.b_title}</li> )
// }

// 3. { }로 묶지 않은 한줄코드 = 함수가 아니므로 return문 생략
const BBsList = ( {bbsList, bbs_main_url} ) => {
    const bbsMap = bbsList.map(bbs => {
        return <BBsListItem bbs={bbs} key={bbs._id} bbs_main_url={bbs_main_url}/>
    })

    return (
        <table className="w3-table-all">
            <thead>
                <tr>
                    <th>날짜</th>
                    <th>시간</th>
                    <th colSpan="2">제목</th>
                </tr>
            </thead>
            <tbody>
                {bbsMap}
            </tbody>
        </table>
    )
}



export default BBsList;