import React from 'react';
import logo from './logo.svg';
import './App.css';
// LongComponent as Component : 컴포넌트의 이름이 길어서 사용할 때 조금 불편할 경우 as로 다른 이름으로 바꿔 사용할 수 있다
import {BrowserRouter as BR, Route, Switch} from "react-router-dom"
// 3개의 페이지를 import하여 component로 설정
import Home from "./pages/home"
import BBS from "./pages/bbs"
import BBS_List from "./pages/bbsList"
import Login from "./pages/login"
import MainNav from "./MainNav"


/*
BrowserRouter : Route로 설정된 컴포넌트를 요청된 path에 따라 교체하여 보여주는 영역
Route에 설정된 path는 웹브라우저 주소창의 URL중 mapping path에 따라 컴포넌트를 교체하여 보여준다

Route의 path는 설정하는 규칙이 있다
path="/" component={Home}
path="/bbs" component={BBS}
path="/bbs/write" component={BBS_Write} 세 개를 설정해주면

"/"에선 Home 컴포넌트,
"/bbs"에선 Home과 BBS,
"/bbs/write"에선 Home과 BBS와 BBS_Write 세 개를 전부 보여준다

만약 하위 URL인 /bbs에서 상위 URL("/")의 Home 컴포넌트를 보여주고 싶지 않다면
path 대신 exact path를 사용하면 된다
*/
function App() {
  return (
    <div className="container">
      <header className="jumbotron text-center">
        <h1>React Router DOM</h1>
        <input placeholder="아무거나 입력"/>
      </header>
      <BR>
        <MainNav/>
        <Route exact path="/" component={Home} />
        <Switch>
          <Route path="/bbs/list" component={BBS_List} />
          <Route path="/bbs/:name" component={BBS} />
          <Route path="/bbs" component={BBS} />
        </Switch>
        <Route path="/login" component={Login} />
      </BR>
    </div>
  );
}

export default App;
