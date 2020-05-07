import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import BBsMain from './bbs/bbsMain'
import BBsWrite from "./bbs/bbsWrite"
import MainNav from './MainNav'

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
        <Route path="/bbs/write" component={BBsWrite}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
