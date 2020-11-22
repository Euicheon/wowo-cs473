import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './hunsu/CSS/masonry.css'
import AppRouter from './AppRouter';
import {BrowserRouter} from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>,
  document.getElementById('root')
);