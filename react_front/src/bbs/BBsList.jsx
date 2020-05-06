import React from 'react';
import BBsItem from "./BBsItem"

// rsc : 함수형 컴포넌트
/*
    BBsMain에서 전달받은 bbsList에 담긴 게시판 리스트를
    BBsItem 컴포넌트와 조합하여 리스트 보여주기
*/
const BBsList = ( {bbsList} ) => {
    // JSON.map()
    // 배열이나 객체 리스트를 forEach로 분해할 때 사용하는 함수
    const bbsMap = bbsList.map( (bbsVO) => {
        return (
            <BBsItem key={bbsVO.id} bbsVO={bbsVO} />
        )
    });

    return (
        <table className="table">
            <tr>
                <th>날짜</th>
                <th>작성자</th>
                <th>제목</th>
            </tr>
            {bbsMap}
        </table>
    );
};

export default BBsList;