import React from 'react';
import {Link , NavLink} from 'react-router-dom'

const MainNav = () => {
    return (
        <nav className="navbar navbar-expand bg-primary">
            <ul className="navbar-nav">
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/bbs/write">게시판</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/login">로그인</Link></li>
            </ul>
        </nav>
    );
};

export default MainNav;