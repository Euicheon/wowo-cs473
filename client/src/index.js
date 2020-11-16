import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';

import {BrowserRouter} from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
