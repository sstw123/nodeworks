import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import BBsMain from './bbs/bbsMain'
import BBsWrite from "./bbs/bbsWrite"
import MainNav from './MainNav'
import BBsDetail from "./bbs/bbsDetail"
import BBsUpdate from "./bbs/bbsUpdate"

function App() {
  const header_style = {
    marginBottom : 0,
    backgroundColor : "black",
    color: "white"
  }

  return (
    <div className="container">
      <header style={header_style} className="jumbotron text-center">
        <h2>My React BBS</h2>
        <p>React &amp; Spring Boot BBS</p>
      </header>
      <BrowserRouter>
        <MainNav />
        <Route exact path="/" component={BBsMain}/>
        <Route exact path="/bbs/write" component={BBsWrite}/>
        <Route exact path="/bbs/detail/:bbs_id" component={BBsDetail}/>
        <Route exact path="/bbs/update/:bbs_id" component={BBsUpdate}/>
      </BrowserRouter>
    </div>
  );
}

export default App;

/*
React Router
React 원칙은 SPA(Single Page Application) : 한 페이지에서 모든 것을 해결(CRUD)하는 방식
하지만 실제로 SPA에서는 한번에 보여주는데 한계가 있고
너무 많은 정보를 한 곳에 모아두다 보면 무엇을 어떻게 해야할 지 UI/UX 개념에서 많은 혼란이 있을 수 있다

SPA에 페이지 일부를 교체하면 보여주는 형식으로 기존 Web Application 환경의 장점을 쓸 수 있도록 하는 것이다

WAS와 다른 점
서버로 데이터를 가져와서 보여주기는 하지만 모든 페이지 정보를 서버로부터 가져와서 보여주는 방식이 아니고
전체 페이지 중에서 필요한 부분(데이터가 변경되는)만 교체하는 형식으로 어플리케이션이 작동한다
*/