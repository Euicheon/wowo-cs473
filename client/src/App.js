import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route} from 'react-router-dom';

import Body from './JSX/Body';
import Create from './JSX/Create';
import Temp from './JSX/Temp'


const App = () => {
  return (
    <div className="App">
      <div className="container-fluid">
        <Route exact path="/" component={Temp}></Route>
        <Route path="/create" component={Create}></Route>
        <Route path="/hunsu" component={Body}></Route>
      </div> 
    </div>
  );
}

export default App;
