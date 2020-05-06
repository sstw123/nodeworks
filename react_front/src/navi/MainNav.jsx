import React from 'react';
import { Link } from "react-router-dom"

const MainNav = () => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">로그인</Link>
            </li>
            <li className="nav-item">
                <Link to="/bbs" className="nav-link">게시글 작성</Link>
            </li>
        </ul>
    );
};

export default MainNav;