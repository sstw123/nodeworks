import React from 'react';
import { Link } from "react-router-dom"

/*
react-router-dom의 Link 컴포넌트
anchor tag와 같은 일을 수행하는 tag 컴포넌트인데
a tag와 차이점은 클릭했을 때 router 부분만 갱신하고
화면 전체는 새로고침을 하지 않는다
*/
const MainNav = () => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/bbs">게시판</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/bbs/list">게시판 리스트</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/login">로그인</a>
            </li>
        </ul>
    );
};

export default MainNav;