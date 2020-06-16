import React from 'react';
import {BrowserRouter as BR, Route, Switch} from "react-router-dom"
import MainMenu from "./bbs/MainMenu"
import BBsMain from "./bbs/BBsMain"
import BBsWrite from "./bbs/BBsWrite"

function App() {
  const header_style = {
    marginBottom: 0,
    backgroundColor: "green",
    color: "white"
  }
  return (
    <div className="container">
      <header className="jumbotron text-center" style={header_style}>
        <h2>REACT BBS 2020</h2>
        <p>React &amp; Firebase BBS</p>
      </header>
      <BR>
        <MainMenu/>
        <Route exact path="/" component={BBsMain}/>
        <Switch>
          <Route exact path="/bbsWrite/:seq" component={BBsWrite} />
          <Route exact path="/bbsWrite/" component={BBsWrite} />
        </Switch>
      </BR>
    </div>
  );
}

export default App;
