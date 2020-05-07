import React from 'react';
import qs from 'query-string'

/*
* match props 변수 사용
* Route의 path에 :변수명 형식을 만들어두고 (`<Route path="/bbs/:name" component={BBS} />`)
* URL에 path/변수값 형식으로 요청하면 변수값이 :변수명에 저장되어 router로 보내진다
* Route 컴포넌트에서는 match를 매개변수로 받고 match.params.변수명 형식으로 문자열을 추출할 수 있다
*
* location 변수 사용
* ?변수명=값 형식으로 요청하면 location.search props 변수에 "?변수명=값" 문자열을 전부 추출할 수 있다
* query-string 라이브러리의 parse()의 도움을 받아 query 객체로 변환시킨다
* parsing된 객체는 query.변수명 형식으로 값을 추출할 수 있다
*/
const bbs = ({location, match}) => {
    const query = qs.parse(location.search)
    return (
        <div>
            <h2>BBS Page</h2>
            <p>match.params의 name 값 : {match.params.name}</p>
            <p>location 쿼리 문자열 : {location.search}</p>
            <p>datavar 쿼리 값 : {query.datavar}</p>
        </div>
    );
};

export default bbs;