import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route , Routes} from "react-router-dom";

import "./styles.css";

import {GamePage} from './routes/game'


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/game/:gameID" element={<GamePage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);